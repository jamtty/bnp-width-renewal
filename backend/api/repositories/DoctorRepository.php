<?php
/**
 * 의료진 Repository
 * 테이블: doctor_tbl (의료진), doctor_file_tbl (이미지)
 */
class DoctorRepository extends BaseRepository
{
    public function countList(string $deptCode, string $keyword, string $useYn): int
    {
        [$where, $params] = $this->buildWhere($deptCode, $keyword, $useYn);
        return (int)$this->selectScalar("SELECT COUNT(*) FROM doctor_tbl $where", $params);
    }

    public function findList(string $deptCode, string $keyword, string $useYn, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildWhere($deptCode, $keyword, $useYn);
        $params[':limit']  = $limit;
        $params[':offset'] = $offset;
        return $this->select(
            "SELECT DOC_IDX AS id, DEPT_CODE AS dept_code,
                    CAST(COALESCE(DEPT_CODES, JSON_ARRAY(DEPT_CODE)) AS CHAR) AS dept_codes,
                    DOC_NAME AS doc_name, DOC_TITLE AS doc_title,
                    DOC_MAJOR AS doc_major, DOC_SPECIALTY AS doc_specialty,
                    DOC_CAREER AS doc_career, CAREER_LABEL AS career_label,
                    SCHEDULE_JSON AS schedule_json,
                    DOC_USE_YN AS use_yn,
                    CAST(DOC_SORT_ORDER AS UNSIGNED) AS sort_order,
                    IN_MEM_ID AS created_by,
                    DATE_FORMAT(INPUTDATE, '%Y-%m-%d') AS created_at
             FROM doctor_tbl
             $where
             ORDER BY DEPT_CODE ASC, DOC_SORT_ORDER ASC, DOC_IDX ASC
             LIMIT :limit OFFSET :offset",
            $params
        );
    }

    public function findOne(int $id): array|false
    {
        return $this->selectOne(
            "SELECT DOC_IDX AS id, DEPT_CODE AS dept_code,
                    CAST(COALESCE(DEPT_CODES, JSON_ARRAY(DEPT_CODE)) AS CHAR) AS dept_codes,
                    DOC_NAME AS doc_name, DOC_TITLE AS doc_title,
                    DOC_MAJOR AS doc_major, DOC_SPECIALTY AS doc_specialty,
                    DOC_CAREER AS doc_career, CAREER_LABEL AS career_label,
                    SCHEDULE_JSON AS schedule_json,
                    DOC_USE_YN AS use_yn,
                    CAST(DOC_SORT_ORDER AS UNSIGNED) AS sort_order,
                    IN_MEM_ID AS created_by,
                    DATE_FORMAT(INPUTDATE,   '%Y-%m-%d')       AS created_at,
                    UP_MEM_ID AS updated_by,
                    DATE_FORMAT(UPDATEDATE, '%Y-%m-%d %H:%i') AS updated_at
             FROM doctor_tbl
             WHERE DOC_IDX = :id",
            [':id' => $id]
        );
    }

    public function findByDept(string $deptCode): array
    {
        return $this->select(
            "SELECT DOC_IDX AS id, DEPT_CODE AS dept_code,
                    CAST(COALESCE(DEPT_CODES, JSON_ARRAY(DEPT_CODE)) AS CHAR) AS dept_codes,
                    DOC_NAME AS doc_name, DOC_TITLE AS doc_title,
                    DOC_MAJOR AS doc_major, DOC_SPECIALTY AS doc_specialty,
                    DOC_CAREER AS doc_career, CAREER_LABEL AS career_label,
                    SCHEDULE_JSON AS schedule_json,
                    DOC_USE_YN AS use_yn,
                    CAST(DOC_SORT_ORDER AS UNSIGNED) AS sort_order
             FROM doctor_tbl
             WHERE JSON_CONTAINS(
                       COALESCE(DEPT_CODES, JSON_ARRAY(DEPT_CODE)),
                       JSON_QUOTE(:dept_code)
                   )
               AND DOC_USE_YN = 'Y'
             ORDER BY DOC_SORT_ORDER ASC, DOC_IDX ASC",
            [':dept_code' => $deptCode]
        );
    }

