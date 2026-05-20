<?php
/**
 * 공통 게시판 Repository
 * board_tbl 기반, BMT_IDX 별로 인스턴스 생성하여 사용
 *
 * BMT_IDX 매핑 (board_master_tbl)
 *  1 = 공지사항  → NoticeRepository
 *  2 = 보도자료  → BoardRepository(2)
 *  3 = 자료실    → BoardRepository(3)
 *  4 = 홈블로    → BoardRepository(4)
 *  5 = 채용정보  → BoardRepository(5)
 *  6 = (미사용)
 *  7 = 건강정보  → BoardRepository(7)
 *  8 = 메디TV     → BoardRepository(8)
 */
class BoardRepository extends BaseRepository
{
    protected int $bmtIdx;

    public function __construct(int $bmtIdx)
    {
        parent::__construct();
        $this->bmtIdx = $bmtIdx;
    }

    // ─────────────────────────────────────────────────────────────
    // 목록 · 검색
    // ─────────────────────────────────────────────────────────────

    public function countList(array $searchCondition): int
    {
        [$where, $params] = $this->buildWhere($searchCondition);
        return (int)$this->selectScalar(
            "SELECT COUNT(*) FROM board_tbl n $where",
            $params
        );
    }

    public function findList(array $searchCondition, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildWhere($searchCondition);

        $sql = "
            SELECT
                n.BD_IDX        AS id,
                n.BD_TITLE      AS title,
                n.BD_WRITER     AS author_name,
                DATE_FORMAT(n.INPUTDATE, '%Y-%m-%d') AS created_at,
                n.BD_VIEW       AS view_count,
                n.BD_CONTENT    AS content,
                IF(n.BD_NOTICE_YN = 'Y', 1, 0) AS is_pinned,
                n.BD_FIELD_1    AS field1,
                n.BD_FIELD_2    AS field2,
                n.BD_FIELD_3    AS field3
            FROM board_tbl n
            $where
            ORDER BY n.BD_NOTICE_YN DESC, n.BD_IDX DESC
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

    // ─────────────────────────────────────────────────────────────
    // 단건 조회
    // ─────────────────────────────────────────────────────────────

    public function findById(int $id): array|false
    {
        return $this->selectOne(
            "SELECT
                n.BD_IDX        AS id,
                n.BD_TITLE      AS title,
                n.IN_MEM_ID     AS author_id,
                n.BD_WRITER     AS author_name,
                n.BD_CONTENT    AS content,
                n.BD_VIEW       AS view_count,
                IF(n.BD_NOTICE_YN = 'Y', 1, 0) AS is_pinned,
                n.BD_FIELD_1    AS field1,
                n.BD_FIELD_2    AS field2,
                n.BD_FIELD_3    AS field3,
                DATE_FORMAT(n.INPUTDATE,  '%Y-%m-%d') AS created_at,
                DATE_FORMAT(n.UPDATEDATE, '%Y-%m-%d') AS updated_at
            FROM board_tbl n
            WHERE n.BD_IDX   = :id
              AND n.BMT_IDX  = :bmt_idx",
            [':id' => $id, ':bmt_idx' => $this->bmtIdx]
        );
    }

    public function findPrev(int $id): array|false
    {
        return $this->selectOne(
            "SELECT BD_IDX AS id, BD_TITLE AS title
             FROM board_tbl
             WHERE BD_IDX < :id AND BMT_IDX = :bmt_idx
             ORDER BY BD_IDX DESC LIMIT 1",
            [':id' => $id, ':bmt_idx' => $this->bmtIdx]
        );
    }

    public function findNext(int $id): array|false
    {
        return $this->selectOne(
            "SELECT BD_IDX AS id, BD_TITLE AS title
             FROM board_tbl
             WHERE BD_IDX > :id AND BMT_IDX = :bmt_idx
             ORDER BY BD_IDX ASC LIMIT 1",
            [':id' => $id, ':bmt_idx' => $this->bmtIdx]
        );
    }

    // ─────────────────────────────────────────────────────────────
    // CRUD
    // ─────────────────────────────────────────────────────────────

    public function create(
        string $title,
        string $content,
        string $authorId,
        string $authorName,
        bool   $isPinned = false,
        ?string $field1 = null,
        ?string $field2 = null,
        ?string $field3 = null
    ): int {
        $noticeYn = $isPinned ? 'Y' : 'N';
        $nextId = (int)$this->selectScalar('SELECT COALESCE(MAX(BD_IDX), 0) + 1 FROM board_tbl');
        $this->execute(
            "INSERT INTO board_tbl
                (BD_IDX, BMT_IDX, BD_TITLE, BD_CONTENT, IN_MEM_ID, UP_MEM_ID, BD_WRITER,
                 BD_DEL_FLAG, BD_NOTICE_YN, BD_VIEW, BD_IP, BD_ORD, BD_REP_DEPTH,
                 BD_STEP, BD_ORD_NEW, BD_FIELD_1, BD_FIELD_2, BD_FIELD_3, INPUTDATE)
             VALUES
                (:bd_idx, :bmt_idx, :title, :content, :author_id, :up_mem_id, :author_name,
                 'N', :notice_yn, 0, '', 0, 0, 0, 1,
                 :field1, :field2, :field3, NOW())",
            [
                ':bd_idx'      => $nextId,
                ':bmt_idx'     => $this->bmtIdx,
                ':title'       => $title,
                ':content'     => $content,
                ':author_id'   => $authorId,
                ':up_mem_id'   => $authorId,
                ':author_name' => $authorName,
                ':notice_yn'   => $noticeYn,
                ':field1'      => $field1,
                ':field2'      => $field2,
                ':field3'      => $field3,
            ]
        );
        return $nextId;
    }

    public function update(
        int    $id,
        string $title,
        string $content,
        bool   $isPinned = false,
        ?string $field1 = null,
        ?string $field2 = null,
        ?string $field3 = null
    ): bool {
        $noticeYn = $isPinned ? 'Y' : 'N';
        return $this->execute(
            "UPDATE board_tbl
             SET BD_TITLE = :title, BD_CONTENT = :content, BD_NOTICE_YN = :notice_yn,
                 BD_FIELD_1 = :field1, BD_FIELD_2 = :field2, BD_FIELD_3 = :field3,
                 UPDATEDATE = NOW()
             WHERE BD_IDX = :id AND BMT_IDX = :bmt_idx",
            [
                ':title'     => $title,
                ':content'   => $content,
                ':notice_yn' => $noticeYn,
                ':field1'    => $field1,
                ':field2'    => $field2,
                ':field3'    => $field3,
                ':id'        => $id,
                ':bmt_idx'   => $this->bmtIdx,
            ]
        ) > 0;
    }

    public function softDelete(int $id): bool
    {
        return $this->execute(
            'DELETE FROM board_tbl WHERE BD_IDX = :id AND BMT_IDX = :bmt_idx',
            [':id' => $id, ':bmt_idx' => $this->bmtIdx]
        ) > 0;
    }

    public function togglePin(int $id): bool
    {
        return $this->execute(
            "UPDATE board_tbl
             SET BD_NOTICE_YN = CASE WHEN BD_NOTICE_YN = 'Y' THEN 'N' ELSE 'Y' END,
                 UPDATEDATE = NOW()
             WHERE BD_IDX = :id AND BMT_IDX = :bmt_idx",
            [':id' => $id, ':bmt_idx' => $this->bmtIdx]
        ) > 0;
    }

    public function incrementViewCount(int $id): void
    {
        $this->execute(
            'UPDATE board_tbl SET BD_VIEW = BD_VIEW + 1 WHERE BD_IDX = :id AND BMT_IDX = :bmt_idx',
            [':id' => $id, ':bmt_idx' => $this->bmtIdx]
        );
    }

    // ─────────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────────

    private function buildWhere(array $condition): array
    {
        $where  = 'WHERE n.BMT_IDX = :bmt_idx AND n.BD_DEL_FLAG = \'N\'';
        $params = [':bmt_idx' => $this->bmtIdx];

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
                $where .= ' AND (n.BD_TITLE LIKE :keyword OR n.BD_CONTENT LIKE :keyword_content)';
                $params[':keyword'] = $like;
                $params[':keyword_content'] = $like;
            }
        }

        return [$where, $params];
    }
}
