<?php
/**
 * 채용정보 Controller (BMT_IDX = 5)
 *
 * GET    /recruit           → index  (목록)
 * GET    /recruit/{id}      → show   (단건)
 * POST   /recruit           → store  (등록, 관리자)
 * PUT    /recruit/{id}      → update (수정, 관리자)
 * DELETE /recruit/{id}      → destroy(삭제, 관리자)
 *
 * 추가 필드
 *   BD_FIELD_2 = period_start (접수시작일)
 *   BD_FIELD_3 = period_end   (접수종료일)
 */
class RecruitController
{
    private BoardService $service;

    public function __construct()
    {
        $this->service = new BoardService(5);
    }

    // ─────────────────────────────────────────────────────────────

    public function index(Request $request): void
    {
        $result = $this->service->getList($request->query);

        foreach ($result['items'] as &$item) {
            $item['period_start'] = $item['field2'] ?? null;
            $item['period_end']   = $item['field3'] ?? null;
            unset($item['field1'], $item['field2'], $item['field3'], $item['content']);
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

        $item['period_start'] = $item['field2'] ?? null;
        $item['period_end']   = $item['field3'] ?? null;
        unset($item['field1'], $item['field2'], $item['field3']);

        Response::ok($item);
    }

    // ─────────────────────────────────────────────────────────────

    public function store(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $title       = trim((string)$request->input('title', ''));
        $content     = (string)$request->input('content', '');
        $isPinned    = $request->input('is_pinned', '0') === '1';
        $periodStart = $request->input('period_start') ?? null;
        $periodEnd   = $request->input('period_end')   ?? null;

        if ($title === '') { Response::error('제목을 입력해주세요.'); return; }

        try {
            $id = $this->service->create(
                title:      $title,
                content:    $content,
                authorId:   Token::getLoginIdFromPayload($payload),
                authorName: Token::getNameFromPayload($payload),
                isPinned:   $isPinned,
                field1:     null,
                field2:     $periodStart,
                field3:     $periodEnd
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

        $id          = (int)($params['id'] ?? 0);
        $title       = trim((string)$request->input('title', ''));
        $content     = (string)$request->input('content', '');
        $isPinned    = $request->input('is_pinned', '0') === '1';
        $periodStart = $request->input('period_start') ?? null;
        $periodEnd   = $request->input('period_end')   ?? null;

        if ($id <= 0)      { Response::error('잘못된 요청입니다.'); return; }
        if ($title === '') { Response::error('제목을 입력해주세요.'); return; }

        try {
            $this->service->update(
                id:       $id,
                title:    $title,
                content:  $content,
                isPinned: $isPinned,
                field1:   null,
                field2:   $periodStart,
                field3:   $periodEnd
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
