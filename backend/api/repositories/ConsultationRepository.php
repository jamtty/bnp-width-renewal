<?php
/**
 * 건강상담 Repository
 * consultation_tbl 기반
 *
 * 컬럼 구조 (실제 DB):
 *   AD_IDX       INT PK
 *   JB_CD        VARCHAR(30)   상담분류코드
 *   AD_NAME      VARCHAR(100)  신청자이름
 *   AD_PHONE     VARCHAR(50)   연락처
 *   AD_EMAIL     VARCHAR(150)  이메일
 *   AD_PWD       VARCHAR(100)  비밀번호
 *   AD_TITLE     VARCHAR(150)  제목
 *   AD_CONT      TEXT          내용
 *   AD_SE_GUBUN  CHAR(1)       비밀글여부 (Y/N)
 *   ATCH_FILE_ID VARCHAR(20)   파일ID
 *   INPUTDATE    DATETIME      등록일
 *   UPDATEDATE   DATETIME      수정일
 *   DELDATE      DATETIME      삭제일
 *   AD_DEL_YN    CHAR(1)       삭제여부 (Y/N)
 *   REPDATE      DATETIME      답변일
 *   AD_RE_ID     VARCHAR(50)   답변자 아이디
 *   AD_RE_CONT   TEXT          답변내용
 *   AD_VIEW      DECIMAL(10,0) 조회수
 */
class ConsultationRepository extends BaseRepository
{
    // ──────────────────────────────────────────────────────────────
    // 비밀번호 암호화 (MySQL PASSWORD() 포맷: *SHA1(SHA1))
    // ──────────────────────────────────────────────────────────────
    private function hashPassword(string $password): string
    {
        return '*' . strtoupper(sha1(sha1($password, true)));
    }

    // ─────────────────────────────────────────────────────────────
    // 목록 · 검색
    // ─────────────────────────────────────────────────────────────

    public function countList(array $cond): int
    {
        [$where, $params] = $this->buildWhere($cond);
        return (int)$this->selectScalar(
            "SELECT COUNT(*) FROM consultation_tbl A $where",
            $params
        );
    }

