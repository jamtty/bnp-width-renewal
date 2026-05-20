-- =====================================================
-- 게시판 공통 테이블 (board_tbl)
-- BMT_IDX 매핑:
--   1 = 공지사항
--   2 = 보도자료
--   3 = 자료실
--   4 = 홈블로
--   5 = 채용정보
--   7 = 건강정보
--   8 = 메디TV
-- =====================================================

CREATE TABLE IF NOT EXISTS `board_tbl` (
  `BD_IDX`       INT          NOT NULL                     COMMENT '게시글 번호 (수동 채번)',
  `BMT_IDX`      INT          NOT NULL                     COMMENT '게시판 타입 (board_master_tbl.BMT_IDX)',
  `BD_TITLE`     VARCHAR(500) NOT NULL DEFAULT ''          COMMENT '제목',
  `BD_CONTENT`   LONGTEXT                                  COMMENT '내용',
  `IN_MEM_ID`    VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '등록자 ID',
  `UP_MEM_ID`    VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '수정자 ID',
  `BD_WRITER`    VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '작성자명',
  `BD_DEL_FLAG`  CHAR(1)      NOT NULL DEFAULT 'N'         COMMENT '삭제 여부 (N:정상, Y:삭제)',
  `BD_NOTICE_YN` CHAR(1)      NOT NULL DEFAULT 'N'         COMMENT '공지(고정) 여부 (N:일반, Y:공지)',
  `BD_VIEW`      INT          NOT NULL DEFAULT 0           COMMENT '조회수',
  `BD_IP`        VARCHAR(50)  NOT NULL DEFAULT ''          COMMENT '등록 IP',
  `BD_ORD`       INT          NOT NULL DEFAULT 0           COMMENT '정렬 순서',
  `BD_REP_DEPTH` INT          NOT NULL DEFAULT 0           COMMENT '답변 깊이',
  `BD_STEP`      INT          NOT NULL DEFAULT 0           COMMENT '답변 단계',
  `BD_ORD_NEW`   INT          NOT NULL DEFAULT 1           COMMENT '신규 정렬 순서',
  `BD_FIELD_1`   VARCHAR(500)          DEFAULT NULL        COMMENT '추가 필드1 (보도자료: 언론사명)',
  `BD_FIELD_2`   VARCHAR(1000)         DEFAULT NULL        COMMENT '추가 필드2 (보도자료: 원문링크)',
  `BD_FIELD_3`   VARCHAR(500)          DEFAULT NULL        COMMENT '추가 필드3 (예비)',
  `INPUTDATE`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  `UPDATEDATE`   DATETIME              DEFAULT NULL        COMMENT '수정일시',
  `DELDATE`      DATETIME              DEFAULT NULL        COMMENT '삭제일시',
  PRIMARY KEY (`BD_IDX`),
  INDEX `idx_bmt_del`    (`BMT_IDX`, `BD_DEL_FLAG`),
  INDEX `idx_bmt_notice` (`BMT_IDX`, `BD_DEL_FLAG`, `BD_NOTICE_YN`),
  INDEX `idx_inputdate`  (`INPUTDATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='게시판 공통 테이블';


-- =====================================================
-- 공지사항 첨부파일 테이블 (notice_file)
-- =====================================================

CREATE TABLE IF NOT EXISTS `notice_file` (
  `id`         INT          NOT NULL AUTO_INCREMENT      COMMENT '파일 번호',
  `notice_id`  INT          NOT NULL                     COMMENT '공지사항 BD_IDX',
  `ori_name`   VARCHAR(255) NOT NULL DEFAULT ''          COMMENT '원본 파일명',
  `save_name`  VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '저장 파일명 (랜덤 hex)',
  `file_path`  VARCHAR(500) NOT NULL DEFAULT ''          COMMENT '서버 절대 경로',
  `file_size`  INT          NOT NULL DEFAULT 0           COMMENT '파일 크기 (bytes)',
  `file_ext`   VARCHAR(20)  NOT NULL DEFAULT ''          COMMENT '확장자',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  PRIMARY KEY (`id`),
  INDEX `idx_notice_id` (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='공지사항 첨부파일';


-- =====================================================
-- 소식 테이블 (news)
-- =====================================================

CREATE TABLE IF NOT EXISTS `news` (
  `id`          INT          NOT NULL AUTO_INCREMENT      COMMENT '소식 번호',
  `title`       VARCHAR(500) NOT NULL DEFAULT ''          COMMENT '제목',
  `content`     LONGTEXT                                  COMMENT '내용',
  `author_id`   VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '작성자 ID',
  `author_name` VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '작성자명',
  `view_count`  INT          NOT NULL DEFAULT 0           COMMENT '조회수',
  `is_deleted`  TINYINT(1)   NOT NULL DEFAULT 0           COMMENT '삭제 여부 (0:정상, 1:삭제)',
  `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  `updated_at`  DATETIME              DEFAULT NULL        COMMENT '수정일시',
  PRIMARY KEY (`id`),
  INDEX `idx_is_deleted` (`is_deleted`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='소식';


-- =====================================================
-- 소식 첨부파일 테이블 (news_file)
-- =====================================================

CREATE TABLE IF NOT EXISTS `news_file` (
  `id`         INT          NOT NULL AUTO_INCREMENT      COMMENT '파일 번호',
  `news_id`    INT          NOT NULL                     COMMENT '소식 id',
  `ori_name`   VARCHAR(255) NOT NULL DEFAULT ''          COMMENT '원본 파일명',
  `save_name`  VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '저장 파일명 (랜덤 hex)',
  `file_path`  VARCHAR(500) NOT NULL DEFAULT ''          COMMENT '서버 절대 경로',
  `file_size`  INT          NOT NULL DEFAULT 0           COMMENT '파일 크기 (bytes)',
  `file_ext`   VARCHAR(20)  NOT NULL DEFAULT ''          COMMENT '확장자',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  PRIMARY KEY (`id`),
  INDEX `idx_news_id` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='소식 첨부파일';


-- =====================================================
-- 사업보고 테이블 (report)
-- =====================================================

CREATE TABLE IF NOT EXISTS `report` (
  `id`          INT          NOT NULL AUTO_INCREMENT      COMMENT '보고 번호',
  `title`       VARCHAR(500) NOT NULL DEFAULT ''          COMMENT '제목',
  `content`     LONGTEXT                                  COMMENT '내용',
  `author_id`   VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '작성자 ID',
  `author_name` VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '작성자명',
  `view_count`  INT          NOT NULL DEFAULT 0           COMMENT '조회수',
  `is_deleted`  TINYINT(1)   NOT NULL DEFAULT 0           COMMENT '삭제 여부 (0:정상, 1:삭제)',
  `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  `updated_at`  DATETIME              DEFAULT NULL        COMMENT '수정일시',
  PRIMARY KEY (`id`),
  INDEX `idx_is_deleted` (`is_deleted`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='사업보고';


-- =====================================================
-- 사업보고 첨부파일 테이블 (report_file)
-- =====================================================

CREATE TABLE IF NOT EXISTS `report_file` (
  `id`         INT          NOT NULL AUTO_INCREMENT      COMMENT '파일 번호',
  `report_id`  INT          NOT NULL                     COMMENT '사업보고 id',
  `ori_name`   VARCHAR(255) NOT NULL DEFAULT ''          COMMENT '원본 파일명',
  `save_name`  VARCHAR(100) NOT NULL DEFAULT ''          COMMENT '저장 파일명 (랜덤 hex)',
  `file_path`  VARCHAR(500) NOT NULL DEFAULT ''          COMMENT '서버 절대 경로',
  `file_size`  INT          NOT NULL DEFAULT 0           COMMENT '파일 크기 (bytes)',
  `file_ext`   VARCHAR(20)  NOT NULL DEFAULT ''          COMMENT '확장자',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
  PRIMARY KEY (`id`),
  INDEX `idx_report_id` (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='사업보고 첨부파일';
