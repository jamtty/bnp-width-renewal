-- 건강상담 첨부파일 테이블
CREATE TABLE IF NOT EXISTS consultation_file (
    id         INT          NOT NULL AUTO_INCREMENT,
    ad_idx     INT          NOT NULL COMMENT '건강상담 AD_IDX (consultation_tbl.AD_IDX)',
    ori_name   VARCHAR(255) NOT NULL COMMENT '원본 파일명',
    save_name  VARCHAR(100) NOT NULL COMMENT '저장 파일명 (랜덤 hex)',
    file_path  VARCHAR(500) NOT NULL COMMENT '서버 절대 경로',
    file_size  INT          NOT NULL DEFAULT 0 COMMENT '파일 크기 (bytes)',
    file_ext   VARCHAR(20)  NOT NULL DEFAULT '' COMMENT '확장자',
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_ad_idx (ad_idx)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='건강상담 첨부파일 (consultation_file)';
