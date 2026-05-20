-- =====================================================
-- 회원(member) 테이블 생성 쿼리
-- =====================================================

CREATE TABLE IF NOT EXISTS `member` (
  `id`         INT(11)      NOT NULL AUTO_INCREMENT COMMENT '번호',
  `login_id`   VARCHAR(100) NOT NULL                COMMENT '로그인 아이디',
  `password`   VARCHAR(255) NOT NULL                COMMENT '비밀번호 (bcrypt)',
  `name`       VARCHAR(100) NOT NULL DEFAULT '관리자' COMMENT '이름',
  `role`       VARCHAR(20)  NOT NULL DEFAULT 'ADMIN' COMMENT '권한',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  `is_deleted` TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '삭제여부',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_login_id` (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='관리자 회원';
