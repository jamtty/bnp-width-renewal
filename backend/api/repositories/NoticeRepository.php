<?php
/**
 * 공지사항 Repository
 * DB 쿼리만 담당 - 비즈니스 로직 없음
 * board_tbl (BMT_IDX = 1) 기반으로 실제 데이터 조회
 */
class NoticeRepository extends BaseRepository
{
    private const BMT_IDX = 1;

    /**
     * 일반 게시글(고정글 제외) 총 건수 - 페이징 기준
     */
    public function countList(array $searchCondition): int
    {
        [$where, $params] = $this->buildSearchWhere($searchCondition, false);

        return (int)$this->selectScalar(
            "SELECT COUNT(*) FROM board_tbl n $where",
            $params
        );
    }

    /**
     * 고정 공지글 목록 (항상 상단 고정, 페이징 없음)
     * 날짜 필터가 있으면 해당 기간 내 공지글만 반환
     */
    public function findPinnedList(array $searchCondition = []): array
    {
        $where  = "WHERE n.BMT_IDX = :bmt_idx AND n.BD_NOTICE_YN = 'Y'";
        $params = [':bmt_idx' => self::BMT_IDX];

        $dateFrom = trim($searchCondition['date_from'] ?? '');
        $dateTo   = trim($searchCondition['date_to']   ?? '');

        if ($dateFrom !== '') {
            $where .= ' AND DATE(n.INPUTDATE) >= :date_from';
            $params[':date_from'] = $dateFrom;
        }
        if ($dateTo !== '') {
            $where .= ' AND DATE(n.INPUTDATE) <= :date_to';
            $params[':date_to'] = $dateTo;
        }

        $sql = "
            SELECT
                n.BD_IDX        AS id,
                n.BD_TITLE      AS title,
                n.BD_WRITER     AS author_name,
                DATE_FORMAT(n.INPUTDATE, '%Y-%m-%d') AS created_at,
                n.BD_VIEW       AS view_count,
                LEFT(n.BD_CONTENT, 100) AS content,
                1               AS is_pinned,
                0               AS file_count
            FROM board_tbl n
            $where
            ORDER BY n.BD_IDX DESC
        ";
        return $this->select($sql, $params);
    }

