<?php
/**
 * HTTP 응답 헬퍼
 */
class Response
{
    public static function json(
        bool   $success,
        mixed  $data    = null,
        string $message = '',
        int    $status  = 200
    ): never {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');

        echo json_encode(
            ['success' => $success, 'message' => $message, 'data' => $data],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        exit;
    }

    public static function ok(mixed $data, string $message = '성공'): never
    {
        self::json(true, $data, $message, 200);
    }

    public static function error(string $message, int $status = 400): never
    {
        self::json(false, null, $message, $status);
    }

    public static function notFound(string $message = '존재하지 않습니다.'): never
    {
        self::error($message, 404);
    }

    public static function serverError(string $message = '서버 오류가 발생했습니다.'): never
    {
        self::error($message, 500);
    }
}
