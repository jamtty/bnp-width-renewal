<?php
/**
 * .env 파일 파서
 * composer 없이 동작하는 경량 구현
 */
class Env
{
    private static bool $loaded = false;

    public static function load(string $path): void
    {
        if (self::$loaded || !file_exists($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($lines as $line) {
            $line = trim($line);

            // 주석 제외
            if (str_starts_with($line, '#') || $line === '') {
                continue;
            }

            [$key, $value] = array_map('trim', explode('=', $line, 2));

            // 따옴표 제거
            $value = trim($value, '"\'');

            if (!array_key_exists($key, $_ENV)) {
                $_ENV[$key] = $value;
                putenv("$key=$value");
            }
        }

        self::$loaded = true;
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        return $_ENV[$key] ?? getenv($key) ?: $default;
    }
}
