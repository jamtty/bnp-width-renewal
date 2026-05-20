<?php
/**
 * API 단일 진입점 (Front Controller 패턴)
 * 모든 /api/* 요청이 이 파일로 진입
 */
declare(strict_types=1);

// ── 에러 표시 설정 (운영: 0, 개발: 1) ────────────────────────
ini_set('display_errors', '0');
error_reporting(E_ALL);

// ── 업로드/메모리 한도 (PHP-FPM 환경에서 .htaccess php_value 미작동 시 대체) ──
// upload_max_filesize·post_max_size는 PHP_INI_PERDIR 이라 ini_set 불가,
// .user.ini 또는 .htaccess 에서 설정해야 함. memory_limit은 런타임 변경 가능.
@ini_set('memory_limit', '256M');

// ── Core 로드 ────────────────────────────────────────────────
require_once __DIR__ . '/core/Env.php';
require_once __DIR__ . '/core/Database.php';
require_once __DIR__ . '/core/Request.php';
require_once __DIR__ . '/core/Response.php';
require_once __DIR__ . '/core/Router.php';
require_once __DIR__ . '/core/FileUploader.php';

// ── .env 로드 (__DIR__ = backend/api → /../.env = backend/.env) ──
Env::load(__DIR__ . '/../.env');

// ── CORS 헤더 (.env 로드 후 CORS_ORIGIN 값 사용) ─────────────
$origin = Env::get('CORS_ORIGIN', '*');
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-HTTP-Method-Override');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── 클래스 로드 ──────────────────────────────────────────────
require_once __DIR__ . '/core/Token.php';
require_once __DIR__ . '/repositories/BaseRepository.php';
require_once __DIR__ . '/repositories/NewsRepository.php';
require_once __DIR__ . '/repositories/ReportRepository.php';
require_once __DIR__ . '/repositories/NoticeRepository.php';
require_once __DIR__ . '/repositories/MemberRepository.php';
require_once __DIR__ . '/repositories/BoardRepository.php';
require_once __DIR__ . '/services/NewsService.php';
require_once __DIR__ . '/services/ReportService.php';
require_once __DIR__ . '/services/NoticeService.php';
require_once __DIR__ . '/services/AuthService.php';
require_once __DIR__ . '/services/BoardService.php';
require_once __DIR__ . '/controllers/NewsController.php';
require_once __DIR__ . '/controllers/ReportController.php';
require_once __DIR__ . '/controllers/NoticeController.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/UploadController.php';
require_once __DIR__ . '/controllers/PressController.php';
require_once __DIR__ . '/controllers/RecruitController.php';
require_once __DIR__ . '/controllers/HealthInfoController.php';
require_once __DIR__ . '/controllers/MediTvController.php';
require_once __DIR__ . '/repositories/ConsultationRepository.php';
require_once __DIR__ . '/services/ConsultationService.php';
require_once __DIR__ . '/controllers/ConsultationController.php';
require_once __DIR__ . '/repositories/VoiceRepository.php';
require_once __DIR__ . '/services/VoiceService.php';
require_once __DIR__ . '/controllers/VoiceController.php';
require_once __DIR__ . '/repositories/FastReserveRepository.php';
require_once __DIR__ . '/services/FastReserveService.php';
require_once __DIR__ . '/controllers/FastReserveController.php';
require_once __DIR__ . '/repositories/PopupBannerRepository.php';
require_once __DIR__ . '/services/PopupBannerService.php';
require_once __DIR__ . '/controllers/PopupBannerController.php';
require_once __DIR__ . '/repositories/DoctorRepository.php';
require_once __DIR__ . '/services/DoctorService.php';
require_once __DIR__ . '/controllers/DoctorController.php';
require_once __DIR__ . '/repositories/MainBannerRepository.php';
require_once __DIR__ . '/services/MainBannerService.php';
require_once __DIR__ . '/controllers/MainBannerController.php';
require_once __DIR__ . '/controllers/OgImageController.php';
require_once __DIR__ . '/repositories/WellFileRepository.php';
require_once __DIR__ . '/services/WellFileService.php';
require_once __DIR__ . '/controllers/WellFileController.php';
require_once __DIR__ . '/repositories/CertDocRepository.php';
require_once __DIR__ . '/services/CertDocService.php';
require_once __DIR__ . '/controllers/CertDocController.php';

// ── 라우터 초기화 및 디스패치 ─────────────────────────────────
$router = new Router();
require_once __DIR__ . '/routes/api.php';

try {
    $router->dispatch();
} catch (PDOException $e) {
    error_log('[API] DB Error: ' . $e->getMessage());
    Response::serverError('서버 오류가 발생했습니다.');
} catch (Throwable $e) {
    error_log('[API] Error: ' . $e->getMessage());
    Response::serverError('서버 오류가 발생했습니다.');
}
