<?php
/**
 * 메인 배너 Controller
 *
 * GET  /main-banner          → index  (관리자 목록)
 * GET  /main-banner/active   → active (공개용, 활성 배너)
 * GET  /main-banner/{id}     → show
 * POST /main-banner          → store
 * POST /main-banner/{id}     → update
 * POST /main-banner/{id}/use → updateUseYn
 * POST /main-banner/{id}/sort→ updateSortOrder
 * POST /main-banner/{id}/delete → destroy
 */
class MainBannerController
{
    private MainBannerService $service;
    private const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

    public function __construct()
    {
        $this->service = new MainBannerService();
    }

    public function index(Request $request): void
    {
        Response::ok($this->service->getList($request->query));
    }

    public function active(Request $request): void
    {
        Response::ok($this->service->getActive());
    }

    public function show(Request $request, array $params): void
    {
        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }
        Response::ok($item);
    }

    public function store(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $data = $this->extractData($request, Token::getLoginIdFromPayload($payload));
        if ($data === null) return;

        $id = $this->service->create($data);

        $uploaded = FileUploader::process('image', 'main_banner', self::MAX_IMAGE_SIZE);
        if (!empty($uploaded)) {
            $f = $uploaded[0];
            $this->service->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], (int)$f['file_size'], $f['file_ext']);
        }

        Response::json(true, ['id' => $id], '등록되었습니다.', 201);
    }

    public function update(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }

        $data = $this->extractData($request, Token::getLoginIdFromPayload($payload), isUpdate: true);
        if ($data === null) return;

        $this->service->update($id, $data);

        $uploaded = FileUploader::process('image', 'main_banner', self::MAX_IMAGE_SIZE);
        if (!empty($uploaded)) {
            $this->service->deleteFile($id);
            $f = $uploaded[0];
            $this->service->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], (int)$f['file_size'], $f['file_ext']);
        }

        Response::ok(['id' => $id]);
    }

    public function updateUseYn(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id    = (int)($params['id'] ?? 0);
        $useYn = strtoupper(trim((string)($request->body['use_yn'] ?? '')));
        if (!in_array($useYn, ['Y', 'N'], true)) { Response::error('유효하지 않은 값입니다.', 400); return; }

        $this->service->updateUseYn($id, $useYn);
        Response::ok(['id' => $id]);
    }

    public function updateSortOrder(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id        = (int)($params['id'] ?? 0);
        $sortOrder = (int)($request->body['sort_order'] ?? 0);

        $this->service->updateSortOrder($id, $sortOrder);
        Response::ok(['id' => $id]);
    }

    public function destroy(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id = (int)($params['id'] ?? 0);
        $this->service->deleteFile($id);
        $this->service->delete($id);
        Response::ok(['id' => $id]);
    }

    // ── private ──────────────────────────────────────────────────

    private function extractData(Request $request, string $userId, bool $isUpdate = false): ?array
    {
        $linkTarget = strtolower(trim((string)($request->body['link_target'] ?? '_self')));
        $dbTarget   = $linkTarget === '_blank' ? 'B' : 'S';

        $data = [
            'url'         => trim((string)($request->body['url']        ?? '')),
            'link_target' => $dbTarget,
            'use_yn'      => strtoupper(trim((string)($request->body['use_yn'] ?? 'Y'))),
            'sort_order'  => (int)($request->body['sort_order'] ?? 1),
        ];

        if ($isUpdate) {
            $data['updated_by'] = $userId;
        } else {
            $data['created_by'] = $userId;
        }

        return $data;
    }

}
