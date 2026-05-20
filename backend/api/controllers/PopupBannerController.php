<?php
/**
 * ?앹뾽 諛곕꼫 Controller
 *
 * GET  /popup-banner              ??index
 * GET  /popup-banner/{id}         ??show
 * POST /popup-banner              ??store
 * POST /popup-banner/{id}         ??update
 * POST /popup-banner/{id}/use     ??updateUseYn
 * POST /popup-banner/{id}/sort    ??updateSortOrder
 * POST /popup-banner/{id}/delete  ??destroy
 */
class PopupBannerController
{
    private PopupBannerService $service;
    private const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

    public function __construct()
    {
        $this->service = new PopupBannerService();
    }

    public function index(Request $request): void
    {
        Response::ok($this->service->getList($request->query));
    }

    public function show(Request $request, array $params): void
    {
        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('?곗씠?곕? 李얠쓣 ???놁뒿?덈떎.', 404); return; }
        Response::ok($item);
    }

    public function store(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('?몄쬆???꾩슂?⑸땲??', 401); return; }

        $data = $this->extractData($request, Token::getLoginIdFromPayload($payload));
        if ($data === null) return;

        $id = $this->service->create($data);

        // ?대?吏 ?낅줈??
        $uploaded = FileUploader::process('image', 'popup', self::MAX_IMAGE_SIZE);
        if (!empty($uploaded)) {
            $f = $uploaded[0];
            $this->service->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], (int)$f['file_size'], $f['file_ext']);
        }

        Response::json(true, ['id' => $id], '?깅줉?섏뿀?듬땲??', 201);
    }

    public function update(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('?몄쬆???꾩슂?⑸땲??', 401); return; }

        $id   = (int)($params['id'] ?? 0);
        $item = $this->service->getOne($id);
        if (!$item) { Response::error('?곗씠?곕? 李얠쓣 ???놁뒿?덈떎.', 404); return; }

        $data = $this->extractData($request, Token::getLoginIdFromPayload($payload), isUpdate: true);
        if ($data === null) return;

        $this->service->update($id, $data);

        // ???대?吏媛 ?덉쓣 ?뚮쭔 援먯껜
        $uploaded = FileUploader::process('image', 'popup', self::MAX_IMAGE_SIZE);
        if (!empty($uploaded)) {
            $this->service->deleteFile($id);
            $f = $uploaded[0];
            $this->service->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], (int)$f['file_size'], $f['file_ext']);
        }

        Response::ok(['id' => $id, 'message' => '?섏젙?섏뿀?듬땲??']);
    }

    public function updateUseYn(Request $request, array $params): void
    {
        $id    = (int)($params['id'] ?? 0);
        $useYn = trim((string)$request->input('use_yn', ''));
        if (!in_array($useYn, ['Y', 'N'], true)) { Response::error('?섎せ???붿껌?낅땲??'); return; }
        $this->service->updateUseYn($id, $useYn);
        Response::ok(['message' => '蹂寃쎈릺?덉뒿?덈떎.']);
    }

    public function updateSortOrder(Request $request, array $params): void
    {
        $id        = (int)($params['id'] ?? 0);
        $sortOrder = (int)$request->input('sort_order', 0);
        if ($id <= 0 || $sortOrder < 0) { Response::error('?섎せ???붿껌?낅땲??'); return; }
        $this->service->updateSortOrder($id, $sortOrder);
        Response::ok(['message' => '?쒖꽌媛 蹂寃쎈릺?덉뒿?덈떎.']);
    }

    public function destroy(Request $request, array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('?섎せ???붿껌?낅땲??'); return; }
        $this->service->deleteFile($id);
        $this->service->delete($id);
        Response::ok(['message' => '??젣?섏뿀?듬땲??']);
    }

    // ??? private helpers ??????????????????????????????????????????

    private function extractData(Request $request, string $userId, bool $isUpdate = false): ?array
    {
        $site        = trim((string)$request->input('site',         'MAIN'));
        $adminTitle  = trim((string)$request->input('admin_title',  ''));
        $url         = trim((string)$request->input('url',          ''));
        $linkTarget  = trim((string)$request->input('link_target',  '_self'));
        $periodStart = trim((string)$request->input('period_start', ''));
        $periodEnd   = trim((string)$request->input('period_end',   ''));
        $author      = trim((string)$request->input('author',       ''));
        $useYn       = trim((string)$request->input('use_yn',       'Y'));
        $imgWidth    = (int)$request->input('img_width',   0);
        $imgHeight   = (int)$request->input('img_height',  0);
        $imgPosLeft  = (int)$request->input('img_pos_left', 0);
        $imgPosTop   = (int)$request->input('img_pos_top',  0);
        $sortOrder   = (int)$request->input('sort_order',  1);

        if ($adminTitle === '') { Response::error('愿由ъ옄 ?쒕ぉ???낅젰?댁＜?몄슂.'); return null; }

        $data = [
            'site'          => in_array($site, ['MAIN', 'FUNE', 'WELL'], true) ? $site : 'MAIN',
            'admin_title'   => $adminTitle,
            'url'           => $url,
            'link_target'   => ($linkTarget === '_blank') ? 'B' : 'S',
            'period_start'  => $periodStart !== '' ? $periodStart : null,
            'period_end'    => $periodEnd   !== '' ? $periodEnd   : null,
            'author'        => $author,
            'use_yn'        => in_array($useYn, ['Y', 'N'], true) ? $useYn : 'Y',
            'img_width'     => $imgWidth,
            'img_height'    => $imgHeight,
            'img_pos_left'  => $imgPosLeft,
            'img_pos_top'   => $imgPosTop,
            'sort_order'    => $sortOrder,
        ];

        if ($isUpdate) {
            $data['updated_by'] = $userId;
        } else {
            $data['created_by'] = $userId;
        }

        return $data;
    }
}

