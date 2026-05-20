<?php
/**
 * DB content 컬럼의 data:image base64 이미지를
 * uploads/editor/ 경로의 실제 파일로 저장하고
 * src 를 파일 URL 로 교체하는 마이그레이션 스크립트
 *
 * 실행 방법:
 *   php backend/migrate_base64_images.php
 * 또는 웹루트에서:
 *   php migrate_base64_images.php
 */
declare(strict_types=1);

// ── .env 로드 ────────────────────────────────────────────────
$envFile = __DIR__ . '/.env';
if (!file_exists($envFile)) {
    die("[ERROR] .env 파일을 찾을 수 없습니다: $envFile\n");
}
$env = [];
foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
    $line = trim($line);
    if ($line === '' || $line[0] === '#') continue;
    if (str_contains($line, '=')) {
        [$k, $v] = explode('=', $line, 2);
        $env[trim($k)] = trim($v);
    }
}

// ── DB 연결 ──────────────────────────────────────────────────
$host    = $env['DB_HOST']    ?? 'localhost';
$dbName  = $env['DB_NAME']    ?? '';
$user    = $env['DB_USER']    ?? '';
$pass    = $env['DB_PASS']    ?? '';
$charset = $env['DB_CHARSET'] ?? 'utf8mb4';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbName;charset=$charset",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die("[ERROR] DB 연결 실패: " . $e->getMessage() . "\n");
}

// ── 업로드 경로 설정 ─────────────────────────────────────────
// 이 스크립트는 backend/ 에 있으므로 uploads/ 는 한 단계 위
$uploadDir = __DIR__ . '/../uploads/editor/';
$uploadUrl = '/uploads/editor/';

if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        die("[ERROR] 디렉터리 생성 실패: $uploadDir\n");
    }
}

// ── 처리할 테이블 목록 (테이블명 => PK 컬럼명) ──────────────
$tables = [
    'news'   => 'id',
    'notice' => 'id',
    'report' => 'id',
];

// ── base64 이미지 추출·저장·교체 함수 ───────────────────────
/**
 * HTML content 내의 모든 data:image base64 src를
 * 파일로 저장하고 URL로 교체한 새 content를 반환.
 *
 * @return array{content:string, count:int}
 */
function replaceBase64Images(string $content, string $uploadDir, string $uploadUrl): array
{
    $count = 0;

    // src="data:image/TYPE;base64,DATA" 또는 src='...' 양쪽 대응
    $pattern = '/src=["\']data:image\/(png|jpeg|jpg|gif|webp);base64,([A-Za-z0-9+\/=\r\n]+)["\']/i';

    $content = preg_replace_callback(
        $pattern,
        function (array $m) use ($uploadDir, $uploadUrl, &$count): string {
            $ext      = strtolower($m[1] === 'jpeg' ? 'jpg' : $m[1]);
            $b64Data  = preg_replace('/\s+/', '', $m[2]); // 개행 제거
            $binData  = base64_decode($b64Data, true);

            if ($binData === false || strlen($binData) === 0) {
                echo "  [SKIP] base64 디코드 실패 또는 빈 데이터\n";
                return $m[0]; // 원본 유지
            }

            $saveName = bin2hex(random_bytes(16)) . '.' . $ext;
            $savePath = $uploadDir . $saveName;

            if (file_put_contents($savePath, $binData) === false) {
                echo "  [SKIP] 파일 저장 실패: $savePath\n";
                return $m[0]; // 원본 유지
            }

            $count++;
            $url = rtrim($uploadUrl, '/') . '/' . $saveName;
            echo "  [SAVED] $saveName (" . number_format(strlen($binData)) . " bytes)\n";
            return 'src="' . $url . '"';
        },
        $content
    ) ?? $content;

    return ['content' => $content, 'count' => $count];
}

// ── 메인 처리 루프 ───────────────────────────────────────────
$totalSaved   = 0;
$totalUpdated = 0;

foreach ($tables as $table => $pk) {
    echo "\n=== 테이블: $table ===\n";

    // is_deleted 컬럼이 있는 테이블은 삭제된 것도 포함 (데이터 정리 목적)
    $rows = $pdo->query("SELECT `$pk`, `content` FROM `$table`")->fetchAll(PDO::FETCH_ASSOC);

    foreach ($rows as $row) {
        $id      = $row[$pk];
        $content = (string)($row['content'] ?? '');

        if (!str_contains($content, 'data:image')) continue;

        echo "  [ROW $id] base64 이미지 발견, 처리 중...\n";

        ['content' => $newContent, 'count' => $saved] = replaceBase64Images(
            $content,
            $uploadDir,
            $uploadUrl
        );

        if ($saved === 0) continue;

        $stmt = $pdo->prepare("UPDATE `$table` SET `content` = ? WHERE `$pk` = ?");
        $stmt->execute([$newContent, $id]);

        $totalSaved   += $saved;
        $totalUpdated += 1;
        echo "  [ROW $id] $saved 개 이미지 파일 저장 완료, DB 업데이트 완료\n";
    }
}

echo "\n========================================\n";
echo "완료: 총 {$totalUpdated}개 행 업데이트, {$totalSaved}개 이미지 파일 저장\n";
echo "저장 경로: $uploadDir\n";
echo "========================================\n";
