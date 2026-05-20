<?php
/**
 * 팝업 배너 Service
 */
class PopupBannerService
{
    private PopupBannerRepository $repo;

    public function __construct()
    {
        $this->repo = new PopupBannerRepository();
    }

    public function getList(array $query): array
    {
        $page     = max(1, (int)($query['page'] ?? 1));
        $size     = max(1, min(100, (int)($query['size'] ?? 15)));
        $site     = trim((string)($query['site']      ?? ''));
        $keyword  = trim((string)($query['keyword']   ?? ''));
        $dateFrom = trim((string)($query['date_from'] ?? ''));
        $dateTo   = trim((string)($query['date_to']   ?? ''));
        $offset   = ($page - 1) * $size;

        $total = $this->repo->countList($site, $keyword, $dateFrom, $dateTo);
        $items = $this->repo->findList($site, $keyword, $dateFrom, $dateTo, $size, $offset);

        // 각 항목에 이미지 정보 추가
        foreach ($items as &$item) {
            $file = $this->repo->findFile((int)$item['id']);
            $item['img_ori_name']  = $file ? $file['ori_name']  : '';
            $item['img_save_name'] = $file ? $file['save_name'] : '';
            $item['img_url']       = $file ? $file['file_url']  : '';
        }
        unset($item);

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
        $item = $this->repo->findOne($id);
        if (!$item) return false;

        $file = $this->repo->findFile($id);
        $item['img_ori_name']  = $file ? $file['ori_name']  : '';
        $item['img_save_name'] = $file ? $file['save_name'] : '';
        $item['img_url']       = $file ? $file['file_url']  : '';

        return $item;
    }

    public function create(array $data): int
    {
        return $this->repo->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->repo->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->repo->delete($id);
    }

    public function saveFile(int $id, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): int
    {
        return $this->repo->saveFile($id, $oriName, $saveName, $filePath, $fileSize, $fileExt);
    }

    public function deleteFile(int $id): void
    {
        $this->repo->deleteFile($id);
    }

    public function updateUseYn(int $id, string $useYn): bool
    {
        return $this->repo->updateUseYn($id, $useYn);
    }

    public function updateSortOrder(int $id, int $sortOrder): bool
    {
        return $this->repo->updateSortOrder($id, $sortOrder);
    }
}
