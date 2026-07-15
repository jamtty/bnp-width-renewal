<?php
/**
 * 팝업 관리 API
 *
 * GET    /api/popup          목록 조회 (page, size, keyword, use_yn)
 * GET    /api/popup/active   활성 팝업 목록 (use_yn = Y, 기간 내)
 * GET    /api/popup/{id}     상세 조회
 * POST   /api/popup          등록
 * POST   /api/popup/{id}     수정
 * POST   /api/popup/{id}/display  사용 여부 변경
 * POST   /api/popup/{id}/delete   삭제
 */
function handlePopup(array $seg, string $method): void
{
    $pdo = getDB();
    $id  = isset($seg[1]) && is_numeric($seg[1]) ? (int)$seg[1] : null;
    $sub = $seg[2] ?? '';

    // ----------------------------------------------------------------
    // GET /api/popup/active  (프론트 노출용 - 활성 팝업)
    // ----------------------------------------------------------------
    if ($method === 'GET' && ($seg[1] ?? '') === 'active') {
        $today = date('Y-m-d');
        $stmt  = $pdo->prepare(
            "SELECT id, admin_title AS title, url, link_target,
                    img_width, img_height, img_pos_left, img_pos_top,
                    img_ori_name, img_save_name, img_url,
                    sort_order
               FROM popup_banner
              WHERE use_yn = 'Y'
                AND (period_start IS NULL OR period_start <= ?)
                AND (period_end IS NULL OR period_end >= ?)
              ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute([$today, $today]);
        $items = $stmt->fetchAll();
        foreach ($items as &$row) {
            $row = _popupUrls($row);
        }
        unset($row);
        successResponse($items);
    }

    // ----------------------------------------------------------------
    // GET /api/popup  (관리자 목록)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id === null) {
        $page    = max(1, (int)($_GET['page']     ?? 1));
        $size    = max(1, min(100, (int)($_GET['size'] ?? 10)));
        $keyword = trim($_GET['keyword'] ?? '');
        $useYn   = $_GET['use_yn'] ?? '';
        $offset  = ($page - 1) * $size;

        $where  = [];
        $params = [];
        if ($keyword !== '') {
            $where[]  = 'admin_title LIKE ?';
            $params[] = '%' . $keyword . '%';
        }
        if (in_array($useYn, ['Y', 'N'], true)) {
            $where[]  = 'use_yn = ?';
            $params[] = $useYn;
        }
        $whereStr = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $cntStmt = $pdo->prepare("SELECT COUNT(*) FROM popup_banner $whereStr");
        $cntStmt->execute($params);
        $total = (int)$cntStmt->fetchColumn();

        $listStmt = $pdo->prepare(
            "SELECT id, admin_title AS title, url, link_target,
                    period_start, period_end, use_yn, sort_order,
                    img_ori_name, img_save_name, img_url,
                    img_width, img_height, created_by, created_at, updated_at
               FROM popup_banner $whereStr
              ORDER BY use_yn DESC, sort_order ASC, id ASC
              LIMIT ? OFFSET ?"
        );
        $listStmt->execute(array_merge($params, [$size, $offset]));
        $items = $listStmt->fetchAll();
        foreach ($items as &$row) {
            $row = _popupUrls($row);
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
    // GET /api/popup/{id}  (상세)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id !== null) {
        $stmt = $pdo->prepare(
            "SELECT id, admin_title AS title, url, link_target,
                    period_start, period_end, use_yn, sort_order,
                    img_ori_name, img_save_name, img_url,
                    img_width, img_height, img_pos_left, img_pos_top,
                    created_by, created_at, updated_at
               FROM popup_banner WHERE id = ?"
        );
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('팝업을 찾을 수 없습니다.', 404);
        successResponse(_popupUrls($row));
    }

    // ----------------------------------------------------------------
    // POST /api/popup/{id}/display  (사용 여부)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'display') {
        requireAuth();
        $body   = json_decode(file_get_contents('php://input'), true) ?? [];
        $useYn  = $body['use_yn'] ?? '';
        if (!in_array($useYn, ['Y', 'N'], true)) errorResponse('use_yn 은 Y 또는 N 이어야 합니다.');
        $pdo->prepare("UPDATE popup_banner SET use_yn = ?, updated_at = NOW() WHERE id = ?")->execute([$useYn, $id]);
        successResponse(null, '변경되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/popup/{id}/delete  (삭제)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'delete') {
        requireAuth();
        $stmt = $pdo->prepare("SELECT img_save_name FROM popup_banner WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('팝업을 찾을 수 없습니다.', 404);
        if ($row['img_save_name']) {
            deleteUploadedFile('popup', $row['img_save_name']);
        }
        $pdo->prepare("DELETE FROM popup_banner WHERE id = ?")->execute([$id]);
        successResponse(null, '삭제되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/popup  (등록)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id === null) {
        requireAuth();
        $auth = requireAuth();
        $title      = trim($_POST['title']      ?? '');
        $url        = trim($_POST['url']        ?? '');
        $linkTarget = $_POST['link_target']     ?? '_self';
        $periodStart = $_POST['period_start']   ?? null;
        $periodEnd  = $_POST['period_end']      ?? null;
        $useYn      = $_POST['use_yn']          ?? 'N';
        $sortOrder  = (int)($_POST['sort_order'] ?? 1);
        $imgWidth   = (int)($_POST['img_width']  ?? 0);
        $imgHeight  = (int)($_POST['img_height'] ?? 0);
        $imgPosLeft = (int)($_POST['img_pos_left'] ?? 0);
        $imgPosTop  = (int)($_POST['img_pos_top']  ?? 0);

        if ($title === '') errorResponse('제목을 입력해주세요.');
        if (!in_array($linkTarget, ['_self', '_blank'], true)) $linkTarget = '_self';

        $imgOriName  = '';
        $imgSaveName = '';
        $imgUrl      = '';

        if (!empty($_FILES['img_file']['name'])) {
            $imgOriName  = $_FILES['img_file']['name'];
            $imgSaveName = uploadFile($_FILES['img_file'], 'popup');
            $imgUrl      = '/uploads/popup/' . $imgSaveName;
        }

        $pdo->prepare(
            "INSERT INTO popup_banner
                (admin_title, url, link_target, period_start, period_end,
                 use_yn, sort_order, img_width, img_height, img_pos_left, img_pos_top,
                 img_ori_name, img_save_name, img_url, created_by, author)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        )->execute([
            $title, $url, $linkTarget,
            $periodStart ?: null, $periodEnd ?: null,
            $useYn, $sortOrder, $imgWidth, $imgHeight, $imgPosLeft, $imgPosTop,
            $imgOriName, $imgSaveName, $imgUrl, $auth['name'] ?? '', $auth['name'] ?? '',
        ]);

        $newId = (int)$pdo->lastInsertId();
        successResponse(['id' => $newId], '등록되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/popup/{id}  (수정)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === '') {
        requireAuth();
        $auth = requireAuth();
        $title      = trim($_POST['title']      ?? '');
        $url        = trim($_POST['url']        ?? '');
        $linkTarget = $_POST['link_target']     ?? '_self';
        $periodStart = $_POST['period_start']   ?? null;
        $periodEnd  = $_POST['period_end']      ?? null;
        $useYn      = $_POST['use_yn']          ?? 'N';
        $sortOrder  = (int)($_POST['sort_order'] ?? 1);
        $imgWidth   = (int)($_POST['img_width']  ?? 0);
        $imgHeight  = (int)($_POST['img_height'] ?? 0);
        $imgPosLeft = (int)($_POST['img_pos_left'] ?? 0);
        $imgPosTop  = (int)($_POST['img_pos_top']  ?? 0);

        if ($title === '') errorResponse('제목을 입력해주세요.');
        if (!in_array($linkTarget, ['_self', '_blank'], true)) $linkTarget = '_self';

        // 기존 파일 조회
        $stmt = $pdo->prepare("SELECT img_save_name, img_url FROM popup_banner WHERE id = ?");
        $stmt->execute([$id]);
        $old = $stmt->fetch();
        if (!$old) errorResponse('팝업을 찾을 수 없습니다.', 404);

        $imgSaveName = $old['img_save_name'];
        $imgUrl      = $old['img_url'];
        $imgOriName  = '';

        if (!empty($_FILES['img_file']['name'])) {
            // 기존 파일 삭제
            if ($old['img_save_name']) {
                deleteUploadedFile('popup', $old['img_save_name']);
            }
            $imgOriName  = $_FILES['img_file']['name'];
            $imgSaveName = uploadFile($_FILES['img_file'], 'popup');
            $imgUrl      = '/uploads/popup/' . $imgSaveName;
        }

        $pdo->prepare(
            "UPDATE popup_banner SET
                admin_title = ?, url = ?, link_target = ?,
                period_start = ?, period_end = ?,
                use_yn = ?, sort_order = ?,
                img_width = ?, img_height = ?, img_pos_left = ?, img_pos_top = ?,
                img_ori_name = ?, img_save_name = ?, img_url = ?,
                updated_by = ?, updated_at = NOW()
             WHERE id = ?"
        )->execute([
            $title, $url, $linkTarget,
            $periodStart ?: null, $periodEnd ?: null,
            $useYn, $sortOrder,
            $imgWidth, $imgHeight, $imgPosLeft, $imgPosTop,
            $imgOriName ?: $old['img_save_name'] ? basename($old['img_save_name']) : '',
            $imgSaveName, $imgUrl,
            $auth['name'] ?? '', $id,
        ]);

        successResponse(null, '수정되었습니다.');
    }

    errorResponse('잘못된 요청입니다.', 400);
}

/** 팝업 이미지 URL 절대경로 변환 */
function _popupUrls(array $row): array
{
    $baseUrl = rtrim((defined('UPLOAD_BASE_URL') ? UPLOAD_BASE_URL : '/uploads'), '/');
    if (!empty($row['img_url']) && strpos($row['img_url'], 'http') !== 0) {
        $row['img_url_full'] = $baseUrl . (strpos($row['img_url'], '/') === 0 ? $row['img_url'] : '/' . $row['img_url']);
    } else {
        $row['img_url_full'] = $row['img_url'] ?? '';
    }
    return $row;
}
