-- ============================================================
-- checkup → hpcenter 코드 마이그레이션
-- 검진센터(checkup) 코드를 건강증진센터(hpcenter)로 일괄 변경
-- 실행 전 백업 권장
-- ============================================================

-- 1. DEPT_CODE 단일 컬럼이 'checkup'인 경우
UPDATE doctor_tbl
SET
    DEPT_CODE  = 'hpcenter',
    UPDATEDATE = NOW()
WHERE DEPT_CODE = 'checkup'
  AND DOC_DEL_YN = 'N';

-- 2. DEPT_CODES JSON 배열 내 'checkup' 값 교체
--    예) ["checkup"] → ["hpcenter"]
--    예) ["checkup","hpcenter"] → ["hpcenter","hpcenter"]  (중복은 Step 3에서 확인 후 관리자 편집으로 정리)
UPDATE doctor_tbl
SET
    DEPT_CODES = REPLACE(DEPT_CODES, '"checkup"', '"hpcenter"'),
    UPDATEDATE = NOW()
WHERE JSON_SEARCH(DEPT_CODES, 'one', 'checkup') IS NOT NULL
  AND DOC_DEL_YN = 'N';

-- 3. 결과 확인
SELECT DOC_IDX, DEPT_CODE, DEPT_CODES, DOC_NAME
FROM doctor_tbl
WHERE (DEPT_CODE = 'hpcenter' OR JSON_SEARCH(DEPT_CODES, 'one', 'hpcenter') IS NOT NULL)
  AND DOC_DEL_YN = 'N'
ORDER BY DOC_IDX;
