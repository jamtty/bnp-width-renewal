<?php
/**
 * 건강상담 Controller
 *
 * GET  /consultation           → index  (목록)
 * GET  /consultation/{id}      → show   (단건; 비밀글은 password 쿼리 파라미터 필요)
 * POST /consultation           → store  (등록)
 * POST /consultation/{id}/verify → verifyPassword (비밀번호 확인)
 */
class ConsultationController
{
    private ConsultationService $service;
    private ConsultationRepository $repo;

    public function __construct()
    {
        $this->service = new ConsultationService();
        $this->repo    = new ConsultationRepository();
    }

    // ─────────────────────────────────────────────────────────────

    public function index(Request $request): void
    {
        $result = $this->service->getList($request->query);
        Response::ok($result);
    }

    // ─────────────────────────────────────────────────────────────

    public function show(Request $request, array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); return; }

        // 기본 정보 먼저 조회
        $basic = $this->repo->findById($id);
        if (!$basic) { Response::error('게시물을 찾을 수 없습니다.', 404); return; }

        // 관리자 토큰이 있으면 비밀글 여부 무관하게 바로 반환
        $tokenPayload = Token::fromRequest();
        $isAdmin = $tokenPayload && strtolower($tokenPayload['role'] ?? '') === 'admin';

        // 비밀글이고 관리자가 아닌 경우 비밀번호 확인
        if ($basic['is_secret'] === 'Y' && !$isAdmin) {
            $password = trim((string)($request->query['password'] ?? ''));
            if ($password === '') {
                Response::ok(['locked' => true]);
                return;
            }
            if (!password_verify($password, $basic['password'] ?? '')) {
                // 평문 4자리 비교도 지원 (레거시)
                if ($password !== ($basic['password'] ?? '')) {
                    Response::ok(['locked' => true, 'wrong' => true]);
                    return;
                }
            }
        }

        $item = $this->service->getOne($id);
        if (!$item) { Response::error('게시물을 찾을 수 없습니다.', 404); return; }

        Response::ok($item);
    }

    // ─────────────────────────────────────────────────────────────

    public function store(Request $request): void
    {
        $jbCd     = trim((string)$request->input('jb_cd', ''));
        $title    = trim((string)$request->input('title', ''));
        $content  = (string)$request->input('content', '');
        $name     = trim((string)$request->input('name', ''));
        $phone    = trim((string)$request->input('phone', ''));
        $email    = trim((string)$request->input('email', ''));
        $password = trim((string)$request->input('password', ''));
        $isSecret = $request->input('is_secret', 'N') === 'Y' ? 'Y' : 'N';

        if ($title === '')    { Response::error('제목을 입력해주세요.'); return; }
        if ($name === '')     { Response::error('이름을 입력해주세요.'); return; }
        if ($isSecret === 'Y' && !preg_match('/^\d{4}$/', $password)) {
            Response::error('비밀번호는 숫자 4자리로 입력해주세요.');
            return;
        }

        try {
            $id = $this->service->create(
                jbCd:     $jbCd,
                title:    $title,
                content:  $content,
                name:     $name,
                phone:    $phone,
                email:    $email,
                password: $password,
                isSecret: $isSecret
            );

            // 첨부파일 처리 (최대 10MB/파일)
            $maxSize = 10 * 1024 * 1024;
            $uploaded = FileUploader::process('files[]', 'consultation', $maxSize);
            foreach ($uploaded as $f) {
                try {
                    $this->repo->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], $f['file_size'], $f['file_ext']);
                } catch (\Exception $dbEx) {
                    // DB 저장 실패 시 로그만 남기고 등록은 계속 진행
                    error_log('saveFile error: ' . $dbEx->getMessage());
                }
            }

            Response::ok(['id' => $id], '등록되었습니다.');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage());
        }
    }

    // ─────────────────────────────────────────────────────────────

    public function verifyPassword(Request $request, array $params): void
    {
        $id       = (int)($params['id'] ?? 0);
        $password = trim((string)$request->input('password', ''));

        if ($id <= 0 || $password === '') {
            Response::error('잘못된 요청입니다.');
            return;
        }

        if ($this->service->verifyPassword($id, $password)) {
            Response::ok(['verified' => true]);
        } else {
            Response::error('비밀번호가 일치하지 않습니다.', 403);
        }
    }

    // ─────────────────────────────────────────────────────────────

    public function destroy(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); return; }

        try {
            $files = $this->service->delete($id);
            foreach ($files as $f) {
                if (!empty($f['file_path'])) {
                    FileUploader::delete((string)$f['file_path']);
                }
            }
            Response::ok(null, '삭제되었습니다.');
        } catch (RuntimeException $e) {
            $status = is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 400;
            Response::error($e->getMessage(), $status);
        }
    }

    // ─────────────────────────────────────────────────────────────

    public function destroyFile(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $fileId = (int)($params['fileId'] ?? 0);
        if ($fileId <= 0) { Response::error('잘못된 요청입니다.'); return; }

        $filePath = $this->repo->findFilePath($fileId);
        if ($filePath === false) { Response::error('파일이 존재하지 않습니다.', 404); return; }

        $this->repo->deleteFile($fileId);
        FileUploader::delete($filePath);
        Response::ok(null, '파일이 삭제되었습니다.');
    }

    // ─────────────────────────────────────────────────────────────

    public function reply(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id      = (int)($params['id'] ?? 0);
        $content = trim((string)$request->input('content', ''));

        if ($id <= 0)        { Response::error('잘못된 요청입니다.'); return; }
        if ($content === '') { Response::error('답변 내용을 입력해주세요.'); return; }

        try {
            $replyId = Token::getNameFromPayload($payload) ?: 'admin';
            $this->service->reply($id, $content, $replyId);
            Response::ok(null, '답변이 등록되었습니다.');
        } catch (RuntimeException $e) {
            $status = is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 400;
            Response::error($e->getMessage(), $status);
        }
    }
}
