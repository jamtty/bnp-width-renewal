<?php
/**
 * 구비서류 파일 관리 Controller
 *
 * GET  /cert-doc            → listPublic  (공개용 목록)
 * GET  /cert-doc/admin      → index       (관리자 전체 목록)
 * POST /cert-doc            → store       (생성)
 * GET  /cert-doc/{id}       → show        (단건 조회)
 * POST /cert-doc/{id}       → update      (수정)
 * POST /cert-doc/{id}/delete → destroy    (삭제)
 * POST /cert-doc/{id}/clear  → clearFile  (파일만 삭제)
 */
class CertDocController
{
    private CertDocService $service;
    private const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB

    public function __construct()
    {
        $this->service = new CertDocService();
    }

    /** 공개용: 활성 파일 목록 */
    public function listPublic(Request $request): void
    {
        Response::ok($this->service->getPublicList());
    }

    /** 관리자용: 전체 목록 */
    public function index(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }
        Response::ok($this->service->getAdminList());
    }

    /** 생성 */
    public function store(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $loginId   = Token::getLoginIdFromPayload($payload);
        $title     = trim((string)($request->body['title'] ?? ''));
        $useYn     = in_array($request->body['use_yn'] ?? 'Y', ['Y', 'N'], true) ? $request->body['use_yn'] : 'Y';
        $sortOrder = (int)($request->body['sort_order'] ?? 0);

        if ($title === '') { Response::error('제목은 필수입니다.'); return; }

        // 파일 먼저 처리
        try {
            $uploaded = FileUploader::process('file', 'cert', self::MAX_FILE_SIZE);
        } catch (RuntimeException $e) {
            Response::error($e->getMessage());
            return;
        }
        $f = !empty($uploaded) ? $uploaded[0] : [];

        $id = $this->service->create([
            'title'      => $title,
            'sort_order' => $sortOrder,
            'use_yn'     => $useYn,
            'created_by' => $loginId,
            'ori_name'   => $f['ori_name']  ?? '',
            'save_name'  => $f['save_name'] ?? '',
            'file_path'  => $f['file_path'] ?? '',
            'file_size'  => $f['file_size'] ?? 0,
            'file_ext'   => $f['file_ext']  ?? '',
        ]);

        Response::json(true, ['id' => $id], '등록되었습니다.');
    }

    /** 단건 조회 */
    public function show(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }
        Response::ok($item);
    }

    /** 수정 */
    public function update(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }

        $loginId   = Token::getLoginIdFromPayload($payload);
        $title     = trim((string)($request->body['title'] ?? $item['title']));
        $useYn     = in_array($request->body['use_yn'] ?? '', ['Y', 'N'], true) ? $request->body['use_yn'] : $item['use_yn'];
        $sortOrder = isset($request->body['sort_order']) ? (int)$request->body['sort_order'] : (int)$item['sort_order'];

        if ($title === '') { Response::error('제목은 필수입니다.'); return; }

        $this->service->update($id, [
            'title'      => $title,
            'sort_order' => $sortOrder,
            'use_yn'     => $useYn,
            'updated_by' => $loginId,
        ]);

        try {
            $uploaded = FileUploader::process('file', 'cert', self::MAX_FILE_SIZE);
        } catch (RuntimeException $e) {
            Response::error($e->getMessage());
            return;
        }
        if (!empty($uploaded)) {
            $f = $uploaded[0];
            $this->service->updateFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], (int)$f['file_size'], $f['file_ext'], $loginId);
        }

        Response::json(true, null, '수정되었습니다.');
    }

    /** 삭제 */
    public function destroy(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }

        $loginId = Token::getLoginIdFromPayload($payload);
        $this->service->delete($id, $loginId);
        Response::json(true, null, '삭제되었습니다.');
    }

    /** 첨부 파일만 삭제 */
    public function clearFile(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }

        $loginId = Token::getLoginIdFromPayload($payload);
        $this->service->clearFile($id, $loginId);
        Response::json(true, null, '파일이 삭제되었습니다.');
    }
}
