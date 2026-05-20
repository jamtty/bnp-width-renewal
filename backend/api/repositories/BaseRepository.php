<?php
/**
 * Repository 기반 클래스
 * 공통 DB 작업 추상화
 */
abstract class BaseRepository
{
    protected PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * SELECT 다건 조회
     */
    protected function select(string $sql, array $params = []): array
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /**
     * SELECT 단건 조회
     */
    protected function selectOne(string $sql, array $params = []): array|false
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetch();
    }

    /**
     * SELECT 스칼라 값 조회 (COUNT 등)
     */
    protected function selectScalar(string $sql, array $params = []): mixed
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchColumn();
    }

    /**
     * INSERT / UPDATE / DELETE 실행
     */
    protected function execute(string $sql, array $params = []): int
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }

    /**
     * INSERT 후 마지막 삽입 ID 반환
     */
    protected function insert(string $sql, array $params = []): string|false
    {
        $this->execute($sql, $params);
        return $this->db->lastInsertId();
    }
}
