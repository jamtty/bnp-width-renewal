<?php
/**
 * 구비서류 파일 관리 Repository
 * 테이블: cert_doc_tbl
 */
class CertDocRepository extends BaseRepository
{
    public function findAll(): array
    {
        return $this->select(
            "SELECT CD_IDX        AS id,
                    CD_TITLE      AS title,
                    CD_ORI_NAME   AS ori_name,
                    CD_SAVE_NAME  AS save_name,
                    CD_FILE_PATH  AS file_path,
                    CD_FILE_SIZE  AS file_size,
                    CD_FILE_EXT   AS file_ext,
                    CD_SORT_ORDER AS sort_order,
                    CD_USE_YN     AS use_yn,
                    IN_MEM_ID     AS created_by,
                    DATE_FORMAT(INPUTDATE,  '%Y-%m-%d %H:%i') AS created_at,
                    UP_MEM_ID     AS updated_by,
                    DATE_FORMAT(UPDATEDATE, '%Y-%m-%d %H:%i') AS updated_at
             FROM cert_doc_tbl
             WHERE CD_DEL_YN = 'N'
             ORDER BY CD_SORT_ORDER ASC, CD_IDX ASC"
        );
    }

    public function findPublic(): array
    {
        return $this->select(
            "SELECT CD_IDX        AS id,
                    CD_TITLE      AS title,
                    CD_ORI_NAME   AS ori_name,
                    CD_SAVE_NAME  AS save_name,
                    CD_FILE_SIZE  AS file_size,
                    CD_FILE_EXT   AS file_ext
             FROM cert_doc_tbl
             WHERE CD_DEL_YN = 'N'
               AND CD_USE_YN = 'Y'
               AND CD_ORI_NAME != ''
             ORDER BY CD_SORT_ORDER ASC, CD_IDX ASC"
        );
    }

    public function findOne(int $id): array|false
    {
        return $this->selectOne(
            "SELECT CD_IDX        AS id,
                    CD_TITLE      AS title,
                    CD_ORI_NAME   AS ori_name,
                    CD_SAVE_NAME  AS save_name,
                    CD_FILE_PATH  AS file_path,
                    CD_FILE_SIZE  AS file_size,
                    CD_FILE_EXT   AS file_ext,
                    CD_SORT_ORDER AS sort_order,
                    CD_USE_YN     AS use_yn,
                    IN_MEM_ID     AS created_by,
                    DATE_FORMAT(INPUTDATE,  '%Y-%m-%d %H:%i') AS created_at,
                    UP_MEM_ID     AS updated_by,
                    DATE_FORMAT(UPDATEDATE, '%Y-%m-%d %H:%i') AS updated_at
             FROM cert_doc_tbl
             WHERE CD_IDX = :id AND CD_DEL_YN = 'N'",
            [':id' => $id]
        );
    }

    public function create(array $data): int
    {
        $this->execute(
            "INSERT INTO cert_doc_tbl
             (CD_TITLE, CD_ORI_NAME, CD_SAVE_NAME, CD_FILE_PATH, CD_FILE_SIZE, CD_FILE_EXT, CD_SORT_ORDER, CD_USE_YN, IN_MEM_ID, INPUTDATE)
             VALUES (:title, :ori_name, :save_name, :file_path, :file_size, :file_ext, :sort_order, :use_yn, :created_by, NOW())",
            [
                ':title'      => $data['title'],
                ':ori_name'   => $data['ori_name']  ?? '',
                ':save_name'  => $data['save_name'] ?? '',
                ':file_path'  => $data['file_path'] ?? '',
                ':file_size'  => $data['file_size'] ?? 0,
                ':file_ext'   => $data['file_ext']  ?? '',
                ':sort_order' => $data['sort_order'] ?? 0,
                ':use_yn'     => $data['use_yn'] ?? 'Y',
                ':created_by' => $data['created_by'],
            ]
        );
        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        return $this->execute(
            "UPDATE cert_doc_tbl SET
                CD_TITLE      = :title,
                CD_SORT_ORDER = :sort_order,
                CD_USE_YN     = :use_yn,
                UP_MEM_ID     = :updated_by,
                UPDATEDATE    = NOW()
             WHERE CD_IDX = :id",
            [
                ':title'      => $data['title'],
                ':sort_order' => $data['sort_order'] ?? 0,
                ':use_yn'     => $data['use_yn'],
                ':updated_by' => $data['updated_by'],
                ':id'         => $id,
            ]
        );
    }

    public function updateFile(int $id, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt, string $updatedBy): bool
    {
        return $this->execute(
            "UPDATE cert_doc_tbl SET
                CD_ORI_NAME  = :ori_name,
                CD_SAVE_NAME = :save_name,
                CD_FILE_PATH = :file_path,
                CD_FILE_SIZE = :file_size,
                CD_FILE_EXT  = :file_ext,
                UP_MEM_ID    = :updated_by,
                UPDATEDATE   = NOW()
             WHERE CD_IDX = :id",
            [
                ':ori_name'   => $oriName,
                ':save_name'  => $saveName,
                ':file_path'  => $filePath,
                ':file_size'  => $fileSize,
                ':file_ext'   => $fileExt,
                ':updated_by' => $updatedBy,
                ':id'         => $id,
            ]
        );
    }

    public function clearFile(int $id, string $updatedBy): bool
    {
        return $this->execute(
            "UPDATE cert_doc_tbl SET
                CD_ORI_NAME  = '',
                CD_SAVE_NAME = '',
                CD_FILE_PATH = '',
                CD_FILE_SIZE = 0,
                CD_FILE_EXT  = '',
                UP_MEM_ID    = :updated_by,
                UPDATEDATE   = NOW()
             WHERE CD_IDX = :id",
            [':updated_by' => $updatedBy, ':id' => $id]
        );
    }

    public function delete(int $id, string $updatedBy): bool
    {
        return $this->execute(
            "UPDATE cert_doc_tbl SET
                CD_DEL_YN  = 'Y',
                UP_MEM_ID  = :updated_by,
                UPDATEDATE = NOW()
             WHERE CD_IDX = :id",
            [':updated_by' => $updatedBy, ':id' => $id]
        );
    }
}
