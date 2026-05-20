<?php
/**
 * 공지사항 Controller
 * 요청 유효성 검증 + 응답 반환만 담당
 *
 * GET /api/notice           → index (목록)
 * GET /api/notice/{id}      → show  (상세)
 */
class NoticeController
{
    private NoticeService $service;
    private NoticeRepository $repo;

    public function __construct()
    {
        $this->service = new NoticeService();
        $this->repo    = new NoticeRepository();
    }

    /**
     * 공지사항 목록
     * GET /api/notice?page=1&size=10&type=0&keyword=검색어
     */
    public function index(Request $request): void
    {
        $page     = $request->queryInt('page', 1, 1);
        $size     = $request->queryInt('size', 10, 1);
        $keyword  = trim($request->query('keyword', ''));
        $type     = $request->query('type');
        $dateFrom = trim($request->query('date_from', ''));
        $dateTo   = trim($request->query('date_to',   ''));
        $isPinned = $request->query('is_pinned', '');

        $searchCondition = [
            'keyword'   => $keyword,
            'type'      => $type !== null ? (int)$type : -1,
            'date_from' => $dateFrom,
            'date_to'   => $dateTo,
            'is_pinned' => $isPinned,
        ];

        $result = $this->service->getList($page, $size, $searchCondition);

        Response::ok($result);
    }

    /**
     * 공지사항 상세
     * GET /api/notice/{id}
     */
    public function show(Request $request, array $params): void
    {
        $id = (int)($params['id'] ?? 0);

        if ($id <= 0) {
            Response::error('잘못된 요청입니다.');
        }

        try {
            $preview = $request->query('preview') === '1';
            $result = $this->service->getDetail($id, $preview);
            Response::ok($result);
        } catch (PDOException $e) {
            error_log('[Notice] DB Error in show: ' . $e->getMessage());
            Response::error('데이터베이스 오류가 발생했습니다.', 500);
        } catch (RuntimeException $e) {
            $code   = $e->getCode();
            $status = (is_int($code) && $code >= 400 && $code < 600) ? $code : 400;
            Response::error($e->getMessage(), $status);
        }
    }

    public function store(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); }

        $title    = trim((string)$request->input('title', ''));
        $content  = (string)$request->input('content', '');
        $isPinned = $request->input('is_pinned', '0') === '1';
        if ($title === '') { Response::error('제목을 입력해주세요.'); }

        try {
            $loginId  = Token::getLoginIdFromPayload($payload);
            $userName = Token::getNameFromPayload($payload);
            $id = $this->service->create($title, $content, $loginId, $userName, $isPinned);

            foreach (FileUploader::process('files', 'notice') as $f) {
                $this->repo->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], $f['file_size'], $f['file_ext']);
            }

            Response::ok(['id' => $id], '등록되었습니다.');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage());
        }
    }

    public function update(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); }

        $id       = (int)($params['id'] ?? 0);
        $title    = trim((string)$request->input('title', ''));
        $content  = (string)$request->input('content', '');
        $isPinned = $request->input('is_pinned', '0') === '1';

        if ($id <= 0)      { Response::error('잘못된 요청입니다.'); }
        if ($title === '') { Response::error('제목을 입력해주세요.'); }

        try {
            $this->service->update($id, $title, $content, $isPinned);

            foreach (FileUploader::process('files', 'notice') as $f) {
                $this->repo->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], $f['file_size'], $f['file_ext']);
            }

            Response::ok(null, '수정되었습니다.');
        } catch (RuntimeException $e) {
            $status = $e->getCode() ?: 400;
            Response::error($e->getMessage(), $status);
        }
    }

    public function destroy(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); }

        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); }

        try {
            // 첨부파일 물리 삭제
            $filePaths = $this->repo->findFilePathsByNoticeId($id);
            $this->repo->deleteFilesByNoticeId($id);
            foreach ($filePaths as $path) {
                FileUploader::delete($path);
            }

            $this->service->delete($id);
            Response::ok(null, '삭제되었습니다.');
        } catch (RuntimeException $e) {
            $status = $e->getCode() ?: 400;
            Response::error($e->getMessage(), $status);
        }
    }

    public function destroyFile(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); }

        $fileId = (int)($params['fileId'] ?? 0);
        if ($fileId <= 0) { Response::error('잘못된 요청입니다.'); }

        $filePath = $this->repo->findFilePath($fileId);
        if ($filePath === false) { Response::error('파일이 존재하지 않습니다.', 404); }

        $this->repo->deleteFile($fileId);
        FileUploader::delete($filePath);
        Response::ok(null, '파일이 삭제되었습니다.');
    }

    /**
     * 공지 고정/해제 토글
     * POST /api/notice/{id}/pin
     */
    public function togglePin(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); return; }

        $ok = $this->repo->togglePin($id);
        if (!$ok) { Response::error('게시글을 찾을 수 없습니다.', 404); return; }

        Response::ok(null, '변경되었습니다.');
    }
}
