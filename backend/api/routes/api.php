<?php
/**
 * 라우트 정의
 * POST /api/auth/login    → AuthController::login
 * GET  /api/auth/me       → AuthController::me
 * GET /api/news           → NewsController::index
 * GET /api/news/{id}      → NewsController::show
 * GET /api/report         → ReportController::index
 * GET /api/report/{id}    → ReportController::show
 * GET /api/notice         → NoticeController::index
 * GET /api/notice/{id}    → NoticeController::show
 */

$router->post('/upload/image',   [UploadController::class, 'uploadImage']);

$router->post('/auth/login',     [AuthController::class,   'login']);
$router->get('/auth/me',         [AuthController::class,   'me']);
$router->patch('/auth/password', [AuthController::class,   'changePassword']);

$router->get('/news',                [NewsController::class,   'index']);
$router->post('/news',               [NewsController::class,   'store']);
$router->get('/news/{id}',           [NewsController::class,   'show']);
$router->post('/news/{id}',                     [NewsController::class,   'update']);
$router->post('/news/{id}/delete',              [NewsController::class,   'destroy']);
$router->post('/news/file/{fileId}/delete',     [NewsController::class,   'destroyFile']);

$router->get('/report',                         [ReportController::class, 'index']);
$router->post('/report',                        [ReportController::class, 'store']);
$router->get('/report/{id}',                    [ReportController::class, 'show']);
$router->post('/report/{id}',                   [ReportController::class, 'update']);
$router->post('/report/{id}/delete',            [ReportController::class, 'destroy']);
$router->post('/report/file/{fileId}/delete',   [ReportController::class, 'destroyFile']);

$router->get('/notice',                         [NoticeController::class, 'index']);
$router->post('/notice',                        [NoticeController::class, 'store']);
$router->get('/notice/{id}',                    [NoticeController::class, 'show']);
$router->post('/notice/{id}',                   [NoticeController::class, 'update']);
$router->post('/notice/{id}/delete',            [NoticeController::class, 'destroy']);
$router->post('/notice/file/{fileId}/delete',   [NoticeController::class, 'destroyFile']);
$router->post('/notice/{id}/pin',               [NoticeController::class, 'togglePin']);

// OG 이미지 프록시
$router->get('/og-image',           [OgImageController::class, 'fetch']);

// 보도자료 (BMT_IDX = 2)
$router->get('/press',              [PressController::class, 'index']);
$router->post('/press',             [PressController::class, 'store']);
$router->get('/press/{id}',         [PressController::class, 'show']);
$router->put('/press/{id}',         [PressController::class, 'update']);
$router->delete('/press/{id}',      [PressController::class, 'destroy']);
$router->post('/press/{id}/pin',    [PressController::class, 'togglePin']);

// 채용정보 (BMT_IDX = 5)
$router->get('/recruit',            [RecruitController::class, 'index']);
$router->post('/recruit',           [RecruitController::class, 'store']);
$router->get('/recruit/{id}',       [RecruitController::class, 'show']);
$router->put('/recruit/{id}',       [RecruitController::class, 'update']);
$router->delete('/recruit/{id}',    [RecruitController::class, 'destroy']);
$router->post('/recruit/{id}/pin',  [RecruitController::class, 'togglePin']);

// 건강정보 (BMT_IDX = 6)
$router->get('/health-info',           [HealthInfoController::class, 'index']);
$router->post('/health-info',          [HealthInfoController::class, 'store']);
$router->get('/health-info/{id}',      [HealthInfoController::class, 'show']);
$router->put('/health-info/{id}',      [HealthInfoController::class, 'update']);
$router->delete('/health-info/{id}',   [HealthInfoController::class, 'destroy']);
$router->post('/health-info/{id}/pin', [HealthInfoController::class, 'togglePin']);

// 메디TV (BMT_IDX = 8)
$router->get('/medi-tv',            [MediTvController::class, 'index']);
$router->post('/medi-tv',           [MediTvController::class, 'store']);
$router->get('/medi-tv/{id}',       [MediTvController::class, 'show']);
$router->put('/medi-tv/{id}',       [MediTvController::class, 'update']);
$router->delete('/medi-tv/{id}',    [MediTvController::class, 'destroy']);
$router->post('/medi-tv/{id}/pin',  [MediTvController::class, 'togglePin']);

