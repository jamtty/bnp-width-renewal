<?php

class AuthController
{
    private AuthService $service;

    public function __construct()
    {
        $this->service = new AuthService();
    }

    /**
     * POST /auth/login
     * body: { login_id, password }
     */
    public function login(Request $request): void
    {
        $loginId  = trim((string)$request->input('login_id', ''));
        $password = (string)$request->input('password', '');

        if ($loginId === '' || $password === '') {
            Response::error('아이디와 비밀번호를 입력해주세요.', 400);
            return;
        }

        try {
            $result = $this->service->login($loginId, $password);
            Response::ok($result, '로그인 성공');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage(), 401);
        }
    }

    /**
     * GET /auth/me  — 토큰 유효성 검증
     */
    public function me(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) {
            Response::error('인증이 필요합니다.', 401);
            return;
        }
        Response::ok([
            'id'   => $payload['sub'] ?? null,
            'name' => $payload['name'] ?? null,
            'role' => $payload['role'] ?? null,
        ]);
    }

    /**
     * PATCH /auth/password
     * body: { current_password, new_password, new_password_confirm }
     */
    public function changePassword(Request $request): void
    {
        $payload = Token::fromRequest();
        if (!$payload) {
            Response::error('인증이 필요합니다.', 401);
            return;
        }

        $currentPw  = (string)$request->input('current_password', '');
        $newPw      = (string)$request->input('new_password', '');
        $confirmPw  = (string)$request->input('new_password_confirm', '');

        if ($currentPw === '' || $newPw === '' || $confirmPw === '') {
            Response::error('모든 항목을 입력해주세요.', 400);
            return;
        }
        if ($newPw !== $confirmPw) {
            Response::error('새 비밀번호가 일치하지 않습니다.', 400);
            return;
        }

        try {
            $this->service->changePassword((int)$payload['sub'], $currentPw, $newPw);
            Response::ok(null, '비밀번호가 변경되었습니다.');
        } catch (RuntimeException $e) {
            Response::error($e->getMessage(), 400);
        }
    }
}
