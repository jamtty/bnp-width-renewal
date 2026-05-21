<?php
/**
 * ���� ��� Service
 * ���̺�: pcs_banner (���� ���̺�, ���� ��� ���� ����)
 */
class MainBannerService
{
    private MainBannerRepository $repo;

    public function __construct()
    {
        $this->repo = new MainBannerRepository();
    }

    public function getList(array $query): array
    {
        $page      = max(1, (int)($query['page']       ?? 1));
        $size      = max(1, min(100, (int)($query['size'] ?? 15)));
        $keyword   = trim((string)($query['keyword']   ?? ''));
        $displayYn = trim((string)($query['display_yn'] ?? ''));
        $offset    = ($page - 1) * $size;

        $total = $this->repo->countList($keyword, $displayYn);
        $items = $this->repo->findList($keyword, $displayYn, $size, $offset);

        return [
            'items'       => $items,
            'total'       => $total,
            'total_pages' => $total > 0 ? (int)ceil($total / $size) : 1,
            'page'        => $page,
            'size'        => $size,
        ];
    }

    public function getActive(): array
    {
        return $this->repo->findActive();
    }

    public function getOne(int $id): array|false
    {
        return $this->repo->findOne($id);
    }

    public function create(array $data): int           { return $this->repo->create($data); }
    public function update(int $id, array $data): bool  { return $this->repo->update($id, $data); }
    public function delete(int $id): bool               { return $this->repo->delete($id); }
    public function updateDisplayYn(int $id, string $yn): bool     { return $this->repo->updateDisplayYn($id, $yn); }
    public function updateSortOrder(int $id, int $ord): bool       { return $this->repo->updateSortOrder($id, $ord); }
}
