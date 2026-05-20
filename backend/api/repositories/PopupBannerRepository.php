<?php
/**
 * 팝업 배너 Repository
 * 실제 테이블: popup_tbl (배너), popup_file (이미지 첨부)
 */
class PopupBannerRepository extends BaseRepository
{
    public function countList(string $site, string $keyword, string $dateFrom, string $dateTo): int
    {
        [$where, $params] = $this->buildWhere($site, $keyword, $dateFrom, $dateTo);
        return (int)$this->selectScalar("SELECT COUNT(*) FROM popup_tbl $where", $params);
    }

    public function findList(string $site, string $keyword, string $dateFrom, string $dateTo, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildWhere($site, $keyword, $dateFrom, $dateTo);
        $params[':limit']  = $limit;
        $params[':offset'] = $offset;
        return $this->select(
            "SELECT BN_IDX AS id, SITE_ID AS site, BN_TITLE AS admin_title,
                    BN_LINK AS url,
                    CASE BN_LINK_TARGET WHEN 'B' THEN '_blank' ELSE '_self' END AS link_target,
                    BN_S_DATE AS period_start, BN_E_DATE AS period_end,
                    BN_WRITER AS author, BN_USE_YN AS use_yn,
                    CAST(BN_WIDTH  AS UNSIGNED) AS img_width,
                    CAST(BN_HEIGHT AS UNSIGNED) AS img_height,
                    CAST(BN_LEFT   AS UNSIGNED) AS img_pos_left,
                    CAST(BN_TOP    AS UNSIGNED) AS img_pos_top,
                    CAST(BN_ORD    AS UNSIGNED) AS sort_order,
                    IN_MEM_ID AS created_by,
                    DATE_FORMAT(INPUTDATE, '%Y-%m-%d') AS created_at
             FROM popup_tbl
             $where
             ORDER BY BN_ORD ASC, BN_IDX DESC
             LIMIT :limit OFFSET :offset",
            $params
        );
    }

    public function findOne(int $id): array|false
    {
        return $this->selectOne(
            "SELECT BN_IDX AS id, SITE_ID AS site, BN_TITLE AS admin_title,
                    BN_LINK AS url,
                    CASE BN_LINK_TARGET WHEN 'B' THEN '_blank' ELSE '_self' END AS link_target,
                    BN_S_DATE AS period_start, BN_E_DATE AS period_end,
                    BN_WRITER AS author, BN_USE_YN AS use_yn,
                    CAST(BN_WIDTH  AS UNSIGNED) AS img_width,
                    CAST(BN_HEIGHT AS UNSIGNED) AS img_height,
                    CAST(BN_LEFT   AS UNSIGNED) AS img_pos_left,
                    CAST(BN_TOP    AS UNSIGNED) AS img_pos_top,
                    CAST(BN_ORD    AS UNSIGNED) AS sort_order,
                    IN_MEM_ID AS created_by,
                    DATE_FORMAT(INPUTDATE,   '%Y-%m-%d')       AS created_at,
                    UP_MEM_ID AS updated_by,
                    DATE_FORMAT(UPDATEDATE, '%Y-%m-%d %H:%i') AS updated_at
             FROM popup_tbl
             WHERE BN_IDX = :id AND BN_DEL_YN = 'N'",
            [':id' => $id]
        );
    }

    public function create(array $data): int
    {
        $nextId = (int)$this->selectScalar(
            'SELECT COALESCE(MAX(BN_IDX), 0) + 1 FROM popup_tbl'
        );
        $this->execute(
            "INSERT INTO popup_tbl
             (BN_IDX, SITE_ID, BN_TITLE, BN_LINK, BN_LINK_TARGET,
              BN_S_DATE, BN_E_DATE, BN_WRITER, BN_USE_YN,
              BN_WIDTH, BN_HEIGHT, BN_LEFT, BN_TOP, BN_ORD,
              IN_MEM_ID, BN_DEL_YN, INPUTDATE)
             VALUES
             (:bn_idx, :site, :admin_title, :url, :link_target,
              :period_start, :period_end, :author, :use_yn,
              :img_width, :img_height, :img_pos_left, :img_pos_top, :sort_order,
              :created_by, 'N', NOW())",
            [
                ':bn_idx'       => $nextId,
                ':site'         => $data['site'],
                ':admin_title'  => $data['admin_title'],
                ':url'          => $data['url'],
                ':link_target'  => $data['link_target'],
                ':period_start' => $data['period_start'],
                ':period_end'   => $data['period_end'],
                ':author'       => $data['author'],
                ':use_yn'       => $data['use_yn'],
                ':img_width'    => $data['img_width'],
                ':img_height'   => $data['img_height'],
                ':img_pos_left' => $data['img_pos_left'],
                ':img_pos_top'  => $data['img_pos_top'],
                ':sort_order'   => $data['sort_order'],
                ':created_by'   => $data['created_by'],
            ]
        );
        return $nextId;
    }

