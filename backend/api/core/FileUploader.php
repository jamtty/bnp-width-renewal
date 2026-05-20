<?php
/**
 * 파일 업로드 헬퍼
 * 업로드 디렉터리: {웹루트}/uploads/{subDir}/
 */
class FileUploader
{
    private const MAX_SIZE = 20 * 1024 * 1024; // 20MB

    /**
     * $_FILES[$fieldName] 에서 업로드된 파일들을 처리하고
     * 저장된 파일 정보 배열을 반환
     *
     * @param string $fieldName  HTML input name (예: 'files[]')
     * @param string $subDir     하위 디렉터리 (예: 'news', 'report', 'notice')
     * @param int    $maxSize    파일당 최대 허용 바이트 (0 = 기본 20MB)
     * @return array<int, array{ori_name:string, save_name:string, file_path:string, file_size:int, file_ext:string}>
     */
    public static function process(string $fieldName, string $subDir, int $maxSize = 0): array
    {
        $limit = $maxSize > 0 ? $maxSize : self::MAX_SIZE;

        // 파일이 없으면 빈 배열 반환
        $key = str_replace('[]', '', $fieldName); // files[] → files
        if (empty($_FILES[$key])) return [];

        // 업로드 디렉터리 결정 (backend/api/core 에서 3단계 위 = 웹루트)
        $uploadBase = Env::get('UPLOAD_PATH', dirname(dirname(dirname(__DIR__))) . '/uploads/');
        $uploadDir  = rtrim($uploadBase, '/') . '/' . $subDir . '/';
        if (!is_dir($uploadDir)) {
            @mkdir($uploadDir, 0755, true);
        }

        $files  = $_FILES[$key];
        $result = [];

        // 단일/다중 파일 공통 처리
        $names    = (array)$files['name'];
        $tmpNames = (array)$files['tmp_name'];
        $errors   = (array)$files['error'];
        $sizes    = (array)$files['size'];

        foreach ($names as $i => $oriName) {
            $displayName = basename((string)$oriName);

            // PHP 업로드 에러 코드별 사용자 메시지로 변환
            if ($errors[$i] !== UPLOAD_ERR_OK) {
                $msg = match ((int)$errors[$i]) {
                    UPLOAD_ERR_INI_SIZE,
                    UPLOAD_ERR_FORM_SIZE => '"' . $displayName . '" 파일이 업로드 허용 용량을 초과합니다.',
                    UPLOAD_ERR_PARTIAL   => '"' . $displayName . '" 파일이 완전히 업로드되지 않았습니다.',
                    UPLOAD_ERR_NO_FILE   => null, // 파일 없음은 정상적으로 건너뜀
                    default              => '"' . $displayName . '" 파일 업로드에 실패했습니다. (code: ' . $errors[$i] . ')',
                };
                if ($msg !== null) throw new RuntimeException($msg);
                continue;
            }

            if ((int)$sizes[$i] > $limit) {
                $maxMb = round($limit / 1024 / 1024);
                throw new RuntimeException('"' . $displayName . '" 파일이 너무 큽니다. (최대 ' . $maxMb . 'MB)');
            }

            if (!is_uploaded_file($tmpNames[$i])) continue;

            $ext      = strtolower(pathinfo($oriName, PATHINFO_EXTENSION));
            $saveName = bin2hex(random_bytes(16)) . ($ext !== '' ? '.' . $ext : '');
            $savePath = $uploadDir . $saveName;

            if (!move_uploaded_file($tmpNames[$i], $savePath)) {
                throw new RuntimeException('"' . $displayName . '" 파일 저장에 실패했습니다.');
            }

            $result[] = [
                'ori_name'  => $oriName,
                'save_name' => $saveName,
                'file_path' => $savePath,
                'file_size' => (int)$sizes[$i],
                'file_ext'  => $ext,
            ];
        }

        return $result;
    }

    /**
     * 에디터 이미지 단건 업로드
     * 원본을 저장하지 않고 최적화(리사이즈+압축)된 단일 파일만 저장.
     * - 폭이 1920px 초과 시 비율 유지 축소
     * - JPEG/WebP 고품질 재인코딩으로 불필요한 메타데이터 제거
     * - 파일 1개만 존재 → 서버 용량 절약
     *
     * @param array  $file    $_FILES['image'] 구조의 배열
     * @param string $subDir  uploads/ 하위 디렉터리 (예: 'editor')
     * @return array{ori_name:string,save_name:string,file_path:string,url:string}|false
     */
    public static function processEditorImage(array $file, string $subDir): array|false
    {
        if ($file['error'] !== UPLOAD_ERR_OK) return false;
        if (!is_uploaded_file($file['tmp_name'])) return false;

        $uploadBase = Env::get('UPLOAD_PATH', dirname(dirname(dirname(__DIR__))) . '/uploads/');
        $uploadUrl  = Env::get('UPLOAD_URL_EDITOR', '/uploads/editor/');
        $uploadDir  = rtrim($uploadBase, '/') . '/' . $subDir . '/';

        if (!is_dir($uploadDir)) {
            @mkdir($uploadDir, 0755, true);
        }

        $ext      = strtolower(pathinfo((string)$file['name'], PATHINFO_EXTENSION));
        $saveName = bin2hex(random_bytes(16)) . ($ext !== '' ? '.' . $ext : '');
        $savePath = $uploadDir . $saveName;

        if (!move_uploaded_file($file['tmp_name'], $savePath)) return false;

        // 인플레이스 최적화: 원본을 덮어써서 단일 최적화 파일만 보존
        self::optimizeInPlace($savePath, $ext);

        return [
            'ori_name'  => (string)$file['name'],
            'save_name' => $saveName,
            'file_path' => $savePath,
            'url'       => rtrim($uploadUrl, '/') . '/' . $saveName,
        ];
    }

