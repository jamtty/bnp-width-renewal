<?php
/**
 * 건강정보 Controller (BMT_IDX = 7)
 *
 * GET    /health-info           → index  (목록)
 * GET    /health-info/{id}      → show   (단건)
 * POST   /health-info           → store  (등록, 관리자)
 * PUT    /health-info/{id}      → update (수정, 관리자)
 * DELETE /health-info/{id}      → destroy(삭제, 관리자)
 */
class HealthInfoController
{
    private BoardService $service;

    public function __construct()
    {
        $this->service = new BoardService(7);
    }

    // ─────────────────────────────────────────────────────────────

    public function index(Request $request): void
    {
        $result = $this->service->getList($request->query);

        foreach ($result['items'] as &$item) {
            unset($item['field1'], $item['field2'], $item['field3']);
        }
        unset($item);

        Response::ok($result);
    }

    // ─────────────────────────────────────────────────────────────

    public function show(Request $request, array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); return; }

        try {
            $item = $this->service->getOne($id);
        } catch (RuntimeException $e) {
            Response::error($e->getMessage(), $e->getCode() ?: 400);
            return;
        }

        if (!$item) { Response::error('게시물을 찾을 수 없습니다.', 404); return; }

        unset($item['field1'], $item['field2'], $item['field3']);
        Response::ok($item);
    }

    // ─────────────────────────────────────────────────────────────

    public function store(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $title    = trim((string)$request->input('title', ''));
        $content  = (string)$request->input('content', '');
        $isPinned = $request->input('is_pinned', '0') === '1';

        if ($title === '') { Response::error('제목을 입력해주세요.'); return; }

        try {
            $id = $this->service->create(
                title:      $title,
                content:    $content,
                authorId:   Token::getLoginIdFromPayload($payload),
                authorName: Token::getNameFromPayload($payload),
                isPinned:   $isPinned
            );
            Response::ok(['id' => $id], '등록되었습니다.');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage());
        }
    }

    // ─────────────────────────────────────────────────────────────

    public function update(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id       = (int)($params['id'] ?? 0);
        $title    = trim((string)$request->input('title', ''));
        $content  = (string)$request->input('content', '');
        $isPinned = $request->input('is_pinned', '0') === '1';

        if ($id <= 0)      { Response::error('잘못된 요청입니다.'); return; }
        if ($title === '') { Response::error('제목을 입력해주세요.'); return; }

        try {
            $this->service->update(
                id:       $id,
                title:    $title,
                content:  $content,
                isPinned: $isPinned
            );
            Response::ok(null, '수정되었습니다.');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage(), $e->getCode() ?: 400);
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
            $this->service->delete($id);
            Response::ok(null, '삭제되었습니다.');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage(), $e->getCode() ?: 400);
        }
    }

    public function togglePin(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); return; }

        $ok = $this->service->togglePin($id);
        if (!$ok) { Response::error('게시물을 찾을 수 없습니다.', 404); return; }

        Response::ok(null, '변경되었습니다.');
    }
}