    public function update(int $id, array $data): bool
    {
        return $this->execute(
            "UPDATE popup_tbl SET
                SITE_ID        = :site,
                BN_TITLE       = :admin_title,
                BN_LINK        = :url,
                BN_LINK_TARGET = :link_target,
                BN_S_DATE      = :period_start,
                BN_E_DATE      = :period_end,
                BN_WRITER      = :author,
                BN_USE_YN      = :use_yn,
                BN_WIDTH       = :img_width,
                BN_HEIGHT      = :img_height,
                BN_LEFT        = :img_pos_left,
                BN_TOP         = :img_pos_top,
                BN_ORD         = :sort_order,
                UP_MEM_ID      = :updated_by,
                UPDATEDATE     = NOW()
             WHERE BN_IDX = :id",
            [
                ':site'         => $data['site'],
                ':admin_title'  => $data['admin_title'],
                ':url'          => $data['url'],
                ':link_target'  => $data['link_target'],
                ':period_start' => $data['period_start'],
                ':period_end'   => $data['period_end'],
                ':author'       => $data['author'],
                ':use_yn'       => $data['use_yn'],
                ':img_width'    => $data['img_width'],
                ':img_height'   => $data['img_height'],
                ':img_pos_left' => $data['img_pos_left'],
                ':img_pos_top'  => $data['img_pos_top'],
                ':sort_order'   => $data['sort_order'],
                ':updated_by'   => $data['updated_by'],
                ':id'           => $id,
            ]
        ) > 0;
    }

    public function delete(int $id): bool
    {
        return $this->execute(
            "UPDATE popup_tbl SET BN_DEL_YN = 'Y', DELDATE = NOW() WHERE BN_IDX = :id",
            [':id' => $id]
        ) > 0;
    }

    public function updateUseYn(int $id, string $useYn): bool
    {
        return $this->execute(
            "UPDATE popup_tbl SET BN_USE_YN = :use_yn WHERE BN_IDX = :id",
            [':use_yn' => $useYn, ':id' => $id]
        ) > 0;
    }

    public function updateSortOrder(int $id, int $sortOrder): bool
    {
        return $this->execute(
            "UPDATE popup_tbl SET BN_ORD = :sort_order WHERE BN_IDX = :id",
            [':sort_order' => $sortOrder, ':id' => $id]
        ) > 0;
    }

    // ─── popup_file 파일 처리 ──────────────────────────────────────

    public function saveFile(int $bnIdx, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): int
    {
        return (int)$this->insert(
            'INSERT INTO popup_file (voc_id, ori_name, save_name, file_path, file_size, file_ext)
             VALUES (:voc_id, :ori_name, :save_name, :file_path, :file_size, :file_ext)',
            [
                ':voc_id'    => $bnIdx,
                ':ori_name'  => $oriName,
                ':save_name' => $saveName,
                ':file_path' => $filePath,
                ':file_size' => $fileSize,
                ':file_ext'  => $fileExt,
            ]
        );
    }

    public function findFile(int $bnIdx): array|false
    {
        $row = $this->selectOne(
            'SELECT id, ori_name, save_name, file_path, file_size, file_ext
             FROM popup_file WHERE voc_id = :voc_id ORDER BY id DESC LIMIT 1',
            [':voc_id' => $bnIdx]
        );
        if ($row) {
            $uploadUrl = rtrim(Env::get('UPLOAD_URL_POPUP', '/uploads/popup/'), '/') . '/';
            $row['file_url'] = $uploadUrl . $row['save_name'];
        }
        return $row;
    }

    public function deleteFile(int $bnIdx): void
    {
        $rows = $this->select(
            'SELECT file_path FROM popup_file WHERE voc_id = :voc_id',
            [':voc_id' => $bnIdx]
        );
        foreach ($rows as $row) {
            if (is_file($row['file_path'])) @unlink($row['file_path']);
        }
        $this->execute('DELETE FROM popup_file WHERE voc_id = :voc_id', [':voc_id' => $bnIdx]);
    }

    private function buildWhere(string $site, string $keyword, string $dateFrom, string $dateTo): array
    {
        $where  = "WHERE BN_DEL_YN = 'N'";
        $params = [];
        if ($site !== '') {
            $where .= ' AND SITE_ID = :site';
            $params[':site'] = $site;
        }
        if ($keyword !== '') {
            $where .= ' AND BN_TITLE LIKE :keyword';
            $params[':keyword'] = '%' . $keyword . '%';
        }
        if ($dateFrom !== '') {
            $where .= ' AND DATE(INPUTDATE) >= :date_from';
            $params[':date_from'] = $dateFrom;
        }
        if ($dateTo !== '') {
            $where .= ' AND DATE(INPUTDATE) <= :date_to';
            $params[':date_to'] = $dateTo;
        }
        return [$where, $params];
    }
}
