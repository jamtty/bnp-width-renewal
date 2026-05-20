<?php
/**
 * 빠른예약 Service
 */
class FastReserveService
{
    private FastReserveRepository $repo;

    public function __construct()
    {
        $this->repo = new FastReserveRepository();
    }

    public function getList(array $query): array
    {
        $page       = max(1, (int)($query['page'] ?? 1));
        $size       = max(1, min(100, (int)($query['size'] ?? 15)));
        $keyword    = trim((string)($query['keyword']     ?? ''));
        $searchType = trim((string)($query['search_type'] ?? ''));
        $dateFrom   = trim((string)($query['date_from']   ?? ''));
        $dateTo     = trim((string)($query['date_to']     ?? ''));
        $offset     = ($page - 1) * $size;

        $total = $this->repo->countList($keyword, $searchType, $dateFrom, $dateTo);
        $items = $this->repo->findList($keyword, $searchType, $dateFrom, $dateTo, $size, $offset);

        return [
            'items'       => $items,
            'total'       => $total,
            'total_pages' => $total > 0 ? (int)ceil($total / $size) : 1,
            'page'        => $page,
            'size'        => $size,
        ];
    }

    public function getOne(int $id): array|false
    {
        return $this->repo->findOne($id);
    }

    public function create(string $name, string $phone, string $priYn): int
    {
        return $this->repo->create($name, $phone, $priYn);
    }

    public function updateSuccYn(int $id, string $succYn): bool
    {
        return $this->repo->updateSuccYn($id, $succYn);
    }

    public function delete(int $id): bool
    {
        return $this->repo->delete($id);
    }
}
