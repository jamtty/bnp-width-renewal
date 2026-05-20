<?php
/**
 * 공지사항 Service
 * 비즈니스 로직 담당 - Controller ↔ Repository 사이 계층
 */
class NoticeService
{
    private NoticeRepository $repo;

    public function __construct()
    {
        $this->repo = new NoticeRepository();
    }

    /**
     * 목록 조회
     * - 키워드 없을 때: 고정글(항상 상단) + 일반글(페이징)
     * - 키워드 있을 때: 고정글+일반글 통합 검색 결과(페이징)
     */
    public function getList(int $page, int $size, array $searchCondition): array
    {
        $page    = max(1, $page);
        $size    = min(50, max(1, $size));
        $offset  = ($page - 1) * $size;
        $keyword = trim($searchCondition['keyword'] ?? '');

        $totalCount = $this->repo->countList($searchCondition);
        $totalPages = $totalCount > 0 ? (int)ceil($totalCount / $size) : 1;
        $items      = $this->repo->findList($searchCondition, $size, $offset);

        // 키워드 검색이 없을 때만 고정글을 최상단에 추가 (날짜 필터 적용)
        if ($keyword === '') {
            $pinned = $this->repo->findPinnedList($searchCondition);
            $items  = array_merge($pinned, $items);
        }

        return [
            'items'      => $items,
            'totalCount' => $totalCount,
            'totalPages' => $totalPages,
            'page'       => $page,
            'size'       => $size,
        ];
    }

    /**
     * 상세 조회
     * @param bool $preview true면 조회수 증가 건너뜀 (관리자 미리보기/수정 용도)
     * @throws RuntimeException 게시글이 없을 때
     */
    public function getDetail(int $id, bool $preview = false): array
    {
        $item = $this->repo->findById($id);

        if (!$item) {
            throw new RuntimeException('존재하지 않는 게시글입니다.', 404);
        }

        // 조회수 증가 (preview 요청이면 올리지 않음)
        if (!$preview) {
            $this->repo->incrementViewCount($id);
        }

        try {
            $files = $this->repo->findFiles($id);
        } catch (PDOException $e) {
            $files = [];
        }
        $prev  = $this->repo->findPrev($id) ?: null;
        $next  = $this->repo->findNext($id) ?: null;

        return [
            'item'  => $item,
            'files' => $files,
            'prev'  => $prev,
            'next'  => $next,
        ];
    }

    public function create(string $title, string $content, string $authorId, string $authorName, bool $isPinned = false): int
    {
        if (trim($title) === '') throw new RuntimeException('제목을 입력해주세요.');
        return $this->repo->create(trim($title), $content, $authorId, $authorName, $isPinned);
    }

    public function update(int $id, string $title, string $content, bool $isPinned = false): void
    {
        if (trim($title) === '') throw new RuntimeException('제목을 입력해주세요.');
        $ok = $this->repo->update($id, trim($title), $content, $isPinned);
        if (!$ok) throw new RuntimeException('게시글이 존재하지 않습니다.', 404);
    }

    public function delete(int $id): void
    {
        $ok = $this->repo->softDelete($id);
        if (!$ok) throw new RuntimeException('게시글이 존재하지 않습니다.', 404);
    }
}
