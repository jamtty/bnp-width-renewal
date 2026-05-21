<?php
/**
 * ���� ��� Controller (pcs_banner)
 *
 * GET  /main-banner          �� index  (������ ���)
 * GET  /main-banner/active   �� active (������, display_yn=Y)
 * GET  /main-banner/{id}     �� show
 * POST /main-banner          �� store
 * POST /main-banner/{id}     �� update
 * POST /main-banner/{id}/display �� updateDisplayYn
 * POST /main-banner/{id}/sort    �� updateSortOrder
 * POST /main-banner/{id}/delete  �� destroy
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
        if (!$item) { Response::error('�����͸� ã�� �� �����ϴ�.', 404); return; }
        Response::ok($item);
    }

    public function store(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('������ �ʿ��մϴ�.', 401); return; }

        $data = $this->extractBaseData($request);
        if ($data === null) return;
        $data['reg_user'] = Token::getLoginIdFromPayload($payload);

        // �̹���(web) ���ε�
        $uploadedWeb = FileUploader::process('image_web', 'banner', self::MAX_IMAGE_SIZE);
        if (!empty($uploadedWeb)) {
            $f = $uploadedWeb[0];
            $data['img_web']     = $f['save_name'];
            $data['img_web_ori'] = $f['ori_name'];
        }
        // �̹���(mobile) ���ε�
        $uploadedMobile = FileUploader::process('image_mobile', 'banner', self::MAX_IMAGE_SIZE);
        if (!empty($uploadedMobile)) {
            $f = $uploadedMobile[0];
            $data['img_mobile']     = $f['save_name'];
            $data['img_mobile_ori'] = $f['ori_name'];
        }

        $id = $this->service->create($data);
        Response::json(true, ['id' => $id], '��ϵǾ����ϴ�.', 201);
    }

    public function update(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('������ �ʿ��մϴ�.', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('�����͸� ã�� �� �����ϴ�.', 404); return; }

        $data = $this->extractBaseData($request, isUpdate: true);
        if ($data === null) return;

        $uploadedWeb = FileUploader::process('image_web', 'banner', self::MAX_IMAGE_SIZE);
        if (!empty($uploadedWeb)) {
            $f = $uploadedWeb[0];
            $data['img_web']     = $f['save_name'];
            $data['img_web_ori'] = $f['ori_name'];
        }
        $uploadedMobile = FileUploader::process('image_mobile', 'banner', self::MAX_IMAGE_SIZE);
        if (!empty($uploadedMobile)) {
            $f = $uploadedMobile[0];
            $data['img_mobile']     = $f['save_name'];
            $data['img_mobile_ori'] = $f['ori_name'];
        }

        $this->service->update($id, $data);
        Response::ok(['id' => $id]);
    }

    public function updateDisplayYn(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('������ �ʿ��մϴ�.', 401); return; }

        $id        = (int)($params['id'] ?? 0);
        $displayYn = strtoupper(trim((string)($request->body['display_yn'] ?? '')));
        if (!in_array($displayYn, ['Y', 'N'], true)) { Response::error('��ȿ���� ���� ���Դϴ�.', 400); return; }

        $this->service->updateDisplayYn($id, $displayYn);
        Response::ok(['id' => $id]);
    }

    public function updateSortOrder(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('������ �ʿ��մϴ�.', 401); return; }

        $id       = (int)($params['id'] ?? 0);
        $sortOrder = (int)($request->body['sort_order'] ?? 0);

        $this->service->updateSortOrder($id, $sortOrder);
        Response::ok(['id' => $id]);
    }

    public function destroy(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('������ �ʿ��մϴ�.', 401); return; }

        $id = (int)($params['id'] ?? 0);
        $this->service->delete($id);
        Response::ok(['id' => $id]);
    }

    // ���� private ����������������������������������������������������������������������������������������������������

    private function extractBaseData(Request $request, bool $isUpdate = false): ?array
    {
        $title = trim((string)($request->body['title'] ?? ''));
        if ($title === '') { Response::error('��ʸ��� �Է����ּ���.', 400); return null; }

        return [
            'title'      => $title,
            'display_yn' => strtoupper(trim((string)($request->body['display_yn'] ?? 'N'))),
            'sort_order' => trim((string)($request->body['sort_order'] ?? '')),
            'img_web'        => '',
            'img_mobile'     => '',
            'img_web_ori'    => '',
            'img_mobile_ori' => '',
        ];
    }
}
