<?php
/**
 * ���� ��� Repository
 * ���̺�: pcs_banner
 */
class MainBannerRepository extends BaseRepository
{
    private function uploadUrl(): string
    {
        return rtrim(Env::get('UPLOAD_URL_BANNER', '/uploads/banner/'), '/') . '/';
    }

    private function withUrls(array &$item): void
    {
        $base = $this->uploadUrl();
        $item['img_url_web']    = $item['img_web']    ? $base . $item['img_web']    : '';
        $item['img_url_mobile'] = $item['img_mobile'] ? $base . $item['img_mobile'] : $item['img_url_web'];
    }

    public function countList(string $keyword, string $displayYn): int
    {
        [$where, $params] = $this->buildWhere($keyword, $displayYn);
        return (int)$this->selectScalar("SELECT COUNT(*) FROM pcs_banner $where", $params);
    }

    public function findList(string $keyword, string $displayYn, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildWhere($keyword, $displayYn);
        $params[':limit']  = $limit;
        $params[':offset'] = $offset;
        $items = $this->select(
            "SELECT banner_key     AS id,
                    banner_name    AS title,
                    banner_path    AS img_web,
                    banner_mobile_path AS img_mobile,
                    display_yn,
                    order_num      AS sort_order,
                    reg_user       AS created_by,
                    DATE_FORMAT(reg_date, '%Y-%m-%d') AS created_at
             FROM pcs_banner
             $where
             ORDER BY display_yn DESC, order_num ASC, banner_key DESC
             LIMIT :limit OFFSET :offset",
            $params
        );
        foreach ($items as &$item) { $this->withUrls($item); }
        unset($item);
        return $items;
    }

    public function findOne(int $id): array|false
    {
        $item = $this->selectOne(
            "SELECT banner_key              AS id,
                    banner_name             AS title,
                    banner_path             AS img_web,
                    banner_mobile_path      AS img_mobile,
                    banner_origin_path      AS img_web_ori,
                    banner_mobile_origin_path AS img_mobile_ori,
                    display_yn,
                    order_num               AS sort_order,
                    reg_user                AS created_by,
                    DATE_FORMAT(reg_date, '%Y-%m-%d') AS created_at,
                    DATE_FORMAT(mod_date, '%Y-%m-%d %H:%i') AS updated_at
             FROM pcs_banner
             WHERE banner_key = :id",
            [':id' => $id]
        );
        if ($item) { $this->withUrls($item); }
        return $item;
    }

    /** ������: display_yn = 'Y', order_num �������� */
    public function findActive(): array
    {
        $items = $this->select(
            "SELECT banner_key     AS id,
                    banner_name    AS title,
                    banner_path    AS img_web,
                    banner_mobile_path AS img_mobile,
                    display_yn,
                    order_num      AS sort_order
             FROM pcs_banner
             WHERE display_yn = 'Y'
             ORDER BY order_num ASC, banner_key DESC"
        );
        foreach ($items as &$item) { $this->withUrls($item); }
        unset($item);
        return $items;
    }

    public function create(array $data): int
    {
        $this->execute(
            "INSERT INTO pcs_banner
             (banner_name, banner_path, banner_mobile_path,
              banner_origin_path, banner_mobile_origin_path,
              display_yn, order_num, reg_user, reg_date)
             VALUES
             (:title, :img_web, :img_mobile,
              :img_web_ori, :img_mobile_ori,
              :display_yn, :sort_order, :reg_user, NOW())",
            [
                ':title'          => $data['title'],
                ':img_web'        => $data['img_web']        ?? '',
                ':img_mobile'     => $data['img_mobile']     ?? '',
                ':img_web_ori'    => $data['img_web_ori']    ?? '',
                ':img_mobile_ori' => $data['img_mobile_ori'] ?? '',
                ':display_yn'     => $data['display_yn'],
                ':sort_order'     => $data['sort_order'] !== '' ? $data['sort_order'] : null,
                ':reg_user'       => $data['reg_user'],
            ]
        );
        return (int)$this->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $sets   = ['banner_name = :title', 'display_yn = :display_yn',
                   'order_num = :sort_order', 'mod_date = NOW()'];
        $params = [
            ':title'      => $data['title'],
            ':display_yn' => $data['display_yn'],
            ':sort_order' => $data['sort_order'] !== '' ? $data['sort_order'] : null,
            ':id'         => $id,
        ];

        if (!empty($data['img_web'])) {
            $sets[]                 = 'banner_path = :img_web';
            $sets[]                 = 'banner_origin_path = :img_web_ori';
            $params[':img_web']     = $data['img_web'];
            $params[':img_web_ori'] = $data['img_web_ori'] ?? '';
        }
        if (!empty($data['img_mobile'])) {
            $sets[]                    = 'banner_mobile_path = :img_mobile';
            $sets[]                    = 'banner_mobile_origin_path = :img_mobile_ori';
            $params[':img_mobile']     = $data['img_mobile'];
            $params[':img_mobile_ori'] = $data['img_mobile_ori'] ?? '';
        }

        return $this->execute(
            'UPDATE pcs_banner SET ' . implode(', ', $sets) . ' WHERE banner_key = :id',
            $params
        ) >= 0;
    }

    public function delete(int $id): bool
    {
        return $this->execute(
            'DELETE FROM pcs_banner WHERE banner_key = :id',
            [':id' => $id]
        ) > 0;
    }

    public function updateDisplayYn(int $id, string $displayYn): bool
    {
        return $this->execute(
            'UPDATE pcs_banner SET display_yn = :yn, mod_date = NOW() WHERE banner_key = :id',
            [':yn' => $displayYn, ':id' => $id]
        ) >= 0;
    }

    public function updateSortOrder(int $id, int $sortOrder): bool
    {
        return $this->execute(
            'UPDATE pcs_banner SET order_num = :ord, mod_date = NOW() WHERE banner_key = :id',
            [':ord' => $sortOrder, ':id' => $id]
        ) >= 0;
    }

    private function buildWhere(string $keyword, string $displayYn): array
    {
        $conds  = ['1=1'];
        $params = [];
        if ($keyword !== '') {
            $conds[]            = 'banner_name LIKE :keyword';
            $params[':keyword'] = '%' . $keyword . '%';
        }
        if ($displayYn !== '') {
            $conds[]               = 'display_yn = :display_yn';
            $params[':display_yn'] = $displayYn;
        }
        return ['WHERE ' . implode(' AND ', $conds), $params];
    }
}
