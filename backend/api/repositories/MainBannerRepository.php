<?php
/**
 * 메인 배너 Repository
 * 테이블: main_banner_tbl, main_banner_file
 */
class MainBannerRepository extends BaseRepository
{
    public function countList(string $keyword, string $useYn): int
    {
        [$where, $params] = $this->buildWhere($keyword, $useYn);
        return (int)$this->selectScalar("SELECT COUNT(*) FROM main_banner_tbl $where", $params);
    }

    public function findList(string $keyword, string $useYn, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildWhere($keyword, $useYn);
        $params[':limit']  = $limit;
        $params[':offset'] = $offset;
        return $this->select(
            "SELECT BN_IDX AS id,
                    BN_LINK AS url,
                    CASE BN_LINK_TARGET WHEN 'B' THEN '_blank' ELSE '_self' END AS link_target,
                    BN_USE_YN AS use_yn,
                    CAST(BN_ORD AS UNSIGNED) AS sort_order,
                    IN_MEM_ID AS created_by,
                    DATE_FORMAT(INPUTDATE, '%Y-%m-%d') AS created_at
             FROM main_banner_tbl
             $where
             ORDER BY BN_ORD ASC, BN_IDX DESC
             LIMIT :limit OFFSET :offset",
            $params
        );
    }

    public function findOne(int $id): array|false
    {
        return $this->selectOne(
            "SELECT BN_IDX AS id,
                    BN_LINK AS url,
                    CASE BN_LINK_TARGET WHEN 'B' THEN '_blank' ELSE '_self' END AS link_target,
                    BN_USE_YN AS use_yn,
                    CAST(BN_ORD AS UNSIGNED) AS sort_order,
                    IN_MEM_ID AS created_by,
                    DATE_FORMAT(INPUTDATE,  '%Y-%m-%d')        AS created_at,
                    UP_MEM_ID AS updated_by,
                    DATE_FORMAT(UPDATEDATE, '%Y-%m-%d %H:%i') AS updated_at
             FROM main_banner_tbl
             WHERE BN_IDX = :id AND BN_DEL_YN = 'N'",
            [':id' => $id]
        );
    }

    /** 공개용 (use_yn = Y) */
    public function findActive(): array
    {
        return $this->select(
            "SELECT BN_IDX AS id,
                    BN_LINK AS url,
                    CASE BN_LINK_TARGET WHEN 'B' THEN '_blank' ELSE '_self' END AS link_target,
                    BN_USE_YN AS use_yn,
                    CAST(BN_ORD AS UNSIGNED) AS sort_order
             FROM main_banner_tbl
             WHERE BN_DEL_YN = 'N' AND BN_USE_YN = 'Y'
             ORDER BY BN_ORD ASC, BN_IDX DESC"
        );
    }

    public function create(array $data): int
    {
        $nextId = (int)$this->selectScalar(
            'SELECT COALESCE(MAX(BN_IDX), 0) + 1 FROM main_banner_tbl'
        );
        $this->execute(
            "INSERT INTO main_banner_tbl
             (BN_IDX, BN_LINK, BN_LINK_TARGET, BN_USE_YN, BN_ORD,
              IN_MEM_ID, BN_DEL_YN, INPUTDATE)
             VALUES
             (:bn_idx, :url, :link_target, :use_yn, :sort_order,
              :created_by, 'N', NOW())",
            [
                ':bn_idx'      => $nextId,
                ':url'         => $data['url'],
                ':link_target' => $data['link_target'],
                ':use_yn'      => $data['use_yn'],
                ':sort_order'  => $data['sort_order'],
                ':created_by'  => $data['created_by'],
            ]
        );
        return $nextId;
    }

    public function update(int $id, array $data): bool
    {
        return $this->execute(
            "UPDATE main_banner_tbl SET
                BN_LINK        = :url,
                BN_LINK_TARGET = :link_target,
                BN_USE_YN      = :use_yn,
                BN_ORD         = :sort_order,
                UP_MEM_ID      = :updated_by,
                UPDATEDATE     = NOW()
             WHERE BN_IDX = :id",
            [
                ':url'         => $data['url'],
                ':link_target' => $data['link_target'],
                ':use_yn'      => $data['use_yn'],
                ':sort_order'  => $data['sort_order'],
                ':updated_by'  => $data['updated_by'],
                ':id'          => $id,
            ]
        ) > 0;
    }

    public function delete(int $id): bool
    {
        return $this->execute(
            "UPDATE main_banner_tbl SET BN_DEL_YN = 'Y', DELDATE = NOW() WHERE BN_IDX = :id",
            [':id' => $id]
        ) > 0;
    }

    public function updateUseYn(int $id, string $useYn): bool
    {
        return $this->execute(
            "UPDATE main_banner_tbl SET BN_USE_YN = :use_yn WHERE BN_IDX = :id",
            [':use_yn' => $useYn, ':id' => $id]
        ) > 0;
    }

    public function updateSortOrder(int $id, int $sortOrder): bool
    {
        return $this->execute(
            "UPDATE main_banner_tbl SET BN_ORD = :sort_order WHERE BN_IDX = :id",
            [':sort_order' => $sortOrder, ':id' => $id]
        ) > 0;
    }

    // ── main_banner_file ──────────────────────────────────────────

    public function findFile(int $bnId): array|false
    {
        $row = $this->selectOne(
            'SELECT ori_name, save_name FROM main_banner_file WHERE bn_id = :bn_id LIMIT 1',
            [':bn_id' => $bnId]
        );
        if (!$row) return false;

        $uploadUrl = rtrim(Env::get('UPLOAD_URL_MAIN_BANNER', '/uploads/main_banner/'), '/') . '/';
        $row['file_url'] = $uploadUrl . $row['save_name'];
        return $row;
    }

    public function saveFile(int $bnId, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): void
    {
        $this->deleteFile($bnId);
        $this->execute(
            'INSERT INTO main_banner_file (bn_id, ori_name, save_name, file_path, file_size, file_ext)
             VALUES (:bn_id, :ori_name, :save_name, :file_path, :file_size, :file_ext)',
            [
                ':bn_id'     => $bnId,
                ':ori_name'  => $oriName,
                ':save_name' => $saveName,
                ':file_path' => $filePath,
                ':file_size' => $fileSize,
                ':file_ext'  => $fileExt,
            ]
        );
    }

    public function deleteFile(int $bnId): void
    {
        $this->execute('DELETE FROM main_banner_file WHERE bn_id = :bn_id', [':bn_id' => $bnId]);
    }

    private function buildWhere(string $keyword, string $useYn): array
    {
        $conds  = ["BN_DEL_YN = 'N'"];
        $params = [];
        if ($useYn !== '') {
            $conds[]           = 'BN_USE_YN = :use_yn';
            $params[':use_yn'] = $useYn;
        }
        return ['WHERE ' . implode(' AND ', $conds), $params];
    }
}
