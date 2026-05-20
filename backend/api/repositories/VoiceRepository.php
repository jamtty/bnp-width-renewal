<?php
/**
 * 고객의소리 Repository
 * voc_tbl 기반
 *
 * 컬럼 구조:
 *   VC_IDX       INT PK
 *   VC_CD        VARCHAR(30)   고객의소리분류코드
 *   VC_NAME      VARCHAR(100)  작성자이름
 *   VC_PHONE     VARCHAR(50)   연락처
 *   VC_EMAIL     VARCHAR(150)  이메일
 *   VC_PWD       VARCHAR(100)  비밀번호
 *   VC_TITLE     VARCHAR(150)  제목
 *   VC_CONT      TEXT          내용
 *   ATCH_FILE_ID VARCHAR(20)   파일아이디
 *   VC_VIEW      DECIMAL(10,0) 조회수
 *   VC_DEL_YN    CHAR(1)       삭제여부 (Y/N)
 *   INPUTDATE    DATETIME      등록일
 *   DELDATE      DATETIME      삭제일
 *   REPDATE      DATETIME      답변일
 *   VC_RE_ID     VARCHAR(50)   답변자아이디
 *   VC_RE_CONT   TEXT          답변내용
 *   UPDATEDATE   DATETIME      수정일
 */
class VoiceRepository extends BaseRepository
{
    // ──────────────────────────────────────────────────────────────
    // 비밀번호 암호화 (MySQL PASSWORD() 포맷: *SHA1(SHA1))
    // ──────────────────────────────────────────────────────────────
    private function hashPassword(string $password): string
    {
        return '*' . strtoupper(sha1(sha1($password, true)));
    }

    // ──────────────────────────────────────────────────────────────
    // 목록 · 검색
    // ──────────────────────────────────────────────────────────────

    public function countList(array $cond): int
    {
        [$where, $params] = $this->buildWhere($cond);
        return (int)$this->selectScalar(
            "SELECT COUNT(*) FROM voc_tbl A $where",
            $params
        );
    }

