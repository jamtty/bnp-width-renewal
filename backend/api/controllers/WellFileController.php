<?php
/**
 * 건강증진센터 파일 관리 Controller
 *
 * GET  /well-file              → index  (관리자 전체 목록)
 * GET  /well-file/by-key/{key} → byKey  (공개용, 메뉴키로 조회)
 * GET  /well-file/{id}         → show
 * POST /well-file/{id}         → update (label, use_yn, 파일 교체)
 * POST /well-file/{id}/clear   → clearFile (파일 삭제)
 */
class WellFileController
{
    private WellFileService $service;
    private const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB

    public function __construct()
    {
        $this->service = new WellFileService();
    }

    public function index(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        Response::ok($this->service->getList());
    }

    /** 공개용: 메뉴 키로 파일 URL 반환 */
    public function byKey(Request $request, array $params): void
    {
        $key  = $params['key'] ?? '';
        $item = $this->service->getByMenuKey($key);
        if (!$item) { Response::error('파일을 찾을 수 없습니다.', 404); return; }
        Response::ok($item);
    }

    public function show(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }
        Response::ok($item);
    }

    public function update(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }

        $loginId = Token::getLoginIdFromPayload($payload);
        $label   = trim((string)($request->body['label'] ?? $item['label']));
        $useYn   = in_array($request->body['use_yn'] ?? '', ['Y', 'N'], true)
                    ? $request->body['use_yn']
                    : $item['use_yn'];

        if ($label === '') { Response::error('표시 이름은 필수입니다.'); return; }

        $this->service->update($id, [
            'label'      => $label,
            'use_yn'     => $useYn,
            'updated_by' => $loginId,
        ]);

        // 새 파일이 업로드된 경우
        $uploaded = FileUploader::process('file', 'well', self::MAX_FILE_SIZE);
        if (!empty($uploaded)) {
            $f = $uploaded[0];
            $this->service->updateFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], (int)$f['file_size'], $f['file_ext'], $loginId);
        }

        Response::json(true, null, '수정되었습니다.');
    }

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
