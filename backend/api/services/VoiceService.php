<?php
/**
 * 고객의소리 Service
 */
class VoiceService
{
    private VoiceRepository $repo;

    public function __construct()
    {
        $this->repo = new VoiceRepository();
    }

    // ─────────────────────────────────────────────────────────────
    // 목록 조회
    // ─────────────────────────────────────────────────────────────

    public function getList(array $queryParams = []): array
    {
        $page    = max(1, (int)($queryParams['page']    ?? 1));
        $perPage = min(100, max(1, (int)($queryParams['size'] ?? $queryParams['per_page'] ?? 10)));
        $offset  = ($page - 1) * $perPage;

        $cond = [
            'keyword'   => trim($queryParams['keyword'] ?? ''),
            'type'      => $queryParams['type'] ?? '',
            'date_from' => trim($queryParams['date_from'] ?? ''),
            'date_to'   => trim($queryParams['date_to']   ?? ''),
        ];

        $total = $this->repo->countList($cond);
        $items = $this->repo->findList($cond, $perPage, $offset);

        return [
            'items'       => $items,
            'total'       => $total,
            'page'        => $page,
            'per_page'    => $perPage,
            'total_pages' => (int)ceil($total / max(1, $perPage)),
        ];
    }

    // ─────────────────────────────────────────────────────────────
    // 단건 조회
    // ─────────────────────────────────────────────────────────────

    public function getOne(int $id): ?array
    {
        $item = $this->repo->findById($id);
        if (!$item) return null;

        $this->repo->incrementViewCount($id);

        $item['files'] = $this->repo->findFiles($id);
        $item['prev']  = $this->repo->findPrev($id) ?: null;
        $item['next']  = $this->repo->findNext($id) ?: null;

        return $item;
    }

    // ─────────────────────────────────────────────────────────────
    // 등록
    // ─────────────────────────────────────────────────────────────

    public function create(
        string $category,
        string $title,
        string $content,
        string $name,
        string $phone,
        string $password = ''
    ): int {
        return $this->repo->create(
            category: $category,
            title:    $title,
            content:  $content,
            name:     $name,
            phone:    $phone,
            password: $password
        );
    }

    // ─────────────────────────────────────────────────────────────
    // 내 접수 내역
    // ─────────────────────────────────────────────────────────────

    public function getMyList(string $name, string $password, array $queryParams = []): array
    {
        $page    = max(1, (int)($queryParams['page']    ?? 1));
        $perPage = min(100, max(1, (int)($queryParams['size'] ?? 10)));
        $offset  = ($page - 1) * $perPage;
        $keyword = trim($queryParams['keyword'] ?? '');
        $type    = $queryParams['type'] ?? '';

        $total = $this->repo->countMyList($name, $password, $keyword, $type);
        $items = $this->repo->findMyList($name, $password, $keyword, $type, $perPage, $offset);

        return [
            'items'       => $items,
            'total'       => $total,
            'page'        => $page,
            'per_page'    => $perPage,
            'total_pages' => (int)ceil($total / max(1, $perPage)),
        ];
    }

    // ─────────────────────────────────────────────────────────────
    // 삭제
    // ─────────────────────────────────────────────────────────────

    public function delete(int $id): array
    {
        $files = $this->repo->findFilePathsByVcIdx($id);
        $this->repo->deleteFilesByVcIdx($id);
        $ok = $this->repo->softDelete($id);
        if (!$ok) throw new RuntimeException('게시글을 찾을 수 없습니다.', 404);
        return $files;
    }

    // ─────────────────────────────────────────────────────────────
    // 수정 (사용자)
    // ─────────────────────────────────────────────────────────────

    public function update(int $id, string $password, string $category, string $title, string $content, string $name, string $phone): void
    {
        if ($title === '') throw new RuntimeException('제목을 입력해주세요.');
        $ok = $this->repo->update($id, $password, $category, $title, $content, $name, $phone);
        if (!$ok) throw new RuntimeException('비밀번호가 일치하지 않거나 게시글이 존재하지 않습니다.', 400);
    }

    // ─────────────────────────────────────────────────────────────
    // 삭제 (사용자 비밀번호 확인)
    // ─────────────────────────────────────────────────────────────

    public function userDelete(int $id, string $password): array
    {
        $files = $this->repo->findFilePathsByVcIdx($id);
        $ok = $this->repo->userDelete($id, $password);
        if (!$ok) throw new RuntimeException('비밀번호가 일치하지 않거나 게시글이 존재하지 않습니다.', 400);
        $this->repo->deleteFilesByVcIdx($id);
        return $files;
    }

    // ─────────────────────────────────────────────────────────────
    // 답변
    // ─────────────────────────────────────────────────────────────

    public function reply(int $id, string $content, string $replyId): void
    {
        $content = trim($content);
        if ($content === '') throw new RuntimeException('답변 내용을 입력해주세요.');
        $ok = $this->repo->saveReply($id, $content, $replyId);
        if (!$ok) throw new RuntimeException('게시글을 찾을 수 없거나 이미 삭제되었습니다.', 404);
    }
}
