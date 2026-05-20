<?php
/**
 * HTTP 요청 헬퍼
 */
class Request
{
    public string $method;
    public string $uri;
    public array  $query;
    public array  $body;

    public function __construct()
    {
        $this->method = strtoupper($_SERVER['REQUEST_METHOD']);
        $this->uri    = strtok($_SERVER['REQUEST_URI'], '?');
        $this->query  = $_GET;

        // Content-Type에 따라 body 파싱
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        if (str_contains($contentType, 'multipart/form-data') ||
            str_contains($contentType, 'application/x-www-form-urlencoded')) {
            $this->body = $_POST;
        } else {
            // application/json 또는 기타
            $raw = file_get_contents('php://input');
            $this->body = ($raw !== '' && $raw !== false)
                ? (json_decode($raw, true) ?? [])
                : [];
        }

        // HTTP Method Override (공유호스팅에서 PUT/DELETE → POST 터널링 대응)
        $override = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] ?? '';
        if ($override !== '' && $this->method === 'POST') {
            $this->method = strtoupper($override);
        }
    }

    public function query(string $key, mixed $default = null): mixed
    {
        return $this->query[$key] ?? $default;
    }

    public function input(string $key, mixed $default = null): mixed
    {
        return $this->body[$key] ?? $default;
    }

    /**
     * int 변환 + 최솟값 보정
     */
    public function queryInt(string $key, int $default = 0, int $min = 0): int
    {
        return max($min, (int)($this->query[$key] ?? $default));
    }
}
