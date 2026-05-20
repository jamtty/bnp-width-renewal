<?php
/**
 * 소식 Repository
 * DB 쿼리만 담당 - 비즈니스 로직 없음
 */
class NewsRepository extends BaseRepository
{
    /**
     * 목록 총 건수
     */
    public function countList(array $searchCondition): int
    {
        [$where, $params] = $this->buildSearchWhere($searchCondition);

        return (int)$this->selectScalar(
            "SELECT COUNT(*) FROM news n $where",
            $params
        );
    }

    /**
     * 목록 조회 (페이징)
     */
    public function findList(array $searchCondition, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildSearchWhere($searchCondition);

        $uploadUrl = Env::get('UPLOAD_URL', '/uploads/news/');

        $sql = "
            SELECT
                n.id,
                n.title,
                n.author_name,
                DATE_FORMAT(n.created_at, '%Y-%m-%d') AS created_at,
                n.view_count,
                (
                    SELECT CONCAT(:upload_url, f.save_name)
                    FROM news_file f
                    WHERE f.news_id = n.id
                      AND f.file_ext IN ('jpg','jpeg','png','gif','webp')
                    ORDER BY f.id ASC
                    LIMIT 1
                ) AS thumb_url,
                (SELECT COUNT(*) FROM news_file f WHERE f.news_id = n.id) AS file_count,
                LEFT(n.content, 800) AS content_preview
            FROM news n
            $where
            ORDER BY n.id DESC
            LIMIT :limit OFFSET :offset
        ";

        $params[':upload_url'] = $uploadUrl;

        $stmt = $this->db->prepare($sql);

        foreach ($params as $key => $val) {
            $type = ($key === ':limit' || $key === ':offset') ? PDO::PARAM_INT : PDO::PARAM_STR;
            $stmt->bindValue($key, $val, $type);
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
                n.id, n.title, n.author_id, n.author_name,
                n.content, n.view_count,
                DATE_FORMAT(n.created_at, '%Y-%m-%d') AS created_at,
                DATE_FORMAT(n.updated_at, '%Y-%m-%d') AS updated_at
            FROM news n
            WHERE n.id = :id AND n.is_deleted = 0",
            [':id' => $id]
        );
    }

    /**
     * 첨부파일 목록
     */
    public function findFiles(int $newsId): array
    {
        $uploadUrl = Env::get('UPLOAD_URL', '/uploads/news/');

        return $this->select(
            "SELECT
                id, ori_name, save_name,
                CONCAT(:upload_url, save_name) AS file_url,
                file_size, file_ext
            FROM news_file
            WHERE news_id = :news_id
            ORDER BY id ASC",
            [':upload_url' => $uploadUrl, ':news_id' => $newsId]
        );
    }

    /**
     * 이전글
     */
    public function findPrev(int $id): array|false
    {
        return $this->selectOne(
            "SELECT id, title FROM news
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
            "SELECT id, title FROM news
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
            'UPDATE news SET view_count = view_count + 1 WHERE id = :id',
            [':id' => $id]
        );
    }

    /**
     * 게시글 등록
     */
    public function create(string $title, string $content, string $authorId, string $authorName): int
    {
        return (int)$this->insert(
            'INSERT INTO news (title, content, author_id, author_name) VALUES (:title, :content, :author_id, :author_name)',
            [':title' => $title, ':content' => $content, ':author_id' => $authorId, ':author_name' => $authorName]
        );
    }

    /**
     * 게시글 수정
     */
    public function update(int $id, string $title, string $content): bool
    {
        return $this->execute(
            'UPDATE news SET title = :title, content = :content WHERE id = :id AND is_deleted = 0',
            [':title' => $title, ':content' => $content, ':id' => $id]
        ) > 0;
    }

    /**
     * 게시글 삭제 (실제 삭제)
     */
    public function softDelete(int $id): bool
    {
        return $this->execute(
            'DELETE FROM news WHERE id = :id',
            [':id' => $id]
        ) > 0;
    }

    /**
     * 체첫파일 저장
     */
    public function saveFile(int $newsId, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): void
    {
        $this->execute(
            'INSERT INTO news_file (news_id, ori_name, save_name, file_path, file_size, file_ext) VALUES (:news_id, :ori_name, :save_name, :file_path, :file_size, :file_ext)',
            [':news_id' => $newsId, ':ori_name' => $oriName, ':save_name' => $saveName, ':file_path' => $filePath, ':file_size' => $fileSize, ':file_ext' => $fileExt]
        );
    }

    /**
     * 첨부파일 디스크 경로 조회
     */
    public function findFilePath(int $fileId): string|false
    {
        $row = $this->selectOne('SELECT file_path FROM news_file WHERE id = :id', [':id' => $fileId]);
        return $row ? (string)$row['file_path'] : false;
    }

    /**
     * 게시글의 전체 첨부파일 경로 목록 (삭제용)
     */
    public function findFilePathsByNewsId(int $newsId): array
    {
        $rows = $this->select('SELECT file_path FROM news_file WHERE news_id = :id', [':id' => $newsId]);
        return array_column($rows, 'file_path');
    }

    public function deleteFilesByNewsId(int $newsId): void
    {
        $this->execute('DELETE FROM news_file WHERE news_id = :id', [':id' => $newsId]);
    }

    /**
     * 첨부파일 DB 삭제
     */
    public function deleteFile(int $fileId): bool
    {
        return $this->execute('DELETE FROM news_file WHERE id = :id', [':id' => $fileId]) > 0;
    }

    /**
     * 검색 조건 WHERE 절 + 파라미터 생성
     * @return array{0: string, 1: array}
     */
    private function buildSearchWhere(array $condition): array
    {
        $where  = 'WHERE n.is_deleted = 0';
        $params = [];

        $keyword = trim($condition['keyword'] ?? '');
        $type    = isset($condition['type']) ? (int)$condition['type'] : -1;

        if ($keyword !== '') {
            $like = '%' . $keyword . '%';
            if ($type === 0) {
                $where .= ' AND n.title LIKE :keyword';
                $params[':keyword'] = $like;
            } elseif ($type === 1) {
                $where .= ' AND n.content LIKE :keyword';
                $params[':keyword'] = $like;
            } else {
                $where .= ' AND (n.title LIKE :keyword OR n.content LIKE :keyword2)';
                $params[':keyword']  = $like;
                $params[':keyword2'] = $like;
            }
        }

        return [$where, $params];
    }
}