    /**
     * 일반 게시글 목록 조회 (페이징)
     */
    public function findList(array $searchCondition, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildSearchWhere($searchCondition, false);

        $sql = "
            SELECT
                n.BD_IDX        AS id,
                n.BD_TITLE      AS title,
                n.BD_WRITER     AS author_name,
                DATE_FORMAT(n.INPUTDATE, '%Y-%m-%d') AS created_at,
                n.BD_VIEW       AS view_count,
                LEFT(n.BD_CONTENT, 100) AS content,
                0               AS is_pinned,
                0               AS file_count
            FROM board_tbl n
            $where
            ORDER BY n.BD_IDX DESC
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
                n.BD_IDX    AS id,
                n.BD_TITLE  AS title,
                n.IN_MEM_ID AS author_id,
                n.BD_WRITER AS author_name,
                n.BD_CONTENT AS content,
                n.BD_VIEW   AS view_count,
                IF(n.BD_NOTICE_YN = 'Y', 1, 0) AS is_pinned,
                DATE_FORMAT(n.INPUTDATE,  '%Y-%m-%d') AS created_at,
                DATE_FORMAT(n.UPDATEDATE, '%Y-%m-%d') AS updated_at
            FROM board_tbl n
            WHERE n.BD_IDX = :id
              AND n.BMT_IDX = :bmt_idx",
            [':id' => $id, ':bmt_idx' => self::BMT_IDX]
        );
    }

    /**
     * 첨부파일 목록 (관리자가 업로드한 파일)
     */
    public function findFiles(int $noticeId): array
    {
        $uploadUrl = Env::get('UPLOAD_URL_NOTICE', '/uploads/notice/');

        return $this->select(
            "SELECT
                id, ori_name, save_name,
                CONCAT(:upload_url, save_name) AS file_url,
                file_size, file_ext
            FROM notice_file
            WHERE notice_id = :notice_id
            ORDER BY id ASC",
            [':upload_url' => $uploadUrl, ':notice_id' => $noticeId]
        );
    }

    /**
     * 이전글 (일반글 기준)
     */
    public function findPrev(int $id): array|false
    {
        return $this->selectOne(
            "SELECT BD_IDX AS id, BD_TITLE AS title
             FROM board_tbl
             WHERE BD_IDX < :id
               AND BMT_IDX = :bmt_idx
             ORDER BY BD_IDX DESC LIMIT 1",
            [':id' => $id, ':bmt_idx' => self::BMT_IDX]
        );
    }

    /**
     * 다음글
     */
    public function findNext(int $id): array|false
    {
        return $this->selectOne(
            "SELECT BD_IDX AS id, BD_TITLE AS title
             FROM board_tbl
             WHERE BD_IDX > :id
               AND BMT_IDX = :bmt_idx
             ORDER BY BD_IDX ASC LIMIT 1",
            [':id' => $id, ':bmt_idx' => self::BMT_IDX]
        );
    }

    /**
     * 조회수 증가
     */
    public function incrementViewCount(int $id): void
    {
        $this->execute(
            'UPDATE board_tbl SET BD_VIEW = BD_VIEW + 1 WHERE BD_IDX = :id AND BMT_IDX = :bmt_idx',
            [':id' => $id, ':bmt_idx' => self::BMT_IDX]
        );
    }

    /**
     * 게시글 등록
     */
    public function create(string $title, string $content, string $authorId, string $authorName, bool $isPinned = false): int
    {
        $noticeYn = $isPinned ? 'Y' : 'N';
        $nextId = (int)$this->selectScalar('SELECT COALESCE(MAX(BD_IDX), 0) + 1 FROM board_tbl');
        $this->execute(
            "INSERT INTO board_tbl
                (BD_IDX, BMT_IDX, BD_TITLE, BD_CONTENT, IN_MEM_ID, UP_MEM_ID, BD_WRITER, BD_DEL_FLAG, BD_NOTICE_YN, BD_VIEW, BD_IP, BD_ORD, BD_REP_DEPTH, BD_STEP, BD_ORD_NEW, INPUTDATE)
             VALUES
                (:bd_idx, :bmt_idx, :title, :content, :author_id, :up_mem_id, :author_name, 'N', :notice_yn, 0, '', 0, 0, 0, 1, NOW())",
            [
                ':bd_idx'      => $nextId,
                ':bmt_idx'     => self::BMT_IDX,
                ':title'       => $title,
                ':content'     => $content,
                ':author_id'   => $authorId,
                ':up_mem_id'   => $authorId,
                ':author_name' => $authorName,
                ':notice_yn'   => $noticeYn,
            ]
        );
        return $nextId;
    }

    /**
     * 게시글 수정
     */
    public function update(int $id, string $title, string $content, bool $isPinned = false): bool
    {
        $noticeYn = $isPinned ? 'Y' : 'N';
        return $this->execute(
            "UPDATE board_tbl
             SET BD_TITLE = :title, BD_CONTENT = :content, BD_NOTICE_YN = :notice_yn, UPDATEDATE = NOW()
             WHERE BD_IDX = :id
               AND BMT_IDX = :bmt_idx",
            [':title' => $title, ':content' => $content, ':notice_yn' => $noticeYn, ':id' => $id, ':bmt_idx' => self::BMT_IDX]
        ) > 0;
    }

    /**
     * 게시글 삭제 (플래그 처리)
     */
    public function softDelete(int $id): bool
    {
        return $this->execute(
            'DELETE FROM board_tbl WHERE BD_IDX = :id AND BMT_IDX = :bmt_idx',
            [':id' => $id, ':bmt_idx' => self::BMT_IDX]
        ) > 0;
    }

    /**
     * 공지 고정 / 해제 토글
     */
    public function togglePin(int $id): bool
    {
        return $this->execute(
            "UPDATE board_tbl
             SET BD_NOTICE_YN = CASE WHEN BD_NOTICE_YN = 'Y' THEN 'N' ELSE 'Y' END,
                 UPDATEDATE = NOW()
             WHERE BD_IDX = :id
               AND BMT_IDX = :bmt_idx",
            [':id' => $id, ':bmt_idx' => self::BMT_IDX]
        ) > 0;
    }

    /**
     * 첨부파일 저장
     */
    public function saveFile(int $noticeId, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): void
    {
        $this->execute(
            'INSERT INTO notice_file (notice_id, ori_name, save_name, file_path, file_size, file_ext)
             VALUES (:notice_id, :ori_name, :save_name, :file_path, :file_size, :file_ext)',
            [
                ':notice_id' => $noticeId,
                ':ori_name'  => $oriName,
                ':save_name' => $saveName,
                ':file_path' => $filePath,
                ':file_size' => $fileSize,
                ':file_ext'  => $fileExt,
            ]
        );
    }

    /**
     * 첨부파일 디스크 경로 조회
     */
    public function findFilePath(int $fileId): string|false
    {
        $row = $this->selectOne('SELECT file_path FROM notice_file WHERE id = :id', [':id' => $fileId]);
        return $row ? (string)$row['file_path'] : false;
    }

    /**
     * 게시글의 전체 첨부파일 경로 목록 (삭제용)
     */
    public function findFilePathsByNoticeId(int $noticeId): array
    {
        $rows = $this->select('SELECT file_path FROM notice_file WHERE notice_id = :id', [':id' => $noticeId]);
        return array_column($rows, 'file_path');
    }

    public function deleteFilesByNoticeId(int $noticeId): void
    {
        $this->execute('DELETE FROM notice_file WHERE notice_id = :id', [':id' => $noticeId]);
    }

    /**
     * 첨부파일 DB 삭제
     */
    public function deleteFile(int $fileId): bool
    {
        return $this->execute('DELETE FROM notice_file WHERE id = :id', [':id' => $fileId]) > 0;
    }

    // ─────────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────────

    /**
     * 검색 조건 WHERE 절 생성
     * @param bool $includePinned true: 일반글+고정글 모두, false: 일반글만
     */
    private function buildSearchWhere(array $condition, bool $includePinned = true): array
    {
        $base   = $includePinned ? '1=1' : "BD_NOTICE_YN = 'N'";
        $where  = $includePinned ? 'WHERE n.BMT_IDX = :bmt_idx' : "WHERE n.BMT_IDX = :bmt_idx AND n.$base";
        $params = [':bmt_idx' => self::BMT_IDX];

        $keyword   = trim($condition['keyword'] ?? '');
        $type      = isset($condition['type']) ? (int)$condition['type'] : -1;
        $dateFrom  = trim($condition['date_from'] ?? '');
        $dateTo    = trim($condition['date_to']   ?? '');
        $isPinned  = $condition['is_pinned'] ?? '';

        if ($dateFrom !== '') {
            $where .= ' AND DATE(n.INPUTDATE) >= :date_from';
            $params[':date_from'] = $dateFrom;
        }
        if ($dateTo !== '') {
            $where .= ' AND DATE(n.INPUTDATE) <= :date_to';
            $params[':date_to'] = $dateTo;
        }
        if ($isPinned === '1') {
            $where .= " AND n.BD_NOTICE_YN = 'Y'";
        } elseif ($isPinned === '0') {
            $where .= " AND n.BD_NOTICE_YN = 'N'";
        }

        if ($keyword !== '') {
            $like = '%' . $keyword . '%';
            if ($type === 0) {
                $where .= ' AND n.BD_TITLE LIKE :keyword';
                $params[':keyword'] = $like;
            } elseif ($type === 1) {
                $where .= ' AND n.BD_CONTENT LIKE :keyword';
                $params[':keyword'] = $like;
            } else {
                $where .= ' AND (n.BD_TITLE LIKE :keyword OR n.BD_CONTENT LIKE :keyword2)';
                $params[':keyword']  = $like;
                $params[':keyword2'] = $like;
            }
        }

        return [$where, $params];
    }
}
