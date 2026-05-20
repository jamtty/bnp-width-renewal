<?php
/**
 * 의료진 Controller
 *
 * GET  /doctor                  → index (목록, 관리자용)
 * GET  /doctor/by-dept/{code}   → byDept (진료과별 공개 목록)
 * GET  /doctor/{id}             → show
 * POST /doctor                  → store
 * POST /doctor/{id}             → update
 * POST /doctor/{id}/use         → updateUseYn
 * POST /doctor/{id}/sort        → updateSortOrder
 * POST /doctor/{id}/delete      → destroy
 */
class DoctorController
{
    private DoctorService $service;
    private const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

    public function __construct()
    {
        $this->service = new DoctorService();
    }

    public function index(Request $request): void
    {
        Response::ok($this->service->getList($request->query));
    }

    public function byDept(Request $request, array $params): void
    {
        $code  = trim((string)($params['code'] ?? ''));
        if ($code === '') { Response::error('진료과 코드가 필요합니다.', 400); return; }
        Response::ok($this->service->getByDept($code));
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

        $uploaded = FileUploader::process('image', 'doctor', self::MAX_IMAGE_SIZE);
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

        $uploaded = FileUploader::process('image', 'doctor', self::MAX_IMAGE_SIZE);
        if (!empty($uploaded)) {
            $this->service->deleteFile($id);
            $f = $uploaded[0];
            $this->service->saveFile($id, $f['ori_name'], $f['save_name'], $f['file_path'], (int)$f['file_size'], $f['file_ext']);
        }

        Response::ok(['id' => $id, 'message' => '수정되었습니다.']);
    }

    public function updateUseYn(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id    = (int)($params['id'] ?? 0);
        $useYn = trim((string)$request->input('use_yn', ''));
        if (!in_array($useYn, ['Y', 'N'], true)) { Response::error('올바른 값이 아닙니다.'); return; }
        $this->service->updateUseYn($id, $useYn);
        Response::ok(['message' => '변경되었습니다.']);
    }

    public function updateSortOrder(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id        = (int)($params['id'] ?? 0);
        $sortOrder = (int)$request->input('sort_order', 0);
        if ($id <= 0 || $sortOrder < 0) { Response::error('올바른 값이 아닙니다.'); return; }
        $this->service->updateSortOrder($id, $sortOrder);
        Response::ok(['message' => '순서가 변경되었습니다.']);
    }

    public function destroy(Request $request, array $params): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); return; }

        $id = (int)($params['id'] ?? 0);
        if ($id <= 0) { Response::error('올바른 값이 아닙니다.'); return; }
        $this->service->deleteFile($id);
        $this->service->delete($id);
        Response::ok(['message' => '삭제되었습니다.']);
    }

    // ── private helpers ────────────────────────────────────────

    private function extractData(Request $request, string $userId, bool $isUpdate = false): ?array
    {
        $deptCodesRaw = trim((string)$request->input('dept_codes', ''));
        $deptCode     = trim((string)$request->input('dept_code',  ''));
        $docName      = trim((string)$request->input('doc_name',     ''));
        $docTitle     = trim((string)$request->input('doc_title',    ''));
        $docMajor     = trim((string)$request->input('doc_major',    ''));
        $docSpecialty = trim((string)$request->input('doc_specialty',''));
        $docCareer    = trim((string)$request->input('doc_career',   ''));
        $careerLabel  = trim((string)$request->input('career_label', '약력'));
        $scheduleJson = trim((string)$request->input('schedule_json',''));
        $useYn        = trim((string)$request->input('use_yn',       'Y'));
        $sortOrder    = (int)$request->input('sort_order', 1);

        // dept_codes (JSON array) 파싱
        $deptCodes = [];
        if ($deptCodesRaw !== '') {
            $decoded = json_decode($deptCodesRaw, true);
            if (is_array($decoded)) {
                $deptCodes = array_values(array_filter($decoded, fn($c) => is_string($c) && $c !== ''));
            }
        }
        // fallback: single dept_code
        if (empty($deptCodes) && $deptCode !== '') {
            $deptCodes = [$deptCode];
        }
        // 첫 번째 항목을 primary dept_code로 사용
        if (!empty($deptCodes)) {
            $deptCode = $deptCodes[0];
        }

        if ($docName === '')    { Response::error('의사 이름을 입력해 주세요.');        return null; }

        // schedule_json 유효성 검사
        if ($scheduleJson !== '') {
            $decoded = json_decode($scheduleJson, true);
            if ($decoded === null) { Response::error('진료일정 형식이 올바르지 않습니다.'); return null; }
            $scheduleJson = json_encode($decoded, JSON_UNESCAPED_UNICODE);
        } else {
            $scheduleJson = null;
        }

        $data = [
            'dept_code'     => $deptCode,
            'dept_codes'    => json_encode($deptCodes, JSON_UNESCAPED_UNICODE),
            'doc_name'      => $docName,
            'doc_title'     => $docTitle ?: null,
            'doc_major'     => $docMajor ?: null,
            'doc_specialty' => $docSpecialty ?: null,
            'doc_career'    => $docCareer ?: null,
            'career_label'  => $careerLabel ?: '약력',
            'schedule_json' => $scheduleJson,
            'use_yn'        => in_array($useYn, ['Y', 'N'], true) ? $useYn : 'Y',
            'sort_order'    => max(1, $sortOrder),
        ];

        if ($isUpdate) {
            $data['updated_by'] = $userId;
        } else {
            $data['created_by'] = $userId;
        }

        return $data;
    }
}
