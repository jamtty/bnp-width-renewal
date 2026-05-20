-- 메인 배너 테이블
CREATE TABLE IF NOT EXISTS main_banner_tbl (
  BN_IDX      INT          NOT NULL,
  BN_LINK     VARCHAR(500) NOT NULL DEFAULT '' COMMENT '링크 URL',
  BN_LINK_TARGET CHAR(1)  NOT NULL DEFAULT 'S' COMMENT 'S:_self, B:_blank',
  BN_USE_YN   CHAR(1)      NOT NULL DEFAULT 'Y' COMMENT 'Y:사용, N:미사용',
  BN_ORD      INT          NOT NULL DEFAULT 1   COMMENT '정렬순서',
  IN_MEM_ID   VARCHAR(100) NOT NULL DEFAULT '' COMMENT '등록자',
  UP_MEM_ID   VARCHAR(100)          DEFAULT NULL COMMENT '수정자',
  INPUTDATE   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  UPDATEDATE  DATETIME              DEFAULT NULL COMMENT '수정일',
  DELDATE     DATETIME              DEFAULT NULL COMMENT '삭제일',
  BN_DEL_YN   CHAR(1)      NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  PRIMARY KEY (BN_IDX)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='메인 배너';

-- 기존 테이블에 BN_TITLE 컴럼이 있는 경우 제거
-- ALTER TABLE main_banner_tbl DROP COLUMN IF EXISTS BN_TITLE;

-- 메인 배너 파일 테이블
CREATE TABLE IF NOT EXISTS main_banner_file (
  id        INT          NOT NULL AUTO_INCREMENT,
  bn_id     INT          NOT NULL COMMENT '배너 ID',
  ori_name  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '원본파일명',
  save_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT '저장파일명',
  file_path VARCHAR(500) NOT NULL DEFAULT '' COMMENT '파일경로',
  file_size INT          NOT NULL DEFAULT 0   COMMENT '파일크기(byte)',
  file_ext  VARCHAR(20)  NOT NULL DEFAULT '' COMMENT '확장자',
  PRIMARY KEY (id),
  INDEX idx_bn_id (bn_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='메인 배너 파일';
