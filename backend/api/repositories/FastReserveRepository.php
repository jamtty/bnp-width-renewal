<?php
/**
 * 빠른예약 Repository
 * fast_reserve 기반
 *
 * 컬럼 구조:
 *   FR_IDX      INT PK
 *   RT_PRI_YN   CHAR(1)       개인정보 동의여부
 *   RT_NAME     VARCHAR(50)   이름
 *   RT_PHONE    VARCHAR(50)   연락처
 *   INPUTDATE   DATETIME      등록일시
 *   RT_DEL_YN   VARCHAR(1)    삭제여부 (N)
 *   DELDATE     DATETIME      삭제일
 *   SUCC_YN     CHAR(1)       처리여부
 */
class FastReserveRepository extends BaseRepository
{
    public function countList(string $keyword, string $searchType, string $dateFrom, string $dateTo): int
    {
        [$where, $params] = $this->buildWhere($keyword, $searchType, $dateFrom, $dateTo);
        return (int)$this->selectScalar(
            "SELECT COUNT(*) FROM fast_reserve $where",
            $params
        );
    }

    public function findList(string $keyword, string $searchType, string $dateFrom, string $dateTo, int $limit, int $offset): array
    {
        [$where, $params] = $this->buildWhere($keyword, $searchType, $dateFrom, $dateTo);
        $params[':limit']  = $limit;
        $params[':offset'] = $offset;
        return $this->select(
            "SELECT FR_IDX AS id, RT_NAME AS name, RT_PHONE AS phone,
                    RT_PRI_YN AS pri_yn, SUCC_YN AS succ_yn,
                    DATE_FORMAT(INPUTDATE, '%Y-%m-%d %H:%i') AS created_at
             FROM fast_reserve
             $where
             ORDER BY FR_IDX DESC
             LIMIT :limit OFFSET :offset",
            $params
        );
    }

    public function findOne(int $id): array|false
    {
        return $this->selectOne(
            "SELECT FR_IDX AS id, RT_NAME AS name, RT_PHONE AS phone,
                    RT_PRI_YN AS pri_yn, SUCC_YN AS succ_yn,
                    DATE_FORMAT(INPUTDATE, '%Y-%m-%d %H:%i') AS created_at
             FROM fast_reserve
             WHERE FR_IDX = :id",
            [':id' => $id]
        );
    }

    public function updateSuccYn(int $id, string $succYn): bool
    {
        return $this->execute(
            "UPDATE fast_reserve SET SUCC_YN = :succ_yn WHERE FR_IDX = :id",
            [':succ_yn' => $succYn, ':id' => $id]
        ) > 0;
    }

    public function create(string $name, string $phone, string $priYn): int
    {
        return (int)$this->insert(
            "INSERT INTO fast_reserve (RT_NAME, RT_PHONE, RT_PRI_YN, SUCC_YN, RT_DEL_YN, INPUTDATE)
             VALUES (:name, :phone, :pri_yn, 'N', 'N', NOW())",
            [':name' => $name, ':phone' => $phone, ':pri_yn' => $priYn]
        );
    }

    public function delete(int $id): bool
    {
        return $this->execute(
            "DELETE FROM fast_reserve WHERE FR_IDX = :id",
            [':id' => $id]
        ) > 0;
    }

    private function buildWhere(string $keyword, string $searchType, string $dateFrom, string $dateTo): array
    {
        $where  = 'WHERE 1=1';
        $params = [];
        if ($keyword !== '') {
            $like = '%' . $keyword . '%';
            if ($searchType === 'RT_NAME') {
                $where .= ' AND RT_NAME LIKE :keyword';
                $params[':keyword'] = $like;
            } elseif ($searchType === 'RT_PHONE') {
                $where .= ' AND RT_PHONE LIKE :keyword';
                $params[':keyword'] = $like;
            } else {
                $where .= ' AND (RT_NAME LIKE :keyword OR RT_PHONE LIKE :keyword_phone)';
                $params[':keyword']       = $like;
                $params[':keyword_phone'] = $like;
            }
        }
        if ($dateFrom !== '') {
            $where .= ' AND DATE(INPUTDATE) >= :date_from';
            $params[':date_from'] = $dateFrom;
        }
        if ($dateTo !== '') {
            $where .= ' AND DATE(INPUTDATE) <= :date_to';
            $params[':date_to'] = $dateTo;
        }
        return [$where, $params];
    }
}
