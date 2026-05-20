<?php
/**
 * 사업보고 Repository
 * DB 쿼리만 담당 - 비즈니스 로직 없음
 */
class ReportRepository extends BaseRepository
{
    /**
     * 목록 총 건수
     */
    public function countList(array $searchCondition): int
    {
        [$where, $params] = $this->buildSearchWhere($searchCondition);

        return (int)$this->selectScalar(
            "SELECT COUNT(*) FROM report r $where",
            $params
        );
    }

    /**
     * 목록 조회 (페이징)
     */
    public function findList(array $searchCondition, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildSearchWhere($searchCondition);

        $sql = "
            SELECT
                r.id,
                r.title,
                r.author_name,
                DATE_FORMAT(r.created_at, '%Y-%m-%d') AS created_at,
                r.view_count,
                LEFT(r.content, 100) AS content,
                (SELECT COUNT(*) FROM report_file f WHERE f.report_id = r.id) AS file_count
            FROM report r
            $where
            ORDER BY r.id DESC
            LIMIT :limit OFFSET :offset
        ";

        $stmt = $this->db->prepare($sql);

        foreach ($params as $key => $val) {
            $stmt->bindValue($key, $val, PDO::PARAM_STR);
        }

        $stmt->bindValue(':limit',  $limit,  PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    /**
     * 단건 조회
     */
    public function findById(int $id): array|false
    {
        return $this->selectOne(
            "SELECT
                r.id, r.title, r.author_id, r.author_name,
                r.content, r.view_count,
                DATE_FORMAT(r.created_at, '%Y-%m-%d') AS created_at,
                DATE_FORMAT(r.updated_at, '%Y-%m-%d') AS updated_at
            FROM report r
            WHERE r.id = :id AND r.is_deleted = 0",
            [':id' => $id]
        );
    }

    /**
     * 첨부파일 목록
     */
    public function findFiles(int $reportId): array
    {
        $uploadUrl = Env::get('UPLOAD_URL_REPORT', '/uploads/report/');

        return $this->select(
            "SELECT
                id, ori_name, save_name,
                CONCAT(:upload_url, save_name) AS file_url,
                file_size, file_ext
            FROM report_file
            WHERE report_id = :report_id
            ORDER BY id ASC",
            [':upload_url' => $uploadUrl, ':report_id' => $reportId]
        );
    }

    /**
     * 이전글
     */
    public function findPrev(int $id): array|false
    {
        return $this->selectOne(
            "SELECT id, title FROM report
             WHERE id < :id AND is_deleted = 0
             ORDER BY id DESC LIMIT 1",
            [':id' => $id]
        );
    }

    /**
     * 다음글
     */
    public function findNext(int $id): array|false
    {
        return $this->selectOne(
            "SELECT id, title FROM report
             WHERE id > :id AND is_deleted = 0
             ORDER BY id ASC LIMIT 1",
            [':id' => $id]
        );
    }

    /**
     * 조회수 증가
     */
    public function incrementViewCount(int $id): void
    {
        $this->execute(
            'UPDATE report SET view_count = view_count + 1 WHERE id = :id',
            [':id' => $id]
        );
    }

    /**
     * 게시글 등록
     */
    public function create(string $title, string $content, string $authorId, string $authorName): int
    {
        return (int)$this->insert(
            'INSERT INTO report (title, content, author_id, author_name) VALUES (:title, :content, :author_id, :author_name)',
            [':title' => $title, ':content' => $content, ':author_id' => $authorId, ':author_name' => $authorName]
        );
    }

    /**
     * 게시글 수정
     */
    public function update(int $id, string $title, string $content): bool
    {
        return $this->execute(
            'UPDATE report SET title = :title, content = :content WHERE id = :id AND is_deleted = 0',
            [':title' => $title, ':content' => $content, ':id' => $id]
        ) > 0;
    }

    /**
     * 게시글 삭제 (실제 삭제)
     */
    public function softDelete(int $id): bool
    {
        return $this->execute(
            'DELETE FROM report WHERE id = :id',
            [':id' => $id]
        ) > 0;
    }

    /**
     * 첨부파일 저장
     */
    public function saveFile(int $reportId, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): void
    {
        $this->execute(
            'INSERT INTO report_file (report_id, ori_name, save_name, file_path, file_size, file_ext) VALUES (:report_id, :ori_name, :save_name, :file_path, :file_size, :file_ext)',
            [':report_id' => $reportId, ':ori_name' => $oriName, ':save_name' => $saveName, ':file_path' => $filePath, ':file_size' => $fileSize, ':file_ext' => $fileExt]
        );
    }

    /**
     * 첨부파일 디스크 경로 조회
     */
    public function findFilePath(int $fileId): string|false
    {
        $row = $this->selectOne('SELECT file_path FROM report_file WHERE id = :id', [':id' => $fileId]);
        return $row ? (string)$row['file_path'] : false;
    }

    /**
     * 게시글의 전체 첨부파일 경로 목록 (삭제용)
     */
    public function findFilePathsByReportId(int $reportId): array
    {
        $rows = $this->select('SELECT file_path FROM report_file WHERE report_id = :id', [':id' => $reportId]);
        return array_column($rows, 'file_path');
    }

    public function deleteFilesByReportId(int $reportId): void
    {
        $this->execute('DELETE FROM report_file WHERE report_id = :id', [':id' => $reportId]);
    }

    /**
     * 첨부파일 DB 삭제
     */
    public function deleteFile(int $fileId): bool
    {
        return $this->execute('DELETE FROM report_file WHERE id = :id', [':id' => $fileId]) > 0;
    }

    // ─────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────

    private function buildSearchWhere(array $condition): array
    {
        $where  = 'WHERE r.is_deleted = 0';
        $params = [];

        $keyword = trim($condition['keyword'] ?? '');
        $type    = isset($condition['type']) ? (int)$condition['type'] : -1;

        if ($keyword !== '') {
            $like = '%' . $keyword . '%';
            if ($type === 0) {
                $where .= ' AND r.title LIKE :keyword';
                $params[':keyword'] = $like;
            } elseif ($type === 1) {
                $where .= ' AND r.content LIKE :keyword';
                $params[':keyword'] = $like;
            } else {
                $where .= ' AND (r.title LIKE :keyword OR r.content LIKE :keyword2)';
                $params[':keyword']  = $like;
                $params[':keyword2'] = $like;
            }
        }

        return [$where, $params];
    }
}
