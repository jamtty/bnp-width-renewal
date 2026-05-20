<?php
/**
 * OG 이미지 프록시 Controller
 *
 * GET /og-image?url=<외부URL>
 * 외부 URL의 og:image 또는 twitter:image 메타태그 값을 반환합니다.
 * SSRF 방지를 위해 허용된 스킴(http/https)만 허용하고,
 * private/loopback IP로의 요청을 차단합니다.
 */
class OgImageController
{
    // 허용 스킴
    private const ALLOWED_SCHEMES = ['http', 'https'];

    // 차단할 IP 패턴 (private / loopback)
    private const BLOCKED_IP_PATTERNS = [
        '/^127\./',
        '/^10\./',
        '/^172\.(1[6-9]|2[0-9]|3[01])\./',
        '/^192\.168\./',
        '/^::1$/',
        '/^fc00:/i',
        '/^fd[0-9a-f]{2}:/i',
    ];

    public function fetch(Request $request): void
    {
        $url = trim($request->query['url'] ?? '');

        if ($url === '') {
            Response::error('url 파라미터가 필요합니다.');
        }

        // 스킴 검증
        $parsed = parse_url($url);
        $scheme = strtolower($parsed['scheme'] ?? '');
        if (!in_array($scheme, self::ALLOWED_SCHEMES, true)) {
            Response::error('허용되지 않는 URL 스킴입니다.', 400);
        }

        // 호스트 → IP 해석 후 private IP 차단 (SSRF 방지)
        $host = $parsed['host'] ?? '';
        if ($host === '') {
            Response::error('잘못된 URL입니다.', 400);
        }
        $ip = gethostbyname($host);
        foreach (self::BLOCKED_IP_PATTERNS as $pattern) {
            if (preg_match($pattern, $ip)) {
                Response::error('허용되지 않는 대상 주소입니다.', 403);
            }
        }

        // cURL로 HTML 가져오기
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS      => 3,
            CURLOPT_TIMEOUT        => 8,
            CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; MediInBot/1.0)',
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_HTTPHEADER     => ['Accept: text/html'],
            // HTML <head> 만 가져오면 충분하므로 크기 제한
            CURLOPT_RANGE          => '0-102400',
        ]);
        $html     = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($html === false || $httpCode < 200 || $httpCode >= 400) {
            Response::ok(['image_url' => null]);
        }

        // og:image 또는 twitter:image 추출
        $imageUrl = null;

        // og:image
        if (preg_match(
            '/<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i',
            $html,
            $m
        )) {
            $imageUrl = $m[1];
        } elseif (preg_match(
            '/<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\'][^>]*>/i',
            $html,
            $m
        )) {
            $imageUrl = $m[1];
        }

        // twitter:image fallback
        if ($imageUrl === null) {
            if (preg_match(
                '/<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i',
                $html,
                $m
            )) {
                $imageUrl = $m[1];
            } elseif (preg_match(
                '/<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']twitter:image["\'][^>]*>/i',
                $html,
                $m
            )) {
                $imageUrl = $m[1];
            }
        }

        // 상대 URL → 절대 URL 변환
        if ($imageUrl !== null && !preg_match('/^https?:\/\//i', $imageUrl)) {
            $base = $scheme . '://' . $host;
            $imageUrl = $base . '/' . ltrim($imageUrl, '/');
        }

        Response::ok(['image_url' => $imageUrl]);
    }
}
