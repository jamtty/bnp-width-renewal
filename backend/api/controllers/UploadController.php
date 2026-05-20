<?php
/**
 * 이미지 업로드 Controller (에디터 전용)
 * POST /api/upload/image
 */
class UploadController
{
    private const IMAGE_EXTS     = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    private const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20 MB

    /**
     * 에디터 이미지 업로드
     * POST /api/upload/image
     * multipart/form-data field: image
     */
    public function uploadImage(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) { Response::error('인증이 필요합니다.', 401); }

        if (empty($_FILES['image']) || ($_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
            Response::error('이미지 파일이 없습니다.');
        }

        $file = $_FILES['image'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            Response::error('파일 업로드에 실패했습니다. (code: ' . $file['error'] . ')');
        }

        $ext = strtolower(pathinfo((string)$file['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, self::IMAGE_EXTS, true)) {
            Response::error('이미지 파일(jpg, png, gif, webp)만 업로드할 수 있습니다.');
        }

        if ((int)$file['size'] > self::MAX_IMAGE_SIZE) {
            Response::error('파일 크기가 너무 큽니다. (최대 20 MB)');
        }

        $result = FileUploader::processEditorImage($file, 'editor');
        if ($result === false) {
            Response::error('이미지 저장에 실패했습니다.');
        }

        Response::ok(['url' => $result['url']]);
    }
}
