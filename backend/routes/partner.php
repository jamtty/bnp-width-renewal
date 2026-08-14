<?php
/**
 * 협력기관(파트너) 로고 관리 API
 *
 * GET    /api/partner           목록 조회 (관리자용: page, size, keyword, display_yn)
 * GET    /api/partner/active    활성 파트너 목록 (프론트 노출용: display_yn = Y)
 * GET    /api/partner/{id}      상세 조회
 * POST   /api/partner           등록
 * POST   /api/partner/{id}      수정
 * POST   /api/partner/{id}/display  노출 여부 변경
 * POST   /api/partner/{id}/delete   삭제
 */
function handlePartner(array $seg, string $method): void
{
    $pdo = getDB();
    $id  = isset($seg[1]) && is_numeric($seg[1]) ? (int)$seg[1] : null;
    $sub = $seg[2] ?? '';

    // ----------------------------------------------------------------
    // GET /api/partner/active  (프론트 노출용)
    // ----------------------------------------------------------------
    if ($method === 'GET' && ($seg[1] ?? '') === 'active') {
        $stmt = $pdo->prepare(
            "SELECT id, company_name, img_ori_name, img_save_name, img_url, sort_order
               FROM partner_tbl
              WHERE display_yn = 'Y'
              ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute();
        $items = $stmt->fetchAll();
        foreach ($items as &$row) {
            $row = _partnerUrl($row);
        }
        unset($row);
        successResponse($items);
    }

    // ----------------------------------------------------------------
    // GET /api/partner  (관리자 목록)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id === null) {
        $page    = max(1, (int)($_GET['page']     ?? 1));
        $size    = max(1, min(100, (int)($_GET['size'] ?? 10)));
        $keyword = trim($_GET['keyword'] ?? '');
        $displayYn = $_GET['display_yn'] ?? '';
        $offset  = ($page - 1) * $size;

        $where  = [];
        $params = [];
        if ($keyword !== '') {
            $where[]  = 'company_name LIKE ?';
            $params[] = '%' . $keyword . '%';
        }
        if (in_array($displayYn, ['Y', 'N'], true)) {
            $where[]  = 'display_yn = ?';
            $params[] = $displayYn;
        }
        $whereStr = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $cntStmt = $pdo->prepare("SELECT COUNT(*) FROM partner_tbl $whereStr");
        $cntStmt->execute($params);
        $total = (int)$cntStmt->fetchColumn();

        $listStmt = $pdo->prepare(
            "SELECT id, company_name, img_ori_name, img_save_name, img_url,
                    sort_order, display_yn, created_at, updated_at
               FROM partner_tbl $whereStr
              ORDER BY sort_order ASC, id ASC
              LIMIT ? OFFSET ?"
        );
        $listStmt->execute(array_merge($params, [$size, $offset]));
        $items = $listStmt->fetchAll();
        foreach ($items as &$row) {
            $row = _partnerUrl($row);
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
    // GET /api/partner/{id}  (상세)
    // ----------------------------------------------------------------
    if ($method === 'GET' && $id !== null) {
        $stmt = $pdo->prepare(
            "SELECT id, company_name, img_ori_name, img_save_name, img_url,
                    sort_order, display_yn, created_at, updated_at
               FROM partner_tbl WHERE id = ?"
        );
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('파트너 정보를 찾을 수 없습니다.', 404);
        successResponse(_partnerUrl($row));
    }

    // ----------------------------------------------------------------
    // POST /api/partner/{id}/display  (노출 여부)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'display') {
        requireAuth();
        $body  = json_decode(file_get_contents('php://input'), true) ?? [];
        $dy    = $body['display_yn'] ?? '';
        if (!in_array($dy, ['Y', 'N'], true)) errorResponse('display_yn 은 Y 또는 N 이어야 합니다.');
        $pdo->prepare("UPDATE partner_tbl SET display_yn = ?, updated_at = NOW() WHERE id = ?")->execute([$dy, $id]);
        successResponse(null, '변경되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/partner/{id}/delete  (삭제)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === 'delete') {
        requireAuth();
        $stmt = $pdo->prepare("SELECT img_save_name FROM partner_tbl WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) errorResponse('파트너 정보를 찾을 수 없습니다.', 404);
        if ($row['img_save_name']) {
            deleteUploadedFile('partner', $row['img_save_name']);
        }
        $pdo->prepare("DELETE FROM partner_tbl WHERE id = ?")->execute([$id]);
        successResponse(null, '삭제되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/partner  (등록)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id === null) {
        requireAuth();
        $auth        = requireAuth();
        $companyName = trim($_POST['company_name'] ?? '');
        $sortOrder   = (int)($_POST['sort_order']   ?? 1);
        $displayYn   = $_POST['display_yn']         ?? 'Y';

        if (!in_array($displayYn, ['Y', 'N'], true)) $displayYn = 'Y';

        $imgOriName  = '';
        $imgSaveName = '';
        $imgUrl      = '';

        if (!empty($_FILES['img_file']['name'])) {
            $up          = uploadFile($_FILES['img_file'], 'partner', ['jpg', 'jpeg', 'png']);
            $imgOriName  = $up['ori_name'];
            $imgSaveName = $up['save_name'];
            $imgUrl      = $up['file_url'];
        }

        $pdo->prepare(
            "INSERT INTO partner_tbl
                (company_name, img_ori_name, img_save_name, img_url, sort_order, display_yn)
             VALUES (?,?,?,?,?,?)"
        )->execute([$companyName, $imgOriName, $imgSaveName, $imgUrl, $sortOrder, $displayYn]);

        $newId = (int)$pdo->lastInsertId();
        successResponse(['id' => $newId], '등록되었습니다.');
    }

    // ----------------------------------------------------------------
    // POST /api/partner/{id}  (수정)
    // ----------------------------------------------------------------
    if ($method === 'POST' && $id !== null && $sub === '') {
        requireAuth();
        $auth        = requireAuth();
        $companyName = trim($_POST['company_name'] ?? '');
        $sortOrder   = (int)($_POST['sort_order']   ?? 1);
        $displayYn   = $_POST['display_yn']         ?? 'Y';

        if (!in_array($displayYn, ['Y', 'N'], true)) $displayYn = 'Y';

        $stmt = $pdo->prepare("SELECT img_save_name, img_url FROM partner_tbl WHERE id = ?");
        $stmt->execute([$id]);
        $old = $stmt->fetch();
        if (!$old) errorResponse('파트너 정보를 찾을 수 없습니다.', 404);

        $imgSaveName = $old['img_save_name'];
        $imgUrl      = $old['img_url'];
        $imgOriName  = '';

        if (!empty($_FILES['img_file']['name'])) {
            if ($old['img_save_name']) {
                deleteUploadedFile('partner', $old['img_save_name']);
            }
            $up          = uploadFile($_FILES['img_file'], 'partner', ['jpg', 'jpeg', 'png']);
            $imgOriName  = $up['ori_name'];
            $imgSaveName = $up['save_name'];
            $imgUrl      = $up['file_url'];
        }

        $pdo->prepare(
            "UPDATE partner_tbl
                SET company_name = ?,
                    img_ori_name = ?,
                    img_save_name = ?,
                    img_url = ?,
                    sort_order = ?,
                    display_yn = ?,
                    updated_at = NOW()
              WHERE id = ?"
        )->execute([
            $companyName,
            $imgOriName ?: ($old['img_save_name'] ? basename($old['img_save_name']) : ''),
            $imgSaveName,
            $imgUrl,
            $sortOrder,
            $displayYn,
            $id,
        ]);

        successResponse(null, '수정되었습니다.');
    }

    errorResponse('잘못된 요청입니다.', 400);
}

/** 파트너 이미지 전체 URL 보완 */
function _partnerUrl(array $row): array
{
    $row['img_url_full'] = $row['img_url'] ?? '';
    return $row;
}
