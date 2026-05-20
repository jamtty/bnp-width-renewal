<?php
/**
 * 소식 Service
 * 비즈니스 로직 담당 - Controller ↔ Repository 사이 계층
 */
class NewsService
{
    private NewsRepository $repo;

    public function __construct()
    {
        $this->repo = new NewsRepository();
    }

    /**
     * 목록 조회
     */
    public function getList(int $page, int $size, array $searchCondition): array
    {
        $page   = max(1, $page);
        $size   = min(50, max(1, $size));
        $offset = ($page - 1) * $size;

        $totalCount = $this->repo->countList($searchCondition);
        $totalPages = (int)ceil($totalCount / $size);
        $items      = $this->repo->findList($searchCondition, $size, $offset);

        // 첨부파일 이미지 없으면 에디터 콘텐츠 첫 번째 이미지를 썸네일로 사용
        foreach ($items as &$item) {
            if (empty($item['thumb_url']) && !empty($item['content_preview'])) {
                if (preg_match('/src=["\']([^"\']+)["\']/', (string)$item['content_preview'], $m)) {
                    $item['thumb_url'] = $m[1];
                }
            }
            unset($item['content_preview']);
        }
        unset($item);

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

        $files = $this->repo->findFiles($id);
        $prev  = $this->repo->findPrev($id) ?: null;
        $next  = $this->repo->findNext($id) ?: null;

        return [
            'item'  => $item,
            'files' => $files,
            'prev'  => $prev,
            'next'  => $next,
        ];
    }

    /**
     * 게시글 등록
     * @throws RuntimeException 실패 시
     */
    public function create(string $title, string $content, string $authorId, string $authorName): int
    {
        if (trim($title) === '') throw new RuntimeException('제목을 입력해주세요.');
        return $this->repo->create(trim($title), $content, $authorId, $authorName);
    }

    /**
     * 게시글 수정
     * @throws RuntimeException 실패 시
     */
    public function update(int $id, string $title, string $content): void
    {
        if (trim($title) === '') throw new RuntimeException('제목을 입력해주세요.');
        $ok = $this->repo->update($id, trim($title), $content);
        if (!$ok) throw new RuntimeException('게시글이 존재하지 않습니다.', 404);
    }

    /**
     * 게시글 삭제
     * @throws RuntimeException 실패 시
     */
    public function delete(int $id): void
    {
        $ok = $this->repo->softDelete($id);
        if (!$ok) throw new RuntimeException('게시글이 존재하지 않습니다.', 404);
    }
}
