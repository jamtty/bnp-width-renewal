<?php
/**
 * 건강증진센터 파일 관리 Service
 */
class WellFileService
{
    private WellFileRepository $repo;
    private const UPLOAD_URL_KEY = 'UPLOAD_URL_WELL_FILE';
    private const UPLOAD_URL_DEFAULT = '/uploads/well/';

    public function __construct()
    {
        $this->repo = new WellFileRepository();
    }

    public function getList(): array
    {
        $items = $this->repo->findAll();
        foreach ($items as &$item) {
            $item['file_url'] = $this->buildFileUrl($item['save_name'] ?? '');
        }
        unset($item);
        return $items;
    }

    public function getOne(int $id): array|false
    {
        $item = $this->repo->findOne($id);
        if (!$item) return false;
        $item['file_url'] = $this->buildFileUrl($item['save_name'] ?? '');
        return $item;
    }

    /** 공개용: 메뉴 키로 활성 파일 조회 */
    public function getByMenuKey(string $menuKey): array|false
    {
        $item = $this->repo->findByMenuKey($menuKey);
        if (!$item) return false;
        $item['file_url'] = $this->buildFileUrl($item['save_name'] ?? '');
        return $item;
    }

    public function update(int $id, array $data): bool
    {
        return $this->repo->update($id, $data);
    }

    public function updateFile(int $id, string $oriName, string $saveName, string $filePath, int $fileSize, string $fileExt, string $updatedBy): bool
    {
        return $this->repo->updateFile($id, $oriName, $saveName, $filePath, $fileSize, $fileExt, $updatedBy);
    }

    public function clearFile(int $id, string $updatedBy): bool
    {
        // 실제 파일도 삭제
        $item = $this->repo->findOne($id);
        if ($item && !empty($item['file_path']) && file_exists($item['file_path'])) {
            @unlink($item['file_path']);
        }
        return $this->repo->clearFile($id, $updatedBy);
    }

    private function buildFileUrl(string $saveName): string
    {
        if ($saveName === '') return '';
        $base = rtrim(Env::get(self::UPLOAD_URL_KEY, self::UPLOAD_URL_DEFAULT), '/') . '/';
        return $base . $saveName;
    }
}