// 건강상담
$router->get('/consultation',                             [ConsultationController::class, 'index']);
$router->post('/consultation',                            [ConsultationController::class, 'store']);
$router->get('/consultation/{id}',                        [ConsultationController::class, 'show']);
$router->post('/consultation/{id}/verify',                [ConsultationController::class, 'verifyPassword']);
$router->post('/consultation/{id}/delete',                [ConsultationController::class, 'destroy']);
$router->post('/consultation/{id}/reply',                 [ConsultationController::class, 'reply']);
$router->post('/consultation/file/{fileId}/delete',       [ConsultationController::class, 'destroyFile']);

// 고객의소리
$router->get('/voice',                             [VoiceController::class, 'index']);
$router->post('/voice',                            [VoiceController::class, 'store']);
$router->post('/voice/my-list',                    [VoiceController::class, 'myList']);
$router->get('/voice/{id}',                        [VoiceController::class, 'show']);
$router->post('/voice/{id}/update',                [VoiceController::class, 'update']);
$router->post('/voice/{id}/user-delete',           [VoiceController::class, 'userDelete']);
$router->post('/voice/{id}/delete',                [VoiceController::class, 'destroy']);
$router->post('/voice/{id}/reply',                 [VoiceController::class, 'reply']);
$router->post('/voice/file/{fileId}/delete',       [VoiceController::class, 'destroyFile']);

// 빠른예약
$router->get('/fast-reserve',                        [FastReserveController::class, 'index']);
$router->post('/fast-reserve',                       [FastReserveController::class, 'store']);
$router->get('/fast-reserve/{id}',                   [FastReserveController::class, 'show']);
$router->post('/fast-reserve/{id}/succ',             [FastReserveController::class, 'updateSucc']);
$router->post('/fast-reserve/{id}/delete',           [FastReserveController::class, 'destroy']);

// 팝업 배너
$router->get('/popup-banner',                        [PopupBannerController::class, 'index']);
$router->post('/popup-banner',                       [PopupBannerController::class, 'store']);
$router->get('/popup-banner/{id}',                   [PopupBannerController::class, 'show']);
$router->post('/popup-banner/{id}',                  [PopupBannerController::class, 'update']);
$router->post('/popup-banner/{id}/use',              [PopupBannerController::class, 'updateUseYn']);
$router->post('/popup-banner/{id}/sort',             [PopupBannerController::class, 'updateSortOrder']);
$router->post('/popup-banner/{id}/delete',           [PopupBannerController::class, 'destroy']);

// 의료진
$router->get('/doctor',                              [DoctorController::class, 'index']);
$router->post('/doctor',                             [DoctorController::class, 'store']);
$router->get('/doctor/by-dept/{code}',               [DoctorController::class, 'byDept']);
$router->get('/doctor/{id}',                         [DoctorController::class, 'show']);
$router->post('/doctor/{id}',                        [DoctorController::class, 'update']);
$router->post('/doctor/{id}/use',                    [DoctorController::class, 'updateUseYn']);
$router->post('/doctor/{id}/sort',                   [DoctorController::class, 'updateSortOrder']);

// 구비서류
$router->get('/cert-doc',                 [CertDocController::class, 'listPublic']);
$router->get('/cert-doc/admin',           [CertDocController::class, 'index']);
$router->post('/cert-doc',                [CertDocController::class, 'store']);
$router->get('/cert-doc/{id}',            [CertDocController::class, 'show']);
$router->post('/cert-doc/{id}',           [CertDocController::class, 'update']);
$router->post('/cert-doc/{id}/delete',    [CertDocController::class, 'destroy']);
$router->post('/cert-doc/{id}/clear',     [CertDocController::class, 'clearFile']);
$router->post('/doctor/{id}/delete',                 [DoctorController::class, 'destroy']);

// 건강증진센터 파일 관리
$router->get('/well-file',                    [WellFileController::class, 'index']);
$router->get('/well-file/by-key/{key}',       [WellFileController::class, 'byKey']);
$router->get('/well-file/{id}',               [WellFileController::class, 'show']);
$router->post('/well-file/{id}',              [WellFileController::class, 'update']);
$router->post('/well-file/{id}/clear',        [WellFileController::class, 'clearFile']);

// 메인 배너
$router->get('/main-banner',                         [MainBannerController::class, 'index']);
$router->get('/main-banner/active',                  [MainBannerController::class, 'active']);
$router->post('/main-banner',                        [MainBannerController::class, 'store']);
$router->get('/main-banner/{id}',                    [MainBannerController::class, 'show']);
$router->post('/main-banner/{id}',                   [MainBannerController::class, 'update']);
$router->post('/main-banner/{id}/use',               [MainBannerController::class, 'updateUseYn']);
$router->post('/main-banner/{id}/sort',              [MainBannerController::class, 'updateSortOrder']);
$router->post('/main-banner/{id}/delete',            [MainBannerController::class, 'destroy']);
