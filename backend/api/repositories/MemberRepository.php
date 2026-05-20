<?php

class MemberRepository extends BaseRepository
{
    /**
     * login_id 로 활성 멤버 한 명 조회
     */
    public function findByLoginId(string $loginId): array|false
    {
        return $this->selectOne(
            "SELECT * FROM member WHERE login_id = ? AND is_deleted = 0 LIMIT 1",
            [$loginId]
        );
    }

    /**
     * id 로 멤버 조회
     */
    public function findById(int $id): array|false
    {
        return $this->selectOne(
            "SELECT * FROM member WHERE id = ? AND is_deleted = 0 LIMIT 1",
            [$id]
        );
    }

    /**
     * 비밀번호 변경
     */
    public function updatePassword(int $id, string $hashedPassword): bool
    {
        $affected = $this->execute(
            "UPDATE member SET password = ? WHERE id = ? AND is_deleted = 0",
            [$hashedPassword, $id]
        );
        return $affected > 0;
    }
}