    public function create(array $data): int
    {
        $nextId = (int)$this->selectScalar(
            'SELECT COALESCE(MAX(DOC_IDX), 0) + 1 FROM doctor_tbl'
        );
        $this->execute(
            "INSERT INTO doctor_tbl
             (DOC_IDX, DEPT_CODE, DEPT_CODES, DOC_NAME, DOC_TITLE, DOC_MAJOR,
              DOC_SPECIALTY, DOC_CAREER, CAREER_LABEL, SCHEDULE_JSON,
              DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE)
             VALUES
             (:id, :dept_code, :dept_codes, :doc_name, :doc_title, :doc_major,
              :doc_specialty, :doc_career, :career_label, :schedule_json,
              :use_yn, :sort_order, 'N', :created_by, NOW())",
            [
                ':id'            => $nextId,
                ':dept_code'     => $data['dept_code'],
                ':dept_codes'    => $data['dept_codes'],
                ':doc_name'      => $data['doc_name'],
                ':doc_title'     => $data['doc_title'],
                ':doc_major'     => $data['doc_major'],
                ':doc_specialty' => $data['doc_specialty'],
                ':doc_career'    => $data['doc_career'],
                ':career_label'  => $data['career_label'],
                ':schedule_json' => $data['schedule_json'],
                ':use_yn'        => $data['use_yn'],
                ':sort_order'    => $data['sort_order'],
                ':created_by'    => $data['created_by'],
            ]
        );
        return $nextId;
    }

    public function update(int $id, array $data): bool
    {
        return $this->execute(
            "UPDATE doctor_tbl SET
                DEPT_CODE     = :dept_code,
                DEPT_CODES    = :dept_codes,
                DOC_NAME      = :doc_name,
                DOC_TITLE     = :doc_title,
                DOC_MAJOR     = :doc_major,
                DOC_SPECIALTY = :doc_specialty,
                DOC_CAREER    = :doc_career,
                CAREER_LABEL  = :career_label,
                SCHEDULE_JSON = :schedule_json,
                DOC_USE_YN    = :use_yn,
                DOC_SORT_ORDER= :sort_order,
                UP_MEM_ID     = :updated_by,
                UPDATEDATE    = NOW()
             WHERE DOC_IDX = :id",
            [
                ':dept_code'     => $data['dept_code'],
                ':dept_codes'    => $data['dept_codes'],
                ':doc_name'      => $data['doc_name'],
                ':doc_title'     => $data['doc_title'],
                ':doc_major'     => $data['doc_major'],
                ':doc_specialty' => $data['doc_specialty'],
                ':doc_career'    => $data['doc_career'],
                ':career_label'  => $data['career_label'],
                ':schedule_json' => $data['schedule_json'],
                ':use_yn'        => $data['use_yn'],
                ':sort_order'    => $data['sort_order'],
                ':updated_by'    => $data['updated_by'],
                ':id'            => $id,
            ]
        ) > 0;
    }

    public function delete(int $id): bool
    {
        $this->execute(
            'DELETE FROM doctor_file_tbl WHERE DOC_IDX = :id',
            [':id' => $id]
        );
        return $this->execute(
            'DELETE FROM doctor_tbl WHERE DOC_IDX = :id',
            [':id' => $id]
        ) > 0;
    }

    public function updateUseYn(int $id, string $useYn): bool
    {
        return $this->execute(
            "UPDATE doctor_tbl SET DOC_USE_YN = :use_yn WHERE DOC_IDX = :id",
            [':use_yn' => $useYn, ':id' => $id]
        ) > 0;
    }

    public function updateSortOrder(int $id, int $sortOrder): bool
    {
        return $this->execute(
            "UPDATE doctor_tbl SET DOC_SORT_ORDER = :sort_order WHERE DOC_IDX = :id",
            [':sort_order' => $sortOrder, ':id' => $id]
        ) > 0;
    }

    // ── 파일 관련 ─────────────────────────────────────────────

