-- 건강증진센터 파일 관리 테이블
CREATE TABLE IF NOT EXISTS `well_file_tbl` (
  `WF_IDX`       INT          NOT NULL AUTO_INCREMENT COMMENT '파일 IDX',
  `WF_MENU_KEY`  VARCHAR(100) NOT NULL                COMMENT '메뉴 키 (예: nhis_form)',
  `WF_LABEL`     VARCHAR(200) NOT NULL                COMMENT '파일 표시 이름',
  `WF_ORI_NAME`  VARCHAR(500) NOT NULL DEFAULT ''     COMMENT '원본 파일명',
  `WF_SAVE_NAME` VARCHAR(500) NOT NULL DEFAULT ''     COMMENT '저장 파일명',
  `WF_FILE_PATH` VARCHAR(500) NOT NULL DEFAULT ''     COMMENT '파일 경로',
  `WF_FILE_SIZE` INT          NOT NULL DEFAULT 0      COMMENT '파일 크기(bytes)',
  `WF_FILE_EXT`  VARCHAR(20)  NOT NULL DEFAULT ''     COMMENT '파일 확장자',
  `WF_USE_YN`    CHAR(1)      NOT NULL DEFAULT 'Y'    COMMENT '사용여부',
  `WF_DEL_YN`    CHAR(1)      NOT NULL DEFAULT 'N'    COMMENT '삭제여부',
  `IN_MEM_ID`    VARCHAR(100) NOT NULL DEFAULT ''     COMMENT '등록자',
  `INPUTDATE`    DATETIME     NOT NULL DEFAULT NOW()  COMMENT '등록일시',
  `UP_MEM_ID`    VARCHAR(100) NOT NULL DEFAULT ''     COMMENT '수정자',
  `UPDATEDATE`   DATETIME                             COMMENT '수정일시',
  PRIMARY KEY (`WF_IDX`),
  KEY `idx_menu_key` (`WF_MENU_KEY`, `WF_DEL_YN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='건강증진센터 파일 관리';

-- 초기 데이터 (암문진표 메뉴 키 등록)
INSERT INTO `well_file_tbl`
  (`WF_MENU_KEY`, `WF_LABEL`, `WF_USE_YN`, `WF_DEL_YN`, `IN_MEM_ID`, `INPUTDATE`)
VALUES
  ('nhis_form', '암 문진표/일반검진 문진표 다운로드', 'N', 'N', 'system', NOW());
