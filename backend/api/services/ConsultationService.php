<?php
/**
 * 건강상담 Service
 */
class ConsultationService
{
    private ConsultationRepository $repo;

    public function __construct()
    {
        $this->repo = new ConsultationRepository();
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

        // 비밀번호 필드는 응답에서 제거
        unset($item['password']);

        $item['files'] = $this->repo->findFiles($id);
        $item['prev']  = $this->repo->findPrev($id) ?: null;
        $item['next']  = $this->repo->findNext($id) ?: null;

        return $item;
    }

    // ─────────────────────────────────────────────────────────────
    // 비밀글 비밀번호 확인
    // ─────────────────────────────────────────────────────────────

    public function verifyPassword(int $id, string $password): bool
    {
        $item = $this->repo->findById($id);
        if (!$item) return false;
        return $item['password'] === $password;
    }

    // ─────────────────────────────────────────────────────────────
    // 등록
    // ─────────────────────────────────────────────────────────────

    public function create(
        string $jbCd,
        string $title,
        string $content,
        string $name,
        string $phone,
        string $email,
        string $password,
        string $isSecret
    ): int {
        return $this->repo->create(
            jbCd:     $jbCd,
            title:    $title,
            content:  $content,
            name:     $name,
            phone:    $phone,
            email:    $email,
            password: $password,
            isSecret: $isSecret
        );
    }

    // ─────────────────────────────────────────────────────────────
    // 삭제
    // ─────────────────────────────────────────────────────────────

    public function delete(int $id): array
    {
        $files = $this->repo->findFilePathsByAdIdx($id);
        $this->repo->deleteFilesByAdIdx($id);
        $ok = $this->repo->softDelete($id);
        if (!$ok) throw new RuntimeException('게시물을 찾을 수 없습니다.', 404);
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
        if (!$ok) throw new RuntimeException('게시물을 찾을 수 없거나 이미 삭제되었습니다.', 404);
    }
}
