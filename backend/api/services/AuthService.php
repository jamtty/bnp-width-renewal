<?php

class AuthService
{
    private MemberRepository $repo;

    public function __construct()
    {
        $this->repo = new MemberRepository();
    }

    /**
     * 로그인 처리
     * @return array { token, user }
     * @throws RuntimeException 인증 실패 시
     */
    public function login(string $loginId, string $password): array
    {
        $member = $this->repo->findByLoginId($loginId);

        if (!$member || !password_verify($password, $member['password'])) {
            throw new RuntimeException('아이디 또는 비밀번호가 올바르지 않습니다.');
        }

        $token = Token::generate([
            'sub'  => $member['id'],
            'name' => $member['name'],
            'role' => $member['role'],
        ]);

        return [
            'token' => $token,
            'user'  => [
                'id'   => (int)$member['id'],
                'name' => $member['name'],
                'role' => $member['role'],
            ],
        ];
    }

    /**
     * 메서드: 비밀번호 변경
     * @throws RuntimeException 실패 시
     */
    public function changePassword(int $memberId, string $currentPassword, string $newPassword): void
    {
        $member = $this->repo->findById($memberId);
        if (!$member) {
            throw new RuntimeException('사용자를 찾을 수 없습니다.');
        }
        if (!password_verify($currentPassword, $member['password'])) {
            throw new RuntimeException('현재 비밀번호가 일치하지 않습니다.');
        }
        if (strlen($newPassword) < 6) {
            throw new RuntimeException('새 비밀번호는 6자 이상이어야 합니다.');
        }
        $hashed = password_hash($newPassword, PASSWORD_BCRYPT);
        $ok = $this->repo->updatePassword($memberId, $hashed);
        if (!$ok) {
            throw new RuntimeException('비밀번호 변경에 실패했습니다.');
        }
    }
}
