<?php
/**
 * 건강증진센터 파일 관리 Repository
 * 테이블: well_file_tbl
 */
class WellFileRepository extends BaseRepository
{
    public function findAll(): array
    {
        return $this->select(
            "SELECT WF_IDX      AS id,
                    WF_MENU_KEY AS menu_key,
                    WF_LABEL    AS label,
                    WF_ORI_NAME AS ori_name,
                    WF_SAVE_NAME AS save_name,
                    WF_FILE_PATH AS file_path,
                    WF_FILE_SIZE AS file_size,
                    WF_FILE_EXT  AS file_ext,
                    WF_USE_YN   AS use_yn,
                    IN_MEM_ID   AS created_by,
                    DATE_FORMAT(INPUTDATE, '%Y-%m-%d %H:%i') AS created_at,
                    UP_MEM_ID   AS updated_by,
                    DATE_FORMAT(UPDATEDATE, '%Y-%m-%d %H:%i') AS updated_at
             FROM well_file_tbl
             WHERE WF_DEL_YN = 'N'
             ORDER BY WF_IDX ASC"
        );
    }

    public function findOne(int $id): array|false
    {
        return $this->selectOne(
            "SELECT WF_IDX       AS id,
                    WF_MENU_KEY  AS menu_key,
                    WF_LABEL     AS label,
                    WF_ORI_NAME  AS ori_name,
                    WF_SAVE_NAME AS save_name,
                    WF_FILE_PATH AS file_path,
                    WF_FILE_SIZE AS file_size,
                    WF_FILE_EXT  AS file_ext,
                    WF_USE_YN    AS use_yn,
                    IN_MEM_ID    AS created_by,
                    DATE_FORMAT(INPUTDATE,  '%Y-%m-%d %H:%i') AS created_at,
                    UP_MEM_ID    AS updated_by,
                    DATE_FORMAT(UPDATEDATE, '%Y-%m-%d %H:%i') AS updated_at
             FROM well_file_tbl
             WHERE WF_IDX = :id AND WF_DEL_YN = 'N'",
            [':id' => $id]
        );
    }

    /** 메뉴 키로 활성 파일 조회 (공개용) */
    public function findByMenuKey(string $menuKey): array|false
    {
        return $this->selectOne(
            "SELECT WF_IDX       AS id,
                    WF_MENU_KEY  AS menu_key,
                    WF_LABEL     AS label,
                    WF_ORI_NAME  AS ori_name,
                    WF_SAVE_NAME AS save_name,
                    WF_FILE_PATH AS file_path,
                    WF_FILE_EXT  AS file_ext
             FROM well_file_tbl
             WHERE WF_MENU_KEY = :menu_key
               AND WF_DEL_YN = 'N'
               AND WF_USE_YN = 'Y'
             ORDER BY WF_IDX DESC
             LIMIT 1",
            [':menu_key' => $menuKey]
        );
    }

    public function update(int $id, array $data): bool
    {
        return $this->execute(
            "UPDATE well_file_tbl SET
                WF_LABEL     = :label,
                WF_USE_YN    = :use_yn,
                UP_MEM_ID    = :updated_by,
                UPDATEDATE   = NOW()
             WHERE WF_IDX = :id",
            [
                ':label'      => $data['label'],
                ':use_yn'     => $data['use_yn'],
                ':updated_by' => $data['updated_by'],
                ':id'         => $id,
            ]
        ) >= 0;
    }

    public function updateFile(int $id, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt, string $updatedBy): bool
    {
        return $this->execute(
            "UPDATE well_file_tbl SET
                WF_ORI_NAME  = :ori_name,
                WF_SAVE_NAME = :save_name,
                WF_FILE_PATH = :file_path,
                WF_FILE_SIZE = :file_size,
                WF_FILE_EXT  = :file_ext,
                UP_MEM_ID    = :updated_by,
                UPDATEDATE   = NOW()
             WHERE WF_IDX = :id",
            [
                ':ori_name'   => $oriName,
                ':save_name'  => $saveName,
                ':file_path'  => $filePath,
                ':file_size'  => $fileSize,
                ':file_ext'   => $fileExt,
                ':updated_by' => $updatedBy,
                ':id'         => $id,
            ]
        ) > 0;
    }

    /** 파일 경로에서 save_name 만 삭제 처리 */
    public function clearFile(int $id, string $updatedBy): bool
    {
        return $this->execute(
            "UPDATE well_file_tbl SET
                WF_ORI_NAME  = '',
                WF_SAVE_NAME = '',
                WF_FILE_PATH = '',
                WF_FILE_SIZE = 0,
                WF_FILE_EXT  = '',
                UP_MEM_ID    = :updated_by,
                UPDATEDATE   = NOW()
             WHERE WF_IDX = :id",
            [':updated_by' => $updatedBy, ':id' => $id]
        ) > 0;
    }
}