    /**
     * 이미지 인플레이스 최적화 (PHP GD)
     * 에디터 업로드 전용. 원본 파일을 리사이즈·압축된 버전으로 덮어씀.
     * - 폭이 $maxWidth 초과 시 비율 유지 리사이즈
     * - 항상 재인코딩하여 불필요한 EXIF·메타데이터 제거 및 압축 적용
     * - 별도 파일을 생성하지 않으므로 저장소 낭비 없음
     *
     * @param string $filePath  최적화할 파일 절대 경로 (덮어씀)
     * @param string $ext       소문자 확장자
     * @param int    $maxWidth  최대 허용 폭 (기본 1920)
     */
    private static function optimizeInPlace(
        string $filePath,
        string $ext,
        int $maxWidth = 1920
    ): void {
        if (!function_exists('imagecreatefromjpeg')) return; // GD 미설치

        $imgExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!in_array($ext, $imgExts, true)) return;

        $src = match ($ext) {
            'jpg', 'jpeg' => @imagecreatefromjpeg($filePath),
            'png'         => @imagecreatefrompng($filePath),
            'gif'         => @imagecreatefromgif($filePath),
            'webp'        => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($filePath) : false,
            default       => false,
        };
        if (!$src) return;

        $w = imagesx($src);
        $h = imagesy($src);

        if ($w > $maxWidth) {
            // 폭 초과 → 비율 유지 축소
            $newW = $maxWidth;
            $newH = (int) round($h * $maxWidth / $w);
            $dst  = imagecreatetruecolor($newW, $newH);

            if (in_array($ext, ['png', 'webp'], true)) {
                imagealphablending($dst, false);
                imagesavealpha($dst, true);
            }

            imagecopyresampled($dst, $src, 0, 0, 0, 0, $newW, $newH, $w, $h);
            imagedestroy($src);
        } else {
            // 크기는 유지, 재인코딩(압축·메타데이터 제거)만 수행
            $dst = $src;
        }

        // 원본 경로에 재저장 (품질 압축 적용)
        match ($ext) {
            'jpg', 'jpeg' => imagejpeg($dst, $filePath, 82),
            'png'         => imagepng($dst, $filePath, 7),
            'gif'         => imagegif($dst, $filePath),
            'webp'        => function_exists('imagewebp') ? imagewebp($dst, $filePath, 80) : null,
            default       => null,
        };

        imagedestroy($dst);
    }

    /**
     * 첨부파일 썸네일 생성 (PHP GD) — 첨부파일 전용
     * 원본은 다운로드용으로 보존, 미리보기용 thumb_ 파일을 별도 생성.
     * 원본 폭이 $maxWidth 이하이면 생성하지 않음.
     * 결과물: {uploadDir}/thumb_{saveName}
     *
     * @param string $srcPath    원본 파일 절대 경로
     * @param string $uploadDir  저장 디렉터리 (end-slash 포함)
     * @param string $saveName   저장 파일명
     * @param string $ext        소문자 확장자
     * @param int    $maxWidth   최대 폭 (기본 800)
     */
    public static function generateThumbnail(
        string $srcPath,
        string $uploadDir,
        string $saveName,
        string $ext,
        int $maxWidth = 800
    ): void {
        if (!function_exists('imagecreatefromjpeg')) return; // GD 미설치

        $imgExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!in_array($ext, $imgExts, true)) return;

        $src = match ($ext) {
            'jpg', 'jpeg' => @imagecreatefromjpeg($srcPath),
            'png'         => @imagecreatefrompng($srcPath),
            'gif'         => @imagecreatefromgif($srcPath),
            'webp'        => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($srcPath) : false,
            default       => false,
        };
        if (!$src) return;

        $w = imagesx($src);
        $h = imagesy($src);

        if ($w <= $maxWidth) {
            imagedestroy($src);
            return; // 원본이 이미 충분히 작음
        }

        $newW = $maxWidth;
        $newH = (int) round($h * $maxWidth / $w);
        $dst  = imagecreatetruecolor($newW, $newH);

        if ($ext === 'png') {
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
        }

        imagecopyresampled($dst, $src, 0, 0, 0, 0, $newW, $newH, $w, $h);

        $thumbPath = $uploadDir . 'thumb_' . $saveName;

        match ($ext) {
            'jpg', 'jpeg' => imagejpeg($dst, $thumbPath, 85),
            'png'         => imagepng($dst, $thumbPath, 7),
            'gif'         => imagegif($dst, $thumbPath),
            'webp'        => function_exists('imagewebp') ? imagewebp($dst, $thumbPath, 85) : false,
            default       => false,
        };

        imagedestroy($src);
        imagedestroy($dst);
    }

    /**
     * 저장된 파일 삭제 (파일이 없어도 오류 없음)
     * 썸네일 파일이 있으면 함께 삭제
     */
    public static function delete(string $filePath): void
    {
        if ($filePath === '') return;

        if (file_exists($filePath)) {
            @unlink($filePath);
        }

        // 썸네일 삭제 (thumb_ 접두어)
        $dir   = dirname($filePath);
        $base  = basename($filePath);
        $thumb = $dir . DIRECTORY_SEPARATOR . 'thumb_' . $base;
        if (file_exists($thumb)) {
            @unlink($thumb);
        }
    }
}