    public function findList(array $cond, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildWhere($cond);

        $sql = "
            SELECT
                A.AD_IDX                                     AS id,
                A.JB_CD                                      AS jb_cd,
                A.AD_TITLE                                   AS title,
                A.AD_NAME                                    AS name,
                A.AD_SE_GUBUN                                AS is_secret,
                CAST(A.AD_VIEW AS UNSIGNED)                  AS view_count,
                IF(A.AD_RE_CONT IS NOT NULL AND A.AD_RE_CONT != '', '답변완료', '답변대기') AS status,
                DATE_FORMAT(A.INPUTDATE, '%Y-%m-%d')         AS date
            FROM consultation_tbl A
            $where
            ORDER BY A.AD_IDX DESC
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
                A.AD_IDX                                     AS id,
                A.JB_CD                                      AS jb_cd,
                A.AD_TITLE                                   AS title,
                A.AD_CONT                                    AS content,
                A.AD_NAME                                    AS name,
                A.AD_PHONE                                   AS phone,
                A.AD_EMAIL                                   AS email,
                A.AD_PWD                                     AS password,
                A.AD_SE_GUBUN                                AS is_secret,
                CAST(A.AD_VIEW AS UNSIGNED)                  AS view_count,
                IF(A.AD_RE_CONT IS NOT NULL AND A.AD_RE_CONT != '', '답변완료', '답변대기') AS status,
                A.AD_RE_CONT                                 AS reply,
                A.AD_RE_ID                                   AS reply_name,
                DATE_FORMAT(A.REPDATE, '%Y-%m-%d')           AS reply_date,
                DATE_FORMAT(A.INPUTDATE, '%Y-%m-%d')         AS date
            FROM consultation_tbl A
            WHERE A.AD_IDX = :id",
            [':id' => $id]
        );
    }

    public function findPrev(int $id): array|false
    {
        return $this->selectOne(
            "SELECT AD_IDX AS id, AD_TITLE AS title
             FROM consultation_tbl
             WHERE AD_IDX < :id
             ORDER BY AD_IDX DESC LIMIT 1",
            [':id' => $id]
        );
    }

    public function findNext(int $id): array|false
    {
        return $this->selectOne(
            "SELECT AD_IDX AS id, AD_TITLE AS title
             FROM consultation_tbl
             WHERE AD_IDX > :id
             ORDER BY AD_IDX ASC LIMIT 1",
            [':id' => $id]
        );
    }

    // ─────────────────────────────────────────────────────────────
    // CRUD
    // ─────────────────────────────────────────────────────────────

    public function create(
        string $jbCd,
        string $title,
        string $content,
        string $name,
        string $phone,
        string $email,
        string $password,
        string $isSecret
    ): int {
        $nextId = (int)$this->selectScalar(
            'SELECT COALESCE(MAX(AD_IDX), 0) + 1 FROM consultation_tbl'
        );
        $this->execute(
            "INSERT INTO consultation_tbl
                (AD_IDX, JB_CD, AD_TITLE, AD_CONT,
                 AD_NAME, AD_PHONE, AD_EMAIL, AD_PWD,
                 AD_SE_GUBUN, AD_VIEW, AD_DEL_YN, INPUTDATE)
             VALUES
                (:ad_idx, :jb_cd, :title, :content,
                 :name, :phone, :email, :password,
                 :is_secret, 0, 'N', NOW())",
            [
                ':ad_idx'    => $nextId,
                ':jb_cd'     => $jbCd,
                ':title'     => $title,
                ':content'   => $content,
                ':name'      => $name,
                ':phone'     => $phone,
                ':email'     => $email,
                ':password'  => $this->hashPassword($password),
                ':is_secret' => $isSecret,
            ]
        );
        return $nextId;
    }

    public function incrementViewCount(int $id): void
    {
        $this->execute(
            'UPDATE consultation_tbl SET AD_VIEW = AD_VIEW + 1 WHERE AD_IDX = :id',
            [':id' => $id]
        );
    }

    public function softDelete(int $id): bool
    {
        return $this->execute(
            'DELETE FROM consultation_tbl WHERE AD_IDX = :id',
            [':id' => $id]
        ) > 0;
    }

    public function saveReply(int $id, string $content, string $replyId): bool
    {
        return $this->execute(
            "UPDATE consultation_tbl SET AD_RE_CONT = :content, AD_RE_ID = :reply_id, REPDATE = NOW(), UPDATEDATE = NOW()
             WHERE AD_IDX = :id",
            [':content' => $content, ':reply_id' => $replyId, ':id' => $id]
        ) > 0;
    }

    // ─────────────────────────────────────────────────────────────
    // 첨부파일
    // ─────────────────────────────────────────────────────────────

    public function saveFile(int $adIdx, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): void
    {
        $this->execute(
            'INSERT INTO consultation_file (ad_idx, ori_name, save_name, file_path, file_size, file_ext)
             VALUES (:ad_idx, :ori_name, :save_name, :file_path, :file_size, :file_ext)',
            [
                ':ad_idx'    => $adIdx,
                ':ori_name'  => $oriName,
                ':save_name' => $saveName,
                ':file_path' => $filePath,
                ':file_size' => $fileSize,
                ':file_ext'  => $fileExt,
            ]
        );
    }

    public function findFiles(int $adIdx): array
    {
        try {
            $rows = $this->select(
                "SELECT id, ori_name, save_name, file_size, file_ext
                 FROM consultation_file
                 WHERE ad_idx = :ad_idx
                 ORDER BY id ASC",
                [':ad_idx' => $adIdx]
            );
            $uploadUrl = rtrim(Env::get('UPLOAD_URL_CONSULTATION', '/uploads/consultation/'), '/') . '/';
            foreach ($rows as &$row) {
                $row['file_url'] = $uploadUrl . $row['save_name'];
            }
            return $rows;
        } catch (\PDOException $e) {
            error_log('findFiles error: ' . $e->getMessage());
            return [];
        }
    }

    public function findFilePathsByAdIdx(int $adIdx): array
    {
        $rows = $this->select(
            'SELECT id, file_path FROM consultation_file WHERE ad_idx = :ad_idx',
            [':ad_idx' => $adIdx]
        );
        return $rows ?: [];
    }

    public function findFilePath(int $fileId): string|false
    {
        $row = $this->selectOne('SELECT file_path FROM consultation_file WHERE id = :id', [':id' => $fileId]);
        return $row ? (string)$row['file_path'] : false;
    }

    public function deleteFile(int $fileId): bool
    {
        return $this->execute('DELETE FROM consultation_file WHERE id = :id', [':id' => $fileId]) > 0;
    }

    public function deleteFilesByAdIdx(int $adIdx): void
    {
        $this->execute('DELETE FROM consultation_file WHERE ad_idx = :ad_idx', [':ad_idx' => $adIdx]);
    }

    // ─────────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────────

    private function buildWhere(array $cond): array
    {
        $where  = 'WHERE A.AD_DEL_YN = \'N\'';
        $params = [];

        $keyword   = trim($cond['keyword'] ?? '');
        $type      = $cond['type'] ?? '';
        $dateFrom  = trim($cond['date_from'] ?? '');
        $dateTo    = trim($cond['date_to']   ?? '');

        if ($dateFrom !== '') {
            $where .= ' AND DATE(A.INPUTDATE) >= :date_from';
            $params[':date_from'] = $dateFrom;
        }
        if ($dateTo !== '') {
            $where .= ' AND DATE(A.INPUTDATE) <= :date_to';
            $params[':date_to'] = $dateTo;
        }

        if ($keyword !== '') {
            $like = '%' . $keyword . '%';
            if ($type === 'A.AD_TITLE') {
                $where .= ' AND A.AD_TITLE LIKE :keyword';
            } elseif ($type === 'A.AD_CONT') {
                $where .= ' AND A.AD_CONT LIKE :keyword';
            } elseif ($type === 'A.AD_NAME') {
                $where .= ' AND A.AD_NAME LIKE :keyword';
            } else {
                $where .= ' AND (A.AD_TITLE LIKE :keyword OR A.AD_CONT LIKE :keyword_content)';
            }
            $params[':keyword'] = $like;
            if ($type !== 'A.AD_TITLE' && $type !== 'A.AD_CONT' && $type !== 'A.AD_NAME') {
                $params[':keyword_content'] = $like;
            }
        }

        return [$where, $params];
    }
}
