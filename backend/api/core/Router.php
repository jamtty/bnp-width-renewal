<?php
/**
 * 경량 HTTP 라우터
 *
 * 사용 예:
 *   $router->get('/news',      [NewsController::class, 'index']);
 *   $router->get('/news/{id}', [NewsController::class, 'show']);
 */
class Router
{
    private array $routes = [];

    public function get(string $pattern, array $handler): void
    {
        $this->routes[] = ['GET', $pattern, $handler];
    }

    public function post(string $pattern, array $handler): void
    {
        $this->routes[] = ['POST', $pattern, $handler];
    }

    public function put(string $pattern, array $handler): void
    {
        $this->routes[] = ['PUT', $pattern, $handler];
    }

    public function patch(string $pattern, array $handler): void
    {
        $this->routes[] = ['PATCH', $pattern, $handler];
    }

    public function delete(string $pattern, array $handler): void
    {
        $this->routes[] = ['DELETE', $pattern, $handler];
    }

    public function dispatch(): void
    {
        $request = new Request();
        $method  = $request->method;

        // SCRIPT_NAME 기반으로 base 경로 동적 추출
        // 예: /backend/api/index.php → base = /backend/api
        $base = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
        $uri  = ($base !== '' && str_starts_with($request->uri, $base))
            ? substr($request->uri, strlen($base))
            : $request->uri;
        $uri  = $uri ?: '/';

        // CORS preflight 처리
        if ($method === 'OPTIONS') {
            http_response_code(204);
            exit;
        }

        foreach ($this->routes as [$routeMethod, $pattern, $handler]) {
            if ($routeMethod !== $method) {
                continue;
            }

            // {param} → 정규식 변환
            $regex = '#^' . preg_replace('#\{(\w+)\}#', '(?P<$1>[^/]+)', $pattern) . '$#';

            if (preg_match($regex, $uri, $matches)) {
                // 파라미터만 추출
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);

                [$class, $action] = $handler;
                (new $class())->$action($request, $params);
                return;
            }
        }

        Response::error('요청하신 경로를 찾을 수 없습니다.', 404);
    }
}
