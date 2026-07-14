<?php
/**
 * 전문가 관리 API
 *
 * GET    /api/expert           목록 조회 (page, size, type, keyword)
 * GET    /api/expert/{id}      상세 조회
 * POST   /api/expert           등록 (FormData: expert_type, expert_name, expert_tags, expert_desc, expert_career, sort_order, expert_img)
 * POST   /api/expert/{id}      수정 (FormData: ...)
 * POST   /api/expert/{id}/delete  삭제
 */
function handleExpert(array $seg, string $method): void
{
    $pdo = getDB();
    $id  = isset($seg[1]) && is_numeric($seg[1]) ? (int)$seg[1] : null;
    $sub = $seg[2] ?? '';

    // ----------------------------------------------------------------
    // GET /api/expert  (목록 - 공개용: use_yn=Y, del_yn=N 만)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id === null) {
        $page    = max(1, (int)($_GET['page']  ?? 1));
        $size    = max(1, min(100, (int)($_GET['size'] ?? 10)));
        $type    = trim($_GET['type']   ?? '');   // advisor | coach | '' (전체)
        $keyword = trim($_GET['keyword'] ?? '');
        $admin   = ($_GET['admin'] ?? '') === '1';   // 관리자 모드 (삭제된 항목도 조회 가능)
        $offset  = ($page - 1) * $size;

        $where  = [];
        $params = [];

        // 공개용은 use_yn=Y, del_yn=N 만
        if (!$admin) {
            $where[] = 'use_yn = ?';
            $params[] = 'Y';
            $where[] = 'del_yn = ?';
            $params[] = 'N';
        }

        if ($type !== '' && in_array($type, ['advisor', 'coach'], true)) {
            $where[]  = 'expert_type = ?';
            $params[] = $type;
        }

        if ($keyword !== '') {
            $where[]  = '(expert_name LIKE ? OR expert_tags LIKE ? OR expert_desc LIKE ?)';
            $params[] = "%$keyword%";
            $params[] = "%$keyword%";
            $params[] = "%$keyword%";
        }

        $whereStr = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        // 전체 카운트
        $cntStmt = $pdo->prepare("SELECT COUNT(*) FROM expert_tbl $whereStr");
        $cntStmt->execute($params);
        $total = (int)$cntStmt->fetchColumn();

        // 목록
        $sql = "SELECT expert_id, expert_type, expert_name, expert_tags, expert_desc,
                       expert_career, expert_img, expert_img_org,
                       sort_order, use_yn, created_at, updated_at
                FROM expert_tbl $whereStr
                ORDER BY expert_type ASC, sort_order ASC, expert_id ASC
                LIMIT ? OFFSET ?";
        $listStmt = $pdo->prepare($sql);
        $listStmt->execute(array_merge($params, [$size, $offset]));
        $items = $listStmt->fetchAll();

        // career → 배열 변환, img URL 추가
        foreach ($items as &$row) {
            $row = _formatExpert($row);
        }
        unset($row);

        successResponse([
            'items'       => $items,
            'total'       => $total,
            'total_pages' => (int)ceil($total / $size),
            'page'        => $page,
            'size'        => $size,
        ]);
    }

    // ----------------------------------------------------------------
    // GET /api/expert/{id}  (상세)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id !== null) {
        $stmt = $pdo->prepare("SELECT * FROM expert_tbl WHERE expert_id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('전문가 정보를 찾을 수 없습니다.', 404);

        successResponse(_formatExpert($row));
    }

    // ----------------------------------------------------------------
    // POST /api/expert/{id}/delete  (삭제 - 실제 삭제)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'delete') {
        requireAuth();

        // 기존 데이터 조회 (이미지 파일 삭제용)
        $stmt = $pdo->prepare("SELECT expert_img FROM expert_tbl WHERE expert_id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('전문가 정보를 찾을 수 없습니다.', 404);

        // 첨부 이미지 파일 삭제
        if (!empty($row['expert_img'])) {
            deleteUploadedFile('expert', $row['expert_img']);
        }

        // DB에서 실제 삭제
        $pdo->prepare("DELETE FROM expert_tbl WHERE expert_id = ?")->execute([$id]);
        successResponse(null, '삭제되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/expert  (등록)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id === null) {
        requireAuth();
        $expertType  = trim($_POST['expert_type']  ?? 'advisor');
        $expertName  = trim($_POST['expert_name']  ?? '');
        $expertTags  = trim($_POST['expert_tags']  ?? '');
        $expertDesc  = trim($_POST['expert_desc']  ?? '');
        $expertCareer = trim($_POST['expert_career'] ?? '');
        $sortOrder   = (int)($_POST['sort_order']  ?? 1);
        $useYn       = ($_POST['use_yn'] ?? 'Y') === 'N' ? 'N' : 'Y';

        if ($expertName === '') errorResponse('이름을 입력해주세요.');
        if (!in_array($expertType, ['advisor', 'coach'], true)) errorResponse('구분 값이 올바르지 않습니다.');

        // 이미지 업로드
        $imgSaveName = null;
        $imgOrgName  = null;
        if (!empty($_FILES['expert_img']) && $_FILES['expert_img']['error'] === UPLOAD_ERR_OK) {
            $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            $uploaded = uploadFile($_FILES['expert_img'], 'expert', $allowed);
            $imgSaveName = $uploaded['save_name'];
            $imgOrgName  = $uploaded['ori_name'];
        }

        $pdo->prepare(
            "INSERT INTO expert_tbl (expert_type, expert_name, expert_tags, expert_desc, expert_career, expert_img, expert_img_org, sort_order, use_yn, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"
        )->execute([$expertType, $expertName, $expertTags, $expertDesc, $expertCareer, $imgSaveName, $imgOrgName, $sortOrder, $useYn]);

        $newId = (int)$pdo->lastInsertId();
        successResponse(['expert_id' => $newId], '등록되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/expert/{id}  (수정)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === '') {
        requireAuth();

        // 기존 데이터 확인
        $stmt = $pdo->prepare("SELECT * FROM expert_tbl WHERE expert_id = ?");
        $stmt->execute([$id]);
        $old = $stmt->fetch();
        if (!$old) errorResponse('전문가 정보를 찾을 수 없습니다.', 404);

        $expertType   = trim($_POST['expert_type']  ?? $old['expert_type']);
        $expertName   = trim($_POST['expert_name']  ?? $old['expert_name']);
        $expertTags   = trim($_POST['expert_tags']  ?? $old['expert_tags']);
        $expertDesc   = trim($_POST['expert_desc']  ?? $old['expert_desc']);
        $expertCareer = trim($_POST['expert_career'] ?? $old['expert_career']);
        $sortOrder    = (int)($_POST['sort_order']  ?? $old['sort_order']);
        $useYn        = ($_POST['use_yn'] ?? $old['use_yn']) === 'N' ? 'N' : 'Y';

        if ($expertName === '') errorResponse('이름을 입력해주세요.');
        if (!in_array($expertType, ['advisor', 'coach'], true)) errorResponse('구분 값이 올바르지 않습니다.');

        // 이미지 업로드
        $imgSaveName = $old['expert_img'];
        $imgOrgName  = $old['expert_img_org'];

        // 이미지 삭제 요청
        if (($_POST['remove_img'] ?? '') === '1') {
            if ($imgSaveName) deleteUploadedFile('expert', $imgSaveName);
            $imgSaveName = null;
            $imgOrgName  = null;
        }

        // 새 이미지 업로드
        if (!empty($_FILES['expert_img']) && $_FILES['expert_img']['error'] === UPLOAD_ERR_OK) {
            // 기존 이미지 삭제
            if ($imgSaveName) deleteUploadedFile('expert', $imgSaveName);
            $allowed   = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            $uploaded  = uploadFile($_FILES['expert_img'], 'expert', $allowed);
            $imgSaveName = $uploaded['save_name'];
            $imgOrgName  = $uploaded['ori_name'];
        }

        $pdo->prepare(
            "UPDATE expert_tbl
                SET expert_type = ?, expert_name = ?, expert_tags = ?, expert_desc = ?,
                    expert_career = ?, expert_img = ?, expert_img_org = ?,
                    sort_order = ?, use_yn = ?, updated_at = NOW()
              WHERE expert_id = ?"
        )->execute([$expertType, $expertName, $expertTags, $expertDesc, $expertCareer, $imgSaveName, $imgOrgName, $sortOrder, $useYn, $id]);

        successResponse(null, '수정되었습니다.');
    }

    errorResponse('잘못된 요청입니다.', 404);
}

// ================================================================
// 헬퍼 함수
// ================================================================

/**
 * expert_career (줄바꿈 구분 텍스트) → 배열로 변환
 * expert_img → 절대 URL 변환
 */
function _formatExpert(array $row): array
{
    // career: 줄바꿈 기준 배열화
    $careerArr = [];
    if (!empty($row['expert_career'])) {
        $lines = preg_split('/\r\n|\r|\n/', $row['expert_career']);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line !== '') $careerArr[] = $line;
        }
    }

    // img URL
    $imgUrl = '';
    if (!empty($row['expert_img'])) {
        $imgUrl = rtrim(UPLOAD_BASE_URL, '/') . '/expert/' . $row['expert_img'];
    }

    return [
        'expert_id'    => (int)$row['expert_id'],
        'expert_type'  => $row['expert_type'],
        'expert_name'  => $row['expert_name'],
        'expert_tags'  => $row['expert_tags'] ?? '',
        'expert_desc'  => $row['expert_desc'] ?? '',
        'expert_career' => $careerArr,
        'expert_img'   => $row['expert_img'] ?? '',
        'expert_img_org' => $row['expert_img_org'] ?? '',
        'expert_img_url' => $imgUrl,
        'sort_order'   => (int)($row['sort_order'] ?? 1),
        'use_yn'       => $row['use_yn'] ?? 'Y',
        'del_yn'       => $row['del_yn'] ?? 'N',
        'created_at'   => $row['created_at'] ?? '',
        'updated_at'   => $row['updated_at'] ?? '',
    ];
}
