<?php
/**
 * 메인 배너 Service
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
        $page    = max(1, (int)($query['page']    ?? 1));
        $size    = max(1, min(100, (int)($query['size'] ?? 15)));
        $keyword = trim((string)($query['keyword'] ?? ''));
        $useYn   = trim((string)($query['use_yn']  ?? ''));
        $offset  = ($page - 1) * $size;

        $total = $this->repo->countList($keyword, $useYn);
        $items = $this->repo->findList($keyword, $useYn, $size, $offset);

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

    public function getActive(): array
    {
        $items = $this->repo->findActive();
        foreach ($items as &$item) {
            $file = $this->repo->findFile((int)$item['id']);
            $item['img_url'] = $file ? $file['file_url'] : '';
        }
        unset($item);
        return $items;
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

    public function create(array $data): int           { return $this->repo->create($data); }
    public function update(int $id, array $data): bool  { return $this->repo->update($id, $data); }
    public function delete(int $id): bool               { return $this->repo->delete($id); }
    public function updateUseYn(int $id, string $useYn): bool     { return $this->repo->updateUseYn($id, $useYn); }
    public function updateSortOrder(int $id, int $sortOrder): bool { return $this->repo->updateSortOrder($id, $sortOrder); }

    public function saveFile(int $id, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt): void
    {
        $this->repo->saveFile($id, $oriName, $saveName, $filePath, $fileSize, $fileExt);
    }

    public function deleteFile(int $id): void { $this->repo->deleteFile($id); }
}