    public function findList(array $cond, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildWhere($cond);

        $sql = "
            SELECT
                A.VC_IDX                                     AS id,
                A.VC_CD                                      AS category,
                A.VC_TITLE                                   AS title,
                A.VC_NAME                                    AS name,
                CAST(A.VC_VIEW AS UNSIGNED)                  AS view_count,
                IF(A.VC_RE_CONT IS NOT NULL AND A.VC_RE_CONT != '', '답변완료', '답변대기') AS status,
                DATE_FORMAT(A.INPUTDATE, '%Y-%m-%d')         AS date
            FROM voc_tbl A
            $where
            ORDER BY A.VC_IDX DESC
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

    // ──────────────────────────────────────────────────────────────
    // 단건 조회
    // ──────────────────────────────────────────────────────────────

    public function findById(int $id): array|false
    {
        return $this->selectOne(
            "SELECT
                A.VC_IDX                                     AS id,
                A.VC_CD                                      AS category,
                A.VC_TITLE                                   AS title,
                A.VC_CONT                                    AS content,
                A.VC_NAME                                    AS name,
                A.VC_PHONE                                   AS phone,
                CAST(A.VC_VIEW AS UNSIGNED)                  AS view_count,
                IF(A.VC_RE_CONT IS NOT NULL AND A.VC_RE_CONT != '', '답변완료', '답변대기') AS status,
                A.VC_RE_CONT                                 AS reply,
                A.VC_RE_ID                                   AS reply_name,
                DATE_FORMAT(A.REPDATE, '%Y-%m-%d')           AS reply_date,
                DATE_FORMAT(A.INPUTDATE, '%Y-%m-%d')         AS date
            FROM voc_tbl A
            WHERE A.VC_IDX = :id",
            [':id' => $id]
        );
    }

    public function findPrev(int $id): array|false
    {
        return $this->selectOne(
            "SELECT VC_IDX AS id, VC_TITLE AS title
             FROM voc_tbl
             WHERE VC_IDX < :id
             ORDER BY VC_IDX DESC LIMIT 1",
            [':id' => $id]
        );
    }

    public function findNext(int $id): array|false
    {
        return $this->selectOne(
            "SELECT VC_IDX AS id, VC_TITLE AS title
             FROM voc_tbl
             WHERE VC_IDX > :id
             ORDER BY VC_IDX ASC LIMIT 1",
            [':id' => $id]
        );
    }

    // ──────────────────────────────────────────────────────────────
    // CRUD
    // ──────────────────────────────────────────────────────────────

    public function create(
        string $category,
        string $title,
        string $content,
        string $name,
        string $phone,
        string $password = ''
    ): int {
        $nextId = (int)$this->selectScalar(
            'SELECT COALESCE(MAX(VC_IDX), 0) + 1 FROM voc_tbl'
        );
        $this->execute(
            "INSERT INTO voc_tbl
                (VC_IDX, VC_CD, VC_TITLE, VC_CONT,
                 VC_NAME, VC_PHONE, VC_PWD,
                 VC_VIEW, VC_DEL_YN, INPUTDATE)
             VALUES
                (:vc_idx, :category, :title, :content,
                 :name, :phone, :password,
                 0, 'N', NOW())",
            [
                ':vc_idx'    => $nextId,
                ':category'  => $category,
                ':title'     => $title,
                ':content'   => $content,
                ':name'      => $name,
                ':phone'     => $phone,
                ':password'  => $this->hashPassword($password),
            ]
        );
        return $nextId;
    }

    public function incrementViewCount(int $id): void
    {
        $this->execute(
            'UPDATE voc_tbl SET VC_VIEW = VC_VIEW + 1 WHERE VC_IDX = :id',
            [':id' => $id]
        );
    }

    public function softDelete(int $id): bool
    {
        return $this->execute(
            'DELETE FROM voc_tbl WHERE VC_IDX = :id',
            [':id' => $id]
        ) > 0;
    }

    public function update(int $id, string $password, string $category, string $title, string $content, string $name, string $phone): bool
    {
        return $this->execute(
            "UPDATE voc_tbl
             SET VC_CD = :category, VC_TITLE = :title, VC_CONT = :content,
                 VC_NAME = :name, VC_PHONE = :phone, UPDATEDATE = NOW()
             WHERE VC_IDX = :id AND VC_PWD = :password",
            [
                ':category' => $category,
                ':title'    => $title,
                ':content'  => $content,
                ':name'     => $name,
                ':phone'    => $phone,
                ':id'       => $id,
                ':password' => $this->hashPassword($password),
            ]
        ) > 0;
    }

    public function userDelete(int $id, string $password): bool
    {
        return $this->execute(
            'DELETE FROM voc_tbl WHERE VC_IDX = :id AND VC_PWD = :password',
            [':id' => $id, ':password' => $this->hashPassword($password)]
        ) > 0;
    }

    public function saveReply(int $id, string $content, string $replyId): bool
    {
        return $this->execute(
            "UPDATE voc_tbl SET VC_RE_CONT = :content, VC_RE_ID = :reply_id, REPDATE = NOW(), UPDATEDATE = NOW()
             WHERE VC_IDX = :id",
            [':content' => $content, ':reply_id' => $replyId, ':id' => $id]
        ) > 0;
    }

    // ──────────────────────────────────────────────────────────────
    // 첨부파일
    // ──────────────────────────────────────────────────────────────

    public function saveFile(int $vcIdx, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): void
    {
        $this->execute(
            'INSERT INTO voc_file (voc_id, ori_name, save_name, file_path, file_size, file_ext)
             VALUES (:voc_id, :ori_name, :save_name, :file_path, :file_size, :file_ext)',
            [
                ':voc_id'    => $vcIdx,
                ':ori_name'  => $oriName,
                ':save_name' => $saveName,
                ':file_path' => $filePath,
                ':file_size' => $fileSize,
                ':file_ext'  => $fileExt,
            ]
        );
    }

    public function findFiles(int $vcIdx): array
    {
        try {
            $rows = $this->select(
                "SELECT id, ori_name, save_name, file_size, file_ext
                 FROM voc_file
                 WHERE voc_id = :voc_id
                 ORDER BY id ASC",
                [':voc_id' => $vcIdx]
            );
            $uploadUrl = rtrim(Env::get('UPLOAD_URL_VOICE', '/uploads/voice/'), '/') . '/';
            foreach ($rows as &$row) {
                $row['file_url'] = $uploadUrl . $row['save_name'];
            }
            return $rows;
        } catch (\PDOException $e) {
            error_log('VoiceRepository::findFiles error: ' . $e->getMessage());
            return [];
        }
    }

    public function findFilePathsByVcIdx(int $vcIdx): array
    {
        $rows = $this->select(
            'SELECT id, file_path FROM voc_file WHERE voc_id = :voc_id',
            [':voc_id' => $vcIdx]
        );
        return array_column($rows ?: [], 'file_path');
    }

    public function findFilePath(int $fileId): string|false
    {
        $row = $this->selectOne('SELECT file_path FROM voc_file WHERE id = :id', [':id' => $fileId]);
        return $row ? (string)$row['file_path'] : false;
    }

    public function deleteFile(int $fileId): bool
    {
        return $this->execute('DELETE FROM voc_file WHERE id = :id', [':id' => $fileId]) > 0;
    }

    public function deleteFilesByVcIdx(int $vcIdx): void
    {
        $this->execute('DELETE FROM voc_file WHERE voc_id = :voc_id', [':voc_id' => $vcIdx]);
    }

    // ──────────────────────────────────────────────────────────────
    // Private helpers
    // ──────────────────────────────────────────────────────────────

    // ──────────────────────────────────────────────────────────────
    // 내 접수 내역 (이름 + 비밀번호)
    // ──────────────────────────────────────────────────────────────

    public function countMyList(string $name, string $password, string $keyword, string $type): int
    {
        [$where, $params] = $this->buildMyWhere($name, $password, $keyword, $type);
        return (int)$this->selectScalar(
            "SELECT COUNT(*) FROM voc_tbl A $where",
            $params
        );
    }

    public function findMyList(string $name, string $password, string $keyword, string $type, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildMyWhere($name, $password, $keyword, $type);

        $sql = "
            SELECT
                A.VC_IDX                                     AS id,
                A.VC_CD                                      AS category,
                A.VC_TITLE                                   AS title,
                A.VC_NAME                                    AS name,
                CAST(A.VC_VIEW AS UNSIGNED)                  AS view_count,
                IF(A.VC_RE_CONT IS NOT NULL AND A.VC_RE_CONT != '', '답변완료', '답변대기') AS status,
                DATE_FORMAT(A.INPUTDATE, '%Y-%m-%d')         AS date
            FROM voc_tbl A
            $where
            ORDER BY A.VC_IDX DESC
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

    // ──────────────────────────────────────────────────────────────
    // private helpers
    // ──────────────────────────────────────────────────────────────

    private function buildWhere(array $cond): array
    {
        $where  = 'WHERE A.VC_DEL_YN = \'N\'';
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
            if ($type === 'A.VC_TITLE') {
                $where .= ' AND A.VC_TITLE LIKE :keyword';
            } elseif ($type === 'A.VC_CONT') {
                $where .= ' AND A.VC_CONT LIKE :keyword';
            } elseif ($type === 'A.VC_NAME') {
                $where .= ' AND A.VC_NAME LIKE :keyword';
            } else {
                $where .= ' AND (A.VC_TITLE LIKE :keyword OR A.VC_CONT LIKE :keyword_content)';
            }
            $params[':keyword'] = $like;
            if ($type !== 'A.VC_TITLE' && $type !== 'A.VC_CONT' && $type !== 'A.VC_NAME') {
                $params[':keyword_content'] = $like;
            }
        }

        return [$where, $params];
    }

    private function buildMyWhere(string $name, string $password, string $keyword, string $type): array
    {
        $where  = 'WHERE A.VC_NAME = :name AND A.VC_PWD = :password';
        $params = [':name' => $name, ':password' => $this->hashPassword($password)];

        if ($keyword !== '') {
            $like = '%' . $keyword . '%';
            if ($type === 'title') {
                $where .= ' AND A.VC_TITLE LIKE :keyword';
            } elseif ($type === 'content') {
                $where .= ' AND A.VC_CONT LIKE :keyword';
            } else {
                $where .= ' AND (A.VC_TITLE LIKE :keyword OR A.VC_CONT LIKE :keyword_content)';
            }
            $params[':keyword'] = $like;
            if ($type !== 'title' && $type !== 'content') {
                $params[':keyword_content'] = $like;
            }
        }

        return [$where, $params];
    }
}

