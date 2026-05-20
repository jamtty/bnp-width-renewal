<?php
/**
 * 구비서류 파일 관리 Service
 */
class CertDocService
{
    private CertDocRepository $repo;
    private const UPLOAD_URL_KEY     = 'UPLOAD_URL_CERT_DOC';
    private const UPLOAD_URL_DEFAULT = '/uploads/cert/';

    public function __construct()
    {
        $this->repo = new CertDocRepository();
    }

    public function getAdminList(): array
    {
        $items = $this->repo->findAll();
        foreach ($items as &$item) {
            $item['file_url'] = $this->buildFileUrl($item['save_name'] ?? '');
        }
        unset($item);
        return $items;
    }

    public function getPublicList(): array
    {
        $items = $this->repo->findPublic();
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

    public function create(array $data): int
    {
        return $this->repo->create($data);
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
        $item = $this->repo->findOne($id);
        if ($item && !empty($item['file_path']) && file_exists($item['file_path'])) {
            @unlink($item['file_path']);
        }
        return $this->repo->clearFile($id, $updatedBy);
    }

    public function delete(int $id, string $updatedBy): bool
    {
        $this->clearFile($id, $updatedBy);
        return $this->repo->delete($id, $updatedBy);
    }

    private function buildFileUrl(string $saveName): string
    {
        if ($saveName === '') return '';
        $base = rtrim(Env::get(self::UPLOAD_URL_KEY, self::UPLOAD_URL_DEFAULT), '/') . '/';
        return $base . $saveName;
    }
}
