-- =====================================================
-- 공지사항 board_tbl 연동을 위한 마이그레이션
-- notice_file 테이블의 FK 제약을 board_tbl.BD_IDX 기반으로 변경
-- 실행 전 반드시 백업을 진행하세요.
-- =====================================================

-- 1. 기존 notice_file FK 제약 제거
--    (notice 테이블의 id를 참조하던 FK 삭제)
ALTER TABLE `notice_file`
    DROP FOREIGN KEY `fk_notice_file_notice_id`;

-- 2. notice_file.notice_id → board_tbl.BD_IDX 를 참조하는 새 FK 추가
--    board_tbl에는 BD_DEL_FLAG로 삭제 관리하므로 CASCADE 대신 NO ACTION 사용
ALTER TABLE `notice_file`
    ADD CONSTRAINT `fk_notice_file_board_bd_idx`
    FOREIGN KEY (`notice_id`) REFERENCES `board_tbl` (`BD_IDX`)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 3. 확인 쿼리: board_tbl (BMT_IDX=1) 공지사항 건수
-- SELECT COUNT(*) FROM board_tbl WHERE BMT_IDX = 1 AND BD_DEL_FLAG = 'N';

-- 4. 확인 쿼리: 고정글(공지) 건수
-- SELECT COUNT(*) FROM board_tbl WHERE BMT_IDX = 1 AND BD_DEL_FLAG = 'N' AND BD_NOTICE_YN = 'Y';
