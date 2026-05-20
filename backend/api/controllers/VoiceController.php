<?php
/**
 * 고객의소리 Controller
 *
 * GET  /voice           → index  (목록)
 * GET  /voice/{id}      → show   (단건)
 * POST /voice           → store  (등록)
 * POST /voice/{id}/delete      → destroy (삭제, 관리자)
 * POST /voice/{id}/reply       → reply   (답변, 관리자)
 * POST /voice/file/{fileId}/delete → destroyFile (파일 삭제, 관리자)
 */
class VoiceController
{
    private VoiceService $service;
    private VoiceRepository $repo;

    public function __construct()
    {
        $this->service = new VoiceService();
        $this->repo    = new VoiceRepository();
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

        $item = $this->service->getOne($id);
        if (!$item) { Response::error('게시글을 찾을 수 없습니다.', 404); return; }

        Response::ok($item);
    }

    // ─────────────────────────────────────────────────────────────

    public function store(Request $request): void
    {
        $category = trim((string)$request->input('category', ''));
        $title    = trim((string)$request->input('title', ''));
        $content  = (string)$request->input('content', '');
        $name     = trim((string)$request->input('name', ''));
        $phone    = trim((string)$request->input('phone', ''));
        $password = trim((string)$request->input('password', ''));

        if ($title === '') { Response::error('제목을 입력해주세요.'); return; }
        if ($name === '')  { Response::error('이름을 입력해주세요.'); return; }

        try {
            $id = $this->service->create(
                category: $category,
                title:    $title,
                content:  $content,
                name:     $name,
                phone:    $phone,
                password: $password
            );

            $maxSize = 10 * 1024 * 1024;
            $uploaded = FileUploader::process('files[]', 'voice', $maxSize);
            foreach ($uploaded as $f) {
                $this->repo->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], $f['file_size'], $f['file_ext']);
            }

            Response::ok(['id' => $id], '등록되었습니다.');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage());
        }
    }

    // ─────────────────────────────────────────────────────────────

    public function myList(Request $request): void
    {
        $name     = trim((string)$request->input('name', ''));
        $password = trim((string)$request->input('password', ''));

        if ($name === '' || $password === '') {
            Response::error('이름과 비밀번호를 입력해주세요.');
            return;
        }

        $result = $this->service->getMyList($name, $password, $request->query);
        Response::ok($result);
    }

    // ─────────────────────────────────────────────────────────────

    public function update(Request $request, array $params): void
    {
        $id       = (int)($params['id'] ?? 0);
        $password = trim((string)$request->input('password', ''));
        $category = trim((string)$request->input('category', ''));
        $title    = trim((string)$request->input('title', ''));
        $content  = (string)$request->input('content', '');
        $name     = trim((string)$request->input('name', ''));
        $phone    = trim((string)$request->input('phone', ''));

        if ($id <= 0)       { Response::error('잘못된 요청입니다.'); return; }
        if ($password === '') { Response::error('비밀번호를 입력해주세요.'); return; }

        try {
            $this->service->update($id, $password, $category, $title, $content, $name, $phone);

            $maxSize  = 10 * 1024 * 1024;
            $uploaded = FileUploader::process('files[]', 'voice', $maxSize);
            foreach ($uploaded as $f) {
                $this->repo->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], $f['file_size'], $f['file_ext']);
            }

            Response::ok(null, '수정되었습니다.');
        } catch (RuntimeException $e) {
            $status = is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 400;
            Response::error($e->getMessage(), $status);
        }
    }

    // ─────────────────────────────────────────────────────────────

    public function userDelete(Request $request, array $params): void
    {
        $id       = (int)($params['id'] ?? 0);
        $password = trim((string)$request->input('password', ''));

        if ($id <= 0)       { Response::error('잘못된 요청입니다.'); return; }
        if ($password === '') { Response::error('비밀번호를 입력해주세요.'); return; }

        try {
            $files = $this->service->userDelete($id, $password);
            foreach ($files as $path) {
                if (!empty($path)) FileUploader::delete((string)$path);
            }
            Response::ok(null, '삭제되었습니다.');
        } catch (RuntimeException $e) {
            $status = is_int($e->getCode()) && $e->getCode() >= 400 ? $e->getCode() : 400;
            Response::error($e->getMessage(), $status);
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
            foreach ($files as $path) {
                if (!empty($path)) {
                    FileUploader::delete((string)$path);
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
