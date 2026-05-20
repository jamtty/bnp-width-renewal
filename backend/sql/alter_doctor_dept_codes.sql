-- ============================================================
-- 의료진 다중 진료과 지원 마이그레이션
-- doctor_tbl에 DEPT_CODES (JSON 배열) 컬럼 추가
-- ============================================================

-- 1. DEPT_CODES 컬럼 추가 (이미 있으면 건너뜀)
ALTER TABLE doctor_tbl
  ADD COLUMN IF NOT EXISTS DEPT_CODES JSON NULL
    COMMENT '진료과 코드 배열 (다중 선택)'
    AFTER DEPT_CODE;

-- 2. 기존 단일 DEPT_CODE 값을 JSON 배열로 마이그레이션
UPDATE doctor_tbl
SET DEPT_CODES = JSON_ARRAY(DEPT_CODE)
WHERE DEPT_CODES IS NULL OR JSON_LENGTH(DEPT_CODES) = 0;