    public function findFile(int $docId): array|false
    {
        $row = $this->selectOne(
            "SELECT FILE_IDX AS file_id, ORI_NAME AS ori_name, SAVE_NAME AS save_name
             FROM doctor_file_tbl
             WHERE DOC_IDX = :doc_id
             ORDER BY FILE_IDX DESC LIMIT 1",
            [':doc_id' => $docId]
        );
        if (!$row) return false;

        $uploadUrl = rtrim(Env::get('UPLOAD_URL_DOCTOR', '/uploads/doctor/'), '/') . '/';
        $row['file_url'] = $uploadUrl . $row['save_name'];
        return $row;
    }

    public function saveFile(int $docId, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): int
    {
        $nextId = (int)$this->selectScalar(
            'SELECT COALESCE(MAX(FILE_IDX), 0) + 1 FROM doctor_file_tbl'
        );
        $this->execute(
            "INSERT INTO doctor_file_tbl
             (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE)
             VALUES (:file_id, :doc_id, :ori, :save, :path, :size, :ext, NOW())",
            [
                ':file_id' => $nextId,
                ':doc_id'  => $docId,
                ':ori'     => $oriName,
                ':save'    => $saveName,
                ':path'    => $filePath,
                ':size'    => $fileSize,
                ':ext'     => $fileExt,
            ]
        );
        return $nextId;
    }

    public function deleteFile(int $docId): void
    {
        $this->execute(
            "DELETE FROM doctor_file_tbl WHERE DOC_IDX = :doc_id",
            [':doc_id' => $docId]
        );
    }

    // ── private helpers ───────────────────────────────────────

    private function buildWhere(string $deptCode, string $keyword, string $useYn): array
    {
        $where  = 'WHERE 1=1';
        $params = [];

        $deptNameCase = "CASE DEPT_CODE
            WHEN 'hpcenter' THEN '건강증진센터'
            WHEN 'internal' THEN '내과'
            WHEN 'cardiology' THEN '심장내과'
            WHEN 'respiratory' THEN '호흡기내과'
            WHEN 'gastroenterology' THEN '소화기내과'
            WHEN 'nephrology' THEN '신장내과'
            WHEN 'rheumatology' THEN '류마티스내과'
            WHEN 'neurology' THEN '신경과'
            WHEN 'surgery' THEN '외과'
            WHEN 'obstetrics' THEN '산부인과'
            WHEN 'orthopedics' THEN '정형외과'
            WHEN 'urology' THEN '비뇨의학과'
            WHEN 'painclinic' THEN '신경통증클리닉'
            WHEN 'anesthesiology' THEN '마취통증의학과'
            WHEN 'labmedicine' THEN '진단검사의학과'
            WHEN 'radiology' THEN '영상의학과'
            WHEN 'emergency' THEN '응급의학과'
            WHEN 'criticalcare' THEN '중환자의학과'
            ELSE DEPT_CODE
        END";

        if ($deptCode !== '') {
            $where .= ' AND JSON_CONTAINS(COALESCE(DEPT_CODES, JSON_ARRAY(DEPT_CODE)), JSON_QUOTE(:dept_code))';
            $params[':dept_code'] = $deptCode;
        }
        if ($useYn !== '') {
            $where .= ' AND DOC_USE_YN = :use_yn';
            $params[':use_yn'] = $useYn;
        }
        if ($keyword !== '') {
            $like = '%' . $keyword . '%';
            $where .= " AND (
                DOC_NAME LIKE :kw1
                OR DOC_TITLE LIKE :kw2
                OR DOC_MAJOR LIKE :kw3
                OR DOC_SPECIALTY LIKE :kw4
                OR DOC_CAREER LIKE :kw5
                OR CAREER_LABEL LIKE :kw6
                OR $deptNameCase LIKE :kw7
                OR DEPT_CODE LIKE :kw8
            )";
            $params[':kw1'] = $like;
            $params[':kw2'] = $like;
            $params[':kw3'] = $like;
            $params[':kw4'] = $like;
            $params[':kw5'] = $like;
            $params[':kw6'] = $like;
            $params[':kw7'] = $like;
            $params[':kw8'] = $like;
        }

        return [$where, $params];
    }
}
