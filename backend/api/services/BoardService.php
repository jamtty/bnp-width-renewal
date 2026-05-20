<?php
/**
 * 공통 게시판 Service
 * board_tbl 기반, BMT_IDX 로 구분
 */
class BoardService
{
    protected BoardRepository $repo;
    protected int $bmtIdx;

    public function __construct(int $bmtIdx)
    {
        $this->bmtIdx = $bmtIdx;
        $this->repo   = new BoardRepository($bmtIdx);
    }

    // ─────────────────────────────────────────────────────────────
    // 목록 조회
    // ─────────────────────────────────────────────────────────────

    public function getList(array $queryParams = []): array
    {
        $page    = max(1, (int)($queryParams['page']    ?? 1));
        $perPage = min(100, max(1, (int)($queryParams['size'] ?? $queryParams['per_page'] ?? 15)));
        $offset  = ($page - 1) * $perPage;

        $searchCondition = [
            'keyword'   => trim($queryParams['keyword']   ?? ''),
            'type'      => $queryParams['type']           ?? '',
            'date_from' => trim($queryParams['date_from'] ?? ''),
            'date_to'   => trim($queryParams['date_to']   ?? ''),
            'is_pinned' => $queryParams['is_pinned']      ?? '',
        ];

        $total = $this->repo->countList($searchCondition);
        $items = $this->repo->findList($searchCondition, $perPage, $offset);

        foreach ($items as &$item) {
            $item['thumbnail'] = self::extractFirstImage($item['content'] ?? '');
        }
        unset($item);

        return [
            'items'       => $items,
            'total'       => $total,
            'page'        => $page,
            'per_page'    => $perPage,
            'total_pages' => (int)ceil($total / $perPage),
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

        $item['prev'] = $this->repo->findPrev($id) ?: null;
        $item['next'] = $this->repo->findNext($id) ?: null;

        return $item;
    }

    // ─────────────────────────────────────────────────────────────
    // 내부 헬퍼
    // ─────────────────────────────────────────────────────────────

    protected static function extractFirstImage(string $html): ?string
    {
        if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/', $html, $m)) {
            return $m[1];
        }
        return null;
    }

    // ─────────────────────────────────────────────────────────────
    // 작성 / 수정 / 삭제
    // ─────────────────────────────────────────────────────────────

    public function create(
        string $title,
        string $content,
        string $authorId,
        string $authorName,
        bool   $isPinned = false,
        ?string $field1  = null,
        ?string $field2  = null,
        ?string $field3  = null
    ): int {
        $this->validateTitle($title);
        return $this->repo->create(
            $title, $content, $authorId, $authorName,
            $isPinned, $field1, $field2, $field3
        );
    }

    public function update(
        int    $id,
        string $title,
        string $content,
        bool   $isPinned = false,
        ?string $field1  = null,
        ?string $field2  = null,
        ?string $field3  = null
    ): bool {
        $this->validateTitle($title);
        $existing = $this->repo->findById($id);
        if (!$existing) {
            throw new RuntimeException('게시물을 찾을 수 없습니다.', 404);
        }
        return $this->repo->update($id, $title, $content, $isPinned, $field1, $field2, $field3);
    }

    public function delete(int $id): bool
    {
        $existing = $this->repo->findById($id);
        if (!$existing) {
            throw new RuntimeException('게시물을 찾을 수 없습니다.', 404);
        }
        return $this->repo->softDelete($id);
    }

    public function togglePin(int $id): bool
    {
        return $this->repo->togglePin($id);
    }

    // ─────────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────────

    private function validateTitle(string $title): void
    {
        if (trim($title) === '') {
            throw new InvalidArgumentException('제목을 입력해 주세요.', 400);
        }
    }
}
