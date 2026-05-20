-- =====================================================
-- board_tbl FK 제약 조건 해제
-- board_mst_tbl 참조 FK (R_38) 제거
-- 이유: 신규 DB 구조(board_tbl.sql)에는 FK 없음
--       기존 마이그레이션 DB에만 R_38 제약이 남아 있어
--       공지사항/보도자료/채용/건강정보 등록 시 오류 발생
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- MariaDB 10.4+ / MySQL 8.0+ 대응: IF EXISTS 지원
-- 구버전에서는 아래 주석 해제 후 실행
-- ALTER TABLE `board_tbl` DROP FOREIGN KEY `R_38`;

ALTER TABLE `board_tbl`
  DROP FOREIGN KEY IF EXISTS `R_38`;

SET FOREIGN_KEY_CHECKS = 1;
