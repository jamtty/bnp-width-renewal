-- ============================================================
-- 의료진 관리 테이블
-- ============================================================

-- 의료진 기본 정보
CREATE TABLE IF NOT EXISTS doctor_tbl (
  DOC_IDX       INT          NOT NULL AUTO_INCREMENT COMMENT '의료진 고유번호',
  DEPT_CODE     VARCHAR(50)  NOT NULL                COMMENT '진료과 코드 (internal, cardiology, ...)',
  DOC_NAME      VARCHAR(100) NOT NULL                COMMENT '의사 이름 (예: 이학수)',
  DOC_TITLE     VARCHAR(100) NULL                    COMMENT '직함 (예: 원장, 진료과장)',
  DOC_MAJOR     VARCHAR(200) NULL                    COMMENT '진료과목 (예: 내과)',
  DOC_SPECIALTY TEXT         NULL                    COMMENT '진료분야 (줄바꿈 구분)',
  DOC_CAREER    TEXT         NULL                    COMMENT '약력/학력 및 경력 (줄바꿈 구분)',
  SCHEDULE_JSON JSON         NULL                    COMMENT '진료일정 JSON {"am":{...},"pm":{...}}',
  CAREER_LABEL  VARCHAR(50)  NULL DEFAULT '약력'     COMMENT '약력 레이블 (약력 / 학력 및 경력)',
  DOC_USE_YN    CHAR(1)      NOT NULL DEFAULT 'Y'    COMMENT '사용여부',
  DOC_SORT_ORDER INT         NOT NULL DEFAULT 1      COMMENT '정렬순서',
  DOC_DEL_YN    CHAR(1)      NOT NULL DEFAULT 'N'    COMMENT '삭제여부',
  IN_MEM_ID     VARCHAR(100) NULL                    COMMENT '등록자',
  INPUTDATE     DATETIME     NULL DEFAULT NOW()      COMMENT '등록일시',
  UP_MEM_ID     VARCHAR(100) NULL                    COMMENT '수정자',
  UPDATEDATE    DATETIME     NULL                    COMMENT '수정일시',
  DELDATE       DATETIME     NULL                    COMMENT '삭제일시',
  PRIMARY KEY (DOC_IDX)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='의료진 기본정보';

-- 의료진 이미지 파일
CREATE TABLE IF NOT EXISTS doctor_file_tbl (
  FILE_IDX   INT          NOT NULL AUTO_INCREMENT COMMENT '파일 고유번호',
  DOC_IDX    INT          NOT NULL                COMMENT '의료진 고유번호',
  ORI_NAME   VARCHAR(255) NULL                    COMMENT '원본 파일명',
  SAVE_NAME  VARCHAR(255) NULL                    COMMENT '저장 파일명',
  FILE_PATH  VARCHAR(500) NULL                    COMMENT '저장 경로',
  FILE_SIZE  INT          NULL                    COMMENT '파일 크기 (bytes)',
  FILE_EXT   VARCHAR(20)  NULL                    COMMENT '파일 확장자',
  INPUTDATE  DATETIME     NULL DEFAULT NOW()      COMMENT '등록일시',
  PRIMARY KEY (FILE_IDX)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='의료진 이미지 파일';

-- ============================================================
-- 샘플 데이터 (기존 하드코딩 의사들)
-- SCHEDULE_JSON 예시:
-- {"am":{"mon":"전화문의","tue":"전화문의","wed":"전화문의","thu":"OFF","fri":"전화문의","sat13":"전화문의","sat24":"전화문의","sat5":"전화문의"},
--  "pm":{"mon":"전화문의","tue":"전화문의","wed":"전화문의","thu":"OFF","fri":"전화문의","sat13":"-","sat24":"-","sat5":"-"}}
-- ============================================================
