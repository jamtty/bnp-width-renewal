<?php
/**
 * popup_banner 테이블 생성 + API 테스트
 * 브라우저에서 직접 접속: http://localhost:5173/backend/test_popup.php
 */
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';

header('Content-Type: text/plain; charset=utf-8');

try {
    $pdo = getDB();
    
    // 테이블 생성
    $sql = file_get_contents(__DIR__ . '/sql/popup_banner.sql');
    $pdo->exec($sql);
    echo "[OK] popup_banner 테이블 생성 완료\n\n";
    
    // API 직접 호출 테스트
    echo "--- GET /api/popup 테스트 ---\n";
    $stmt = $pdo->query("SELECT COUNT(*) FROM popup_banner");
    echo "등록된 팝업: " . $stmt->fetchColumn() . "건\n";
    
    // 테스트 데이터 삽입
    $pdo->exec("INSERT INTO popup_banner (admin_title, use_yn, sort_order, img_url, author, created_by) 
                VALUES ('테스트 팝업', 'Y', 1, '/uploads/popup/test.png', 'admin', 'admin')");
    echo "[OK] 테스트 데이터 삽입 완료\n";
    
    echo "\n=== API 라우트 확인 ===\n";
    require_once __DIR__ . '/routes/popup.php';
    echo "popup.php 로드 성공\n";
    echo "handlePopup 함수 존재: " . (function_exists('handlePopup') ? 'YES' : 'NO') . "\n";
    echo "_popupUrls 함수 존재: " . (function_exists('_popupUrls') ? 'YES' : 'NO') . "\n";
    
} catch (Exception $e) {
    echo "[ERROR] " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
