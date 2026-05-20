<?php
/**
 * 빠른예약 Controller
 *
 * GET  /fast-reserve           → index  (목록)
 * GET  /fast-reserve/{id}      → show   (단건)
 * POST /fast-reserve           → store  (신규 등록)
 * POST /fast-reserve/{id}/succ → updateSucc (처리여부 변경)
 * POST /fast-reserve/{id}/delete → destroy (삭제)
 */
class FastReserveController
{
    private FastReserveService $service;

    public function __construct()
    {
        $this->service = new FastReserveService();
    }

    public function index(Request $request): void
    {
        $result = $this->service->getList($request->query);
        Response::ok($result);
    }

    public function store(Request $request): void
    {
        $name   = trim((string)$request->input('name', ''));
        $phone  = trim((string)$request->input('phone', ''));
        $priYn  = trim((string)$request->input('pri_yn', 'N'));

        if ($name === '') { Response::error('이름을 입력해주세요.'); return; }
        if ($phone === '') { Response::error('연락처를 입력해주세요.'); return; }
        if (!in_array($priYn, ['Y', 'N'], true)) { $priYn = 'N'; }

        $id = $this->service->create($name, $phone, $priYn);
        Response::json(true, ['id' => $id], '신청이 완료되었습니다.', 201);
    }

    public function show(Request $request, array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); return; }

        $item = $this->service->getOne($id);
        if (!$item) { Response::error('데이터를 찾을 수 없습니다.', 404); return; }

        Response::ok($item);
    }

    public function updateSucc(Request $request, array $params): void
    {
        $id     = (int)($params['id'] ?? 0);
        $succYn = trim((string)$request->input('succ_yn', ''));
        if ($id <= 0 || !in_array($succYn, ['Y', 'N'], true)) {
            Response::error('잘못된 요청입니다.'); return;
        }

        $ok = $this->service->updateSuccYn($id, $succYn);
        if (!$ok) { Response::error('처리에 실패했습니다.'); return; }

        Response::ok(['message' => '처리완료']);
    }

    public function destroy(Request $request, array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('잘못된 요청입니다.'); return; }

        $ok = $this->service->delete($id);
        if (!$ok) { Response::error('삭제에 실패했습니다.'); return; }

        Response::ok(['message' => '삭제완료']);
    }
}
