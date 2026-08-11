<?php
declare(strict_types=1);

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/helpers/jwt.php';
require_once __DIR__ . '/helpers/upload.php';

// 전역 예외 처리 - 500 에러 시 JSON으로 반환
set_exception_handler(function (Throwable $e) {
    http_response_code(500);
    // CORS 헤더 (예외 상황에서도 필요)
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $isLocalhost = (bool)preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin);
    if ($isLocalhost || in_array($origin, ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
    header('Access-Control-Allow-Credentials: true');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => '서버 오류: ' . $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
    exit;
});

/* ---------------------------------------------------------------
 * CORS
 * --------------------------------------------------------------- */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isLocalhost = (bool)preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin);
if ($isLocalhost || in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/* ---------------------------------------------------------------
 * 라우팅
 * --------------------------------------------------------------- */
$requestUri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath    = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$path        = '/' . ltrim(substr($requestUri, strlen($basePath)), '/');
$method      = strtoupper($_SERVER['REQUEST_METHOD']);

// /api/ prefix 제거
if (strpos($path, '/api/') === 0) {
    $path = substr($path, 4); // '/api' 제거 → '/main-banner/...'
}

$segments = array_values(array_filter(explode('/', $path)));

// ------------------------------------------------------------------
// 라우트 매칭
// ------------------------------------------------------------------

// [배너관리] ---------------------------------------------------------
if (($segments[0] ?? '') === 'main-banner') {
    require_once __DIR__ . '/routes/main_banner.php';
    handleMainBanner($segments, $method);
    exit;
}

// [공지사항] ---------------------------------------------------------
if (($segments[0] ?? '') === 'notice') {
    require_once __DIR__ . '/routes/notice.php';
    handleNotice($segments, $method);
    exit;
}

// [자료실] -----------------------------------------------------------
if (($segments[0] ?? '') === 'report') {
    require_once __DIR__ . '/routes/report.php';
    handleReport($segments, $method);
    exit;
}

// [이미지 업로드] ----------------------------------------------------
if (($segments[0] ?? '') === 'upload') {
    require_once __DIR__ . '/routes/upload.php';
    handleUpload($segments, $method);
    exit;
}

// [전문가 관리] ------------------------------------------------------
if (($segments[0] ?? '') === 'expert') {
    require_once __DIR__ . '/routes/expert.php';
    handleExpert($segments, $method);
    exit;
}

// [팝업 관리] --------------------------------------------------------
if (($segments[0] ?? '') === 'popup') {
    handlePopup($segments, $method);
    exit;
}

// [협력기관 관리] ----------------------------------------------------
if (($segments[0] ?? '') === 'partner') {
    require_once __DIR__ . '/routes/partner.php';
    handlePartner($segments, $method);
    exit;
}

// [인증] -------------------------------------------------------------
if (($segments[0] ?? '') === 'auth') {
    require_once __DIR__ . '/routes/auth.php';
    handleAuth($segments, $method);
    exit;
}

/* ================================================================
 * 팝업 관리 핸들러 (index.php 내부 통합)
 * ================================================================ */
function handlePopup(array $seg, string $method): void
{
    $pdo = getDB();
    if (($method === 'GET') && ($_GET['debug'] ?? '') === '1') {
        successResponse(['status' => 'ok', 'message' => 'popup route reached']);
    }
    $id  = isset($seg[1]) && is_numeric($seg[1]) ? (int)$seg[1] : null;
    $sub = $seg[2] ?? '';

    // GET /api/popup/active
    if ($method === 'GET' && ($seg[1] ?? '') === 'active') {
        $today = date('Y-m-d');
        $stmt = $pdo->prepare("SELECT id, admin_title AS title, url, link_target, img_pos_left, img_pos_top, img_ori_name, img_save_name, img_url, sort_order FROM popup_banner WHERE use_yn='Y' AND (period_start IS NULL OR period_start<=?) AND (period_end IS NULL OR period_end>=?) ORDER BY sort_order ASC, id ASC");
        $stmt->execute([$today, $today]);
        $items = $stmt->fetchAll();
        foreach ($items as &$r) { $r = _popupUrl($r); } unset($r);
        successResponse($items);
    }
    // GET /api/popup (목록)
    if ($method === 'GET' && $id === null) {
        $page = max(1, (int)($_GET['page']??1)); $size = max(1, min(100, (int)($_GET['size']??10)));
        $kw = trim($_GET['keyword']??''); $uy = $_GET['use_yn']??''; $off = ($page-1)*$size;
        $wh=[]; $ps=[];
        if ($kw!=='') { $wh[]='admin_title LIKE ?'; $ps[]='%'.$kw.'%'; }
        if (in_array($uy,['Y','N'],true)) { $wh[]='use_yn=?'; $ps[]=$uy; }
        $ws = $wh ? 'WHERE '.implode(' AND ',$wh) : '';
        $cnt = $pdo->prepare("SELECT COUNT(*) FROM popup_banner $ws"); $cnt->execute($ps); $total = (int)$cnt->fetchColumn();
        $lst = $pdo->prepare("SELECT id, admin_title AS title, url, link_target, period_start, period_end, use_yn, sort_order, img_ori_name, img_save_name, img_url, img_pos_left, img_pos_top, created_by, created_at, updated_at FROM popup_banner $ws ORDER BY use_yn DESC, sort_order ASC, id ASC LIMIT ? OFFSET ?");
        $lst->execute(array_merge($ps,[$size,$off]));
        $items = $lst->fetchAll();
        foreach ($items as &$r) { $r = _popupUrl($r); } unset($r);
        successResponse(['items'=>$items,'total'=>$total,'total_pages'=>(int)ceil($total/$size),'page'=>$page,'size'=>$size]);
    }
    // GET /api/popup/{id}
    if ($method === 'GET' && $id !== null) {
        $stmt = $pdo->prepare("SELECT id, admin_title AS title, url, link_target, period_start, period_end, use_yn, sort_order, img_ori_name, img_save_name, img_url, img_pos_left, img_pos_top, created_by, created_at, updated_at FROM popup_banner WHERE id=?");
        $stmt->execute([$id]); $row = $stmt->fetch();
        if (!$row) errorResponse('팝업을 찾을 수 없습니다.',404);
        successResponse(_popupUrl($row));
    }
    // POST /api/popup/{id}/display
    if ($method === 'POST' && $id !== null && $sub === 'display') {
        requireAuth(); $body = json_decode(file_get_contents('php://input'),true)??[];
        $uy = $body['use_yn']??''; if (!in_array($uy,['Y','N'],true)) errorResponse('use_yn 필요');
        $pdo->prepare("UPDATE popup_banner SET use_yn=?, updated_at=NOW() WHERE id=?")->execute([$uy,$id]);
        successResponse(null,'변경되었습니다.');
    }
    // POST /api/popup/{id}/delete
    if ($method === 'POST' && $id !== null && $sub === 'delete') {
        requireAuth();
        $s=$pdo->prepare("SELECT img_save_name FROM popup_banner WHERE id=?"); $s->execute([$id]); $r=$s->fetch();
        if (!$r) errorResponse('팝업을 찾을 수 없습니다.',404);
        if ($r['img_save_name']) deleteUploadedFile('popup',$r['img_save_name']);
        $pdo->prepare("DELETE FROM popup_banner WHERE id=?")->execute([$id]);
        successResponse(null,'삭제되었습니다.');
    }
    // POST /api/popup (등록)
    if ($method === 'POST' && $id === null) {
        $auth = requireAuth();
        $t=trim($_POST['title']??''); $u=trim($_POST['url']??''); $lt=$_POST['link_target']??'_self';
        $psd=$_POST['period_start']??null; $ped=$_POST['period_end']??null;
        $uy=$_POST['use_yn']??'N'; $so=(int)($_POST['sort_order']??1);
        $ipl=(int)($_POST['img_pos_left']??0); $ipt=(int)($_POST['img_pos_top']??0);
        if ($t==='') errorResponse('제목을 입력해주세요.');
        $ion=''; $isn=''; $iurl='';
        if (!empty($_FILES['img_file']['name'])) { $up=uploadFile($_FILES['img_file'],'popup'); $ion=$up['ori_name']; $isn=$up['save_name']; $iurl=$up['file_url']; }
        $pdo->prepare("INSERT INTO popup_banner (admin_title,url,link_target,period_start,period_end,use_yn,sort_order,img_pos_left,img_pos_top,img_ori_name,img_save_name,img_url,created_by,author) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
            ->execute([$t,$u,$lt,$psd?:null,$ped?:null,$uy,$so,$ipl,$ipt,$ion,$isn,$iurl,$auth['name']??'',$auth['name']??'']);
        successResponse(['id'=>(int)$pdo->lastInsertId()],'등록되었습니다.');
    }
    // POST /api/popup/{id} (수정)
    if ($method === 'POST' && $id !== null && $sub === '') {
        $auth = requireAuth();
        $t=trim($_POST['title']??''); $u=trim($_POST['url']??''); $lt=$_POST['link_target']??'_self';
        $psd=$_POST['period_start']??null; $ped=$_POST['period_end']??null;
        $uy=$_POST['use_yn']??'N'; $so=(int)($_POST['sort_order']??1);
        $ipl=(int)($_POST['img_pos_left']??0); $ipt=(int)($_POST['img_pos_top']??0);
        if ($t==='') errorResponse('제목을 입력해주세요.');
        $s=$pdo->prepare("SELECT img_save_name, img_url FROM popup_banner WHERE id=?"); $s->execute([$id]); $old=$s->fetch();
        if (!$old) errorResponse('팝업을 찾을 수 없습니다.',404);
        $isn=$old['img_save_name']; $iurl=$old['img_url']; $ion='';
        if (!empty($_FILES['img_file']['name'])) {
            if ($old['img_save_name']) deleteUploadedFile('popup',$old['img_save_name']);
            $up=uploadFile($_FILES['img_file'],'popup'); $ion=$up['ori_name']; $isn=$up['save_name']; $iurl=$up['file_url'];
        }
        $pdo->prepare("UPDATE popup_banner SET admin_title=?,url=?,link_target=?,period_start=?,period_end=?,use_yn=?,sort_order=?,img_pos_left=?,img_pos_top=?,img_ori_name=?,img_save_name=?,img_url=?,updated_by=?,updated_at=NOW() WHERE id=?")
            ->execute([$t,$u,$lt,$psd?:null,$ped?:null,$uy,$so,$ipl,$ipt,$ion?:($old['img_save_name']?basename($old['img_save_name']):''),$isn,$iurl,$auth['name']??'',$id]);
        successResponse(null,'수정되었습니다.');
    }
    errorResponse('잘못된 요청입니다.',400);
}
function _popupUrl(array $row): array {
    $row['img_url_full'] = $row['img_url'] ?? '';
    return $row;
}

errorResponse('요청한 API를 찾을 수 없습니다.', 404);
