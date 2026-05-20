<?php
/**
 * 소식 Controller
 * 요청 유효성 검증 + 응답 반환만 담당
 *
 * GET /api/news           → index (목록)
 * GET /api/news/{id}      → show  (상세)
 */
class NewsController
{
    private NewsService $service;
    private NewsRepository $repo;

    public function __construct()
    {
        $this->service = new NewsService();
        $this->repo    = new NewsRepository();
    }

    /**
     * 소식 목록
     * GET /api/news?page=1&size=12&type=0&keyword=검색어
     */
    public function index(Request $request): void
    {
        $page    = $request->queryInt('page', 1, 1);
        $size    = $request->queryInt('size', 12, 1);
        $keyword = trim($request->query('keyword', ''));
        $type    = $request->query('type');

        $searchCondition = [
            'keyword' => $keyword,
            'type'    => $type !== null ? (int)$type : -1,
        ];

        $result = $this->service->getList($page, $size, $searchCondition);

        Response::ok($result);
    }

    /**
     * 소식 상세
     * GET /api/news/{id}
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
        } catch (RuntimeException $e) {
            $status = $e->getCode() ?: 400;
            Response::error($e->getMessage(), $status);
        }
    }

    /**
     * 소식 등록
     * POST /api/news
     */
    public function store(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); }

        $title   = trim((string)$request->input('title', ''));
        $content = (string)$request->input('content', '');

        if ($title === '') { Response::error('제목을 입력해주세요.'); }

        try {
            $loginId  = Token::getLoginIdFromPayload($payload);
            $userName = Token::getNameFromPayload($payload);
            $id = $this->service->create($title, $content, $loginId, $userName);

            // 첨부파일 저장
            foreach (FileUploader::process('files', 'news') as $f) {
                $this->repo->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], $f['file_size'], $f['file_ext']);
            }

            Response::ok(['id' => $id], '등록되었습니다.');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage());
        }
    }

    /**
     * 소식 수정
     * POST /api/news/{id}
     */
    public function update(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); }

        $id      = (int)($params['id'] ?? 0);
        $title   = trim((string)$request->input('title', ''));
        $content = (string)$request->input('content', '');

        if ($id <= 0)       { Response::error('잘못된 요청입니다.'); }
        if ($title === '')  { Response::error('제목을 입력해주세요.'); }

        try {
            $this->service->update($id, $title, $content);

            // 신규 첨부파일 저장
            foreach (FileUploader::process('files', 'news') as $f) {
                $this->repo->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], $f['file_size'], $f['file_ext']);
            }

            Response::ok(null, '수정되었습니다.');
        } catch (RuntimeException $e) {
            $status = $e->getCode() ?: 400;
            Response::error($e->getMessage(), $status);
        }
    }

    /**
     * 소식 삭제
     * POST /api/news/{id}/delete
     */
    public function destroy(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); }

        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); }

        try {
            // 첨부파일 물리 삭제
            $filePaths = $this->repo->findFilePathsByNewsId($id);
            $this->repo->deleteFilesByNewsId($id);
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
}
