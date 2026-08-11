-- 협력기관(파트너) 로고 관리 테이블
CREATE TABLE IF NOT EXISTS `partner_tbl` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(100) DEFAULT '' COMMENT '업체명',
  `img_ori_name` VARCHAR(255) DEFAULT '' COMMENT '원본 파일명',
  `img_save_name` VARCHAR(255) DEFAULT '' COMMENT '저장 파일명',
  `img_url` VARCHAR(500) DEFAULT '' COMMENT '이미지 URL',
  `sort_order` INT NOT NULL DEFAULT 1 COMMENT '정렬 순서',
  `display_yn` ENUM('Y','N') NOT NULL DEFAULT 'Y' COMMENT '노출 여부',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_display_sort` (`display_yn`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='협력기관 로고';

-- 기존 협력기관 로고 10개 시드 데이터
INSERT INTO `partner_tbl` (`company_name`, `img_ori_name`, `img_save_name`, `img_url`, `sort_order`, `display_yn`) VALUES
('파트너사 1', 'ico_partner_1.svg', 'ico_partner_1.svg', '/uploads/partner/ico_partner_1.svg', 1, 'Y'),
('파트너사 2', 'ico_partner_2.svg', 'ico_partner_2.svg', '/uploads/partner/ico_partner_2.svg', 2, 'Y'),
('파트너사 3', 'ico_partner_3.svg', 'ico_partner_3.svg', '/uploads/partner/ico_partner_3.svg', 3, 'Y'),
('파트너사 4', 'ico_partner_4.svg', 'ico_partner_4.svg', '/uploads/partner/ico_partner_4.svg', 4, 'Y'),
('파트너사 5', 'ico_partner_5.svg', 'ico_partner_5.svg', '/uploads/partner/ico_partner_5.svg', 5, 'Y'),
('파트너사 6', 'ico_partner_6.svg', 'ico_partner_6.svg', '/uploads/partner/ico_partner_6.svg', 6, 'Y'),
('파트너사 7', 'ico_partner_7.svg', 'ico_partner_7.svg', '/uploads/partner/ico_partner_7.svg', 7, 'Y'),
('파트너사 8', 'ico_partner_8.svg', 'ico_partner_8.svg', '/uploads/partner/ico_partner_8.svg', 8, 'Y'),
('파트너사 9', 'ico_partner_9.svg', 'ico_partner_9.svg', '/uploads/partner/ico_partner_9.svg', 9, 'Y'),
('파트너사 10', 'ico_partner_10.svg', 'ico_partner_10.svg', '/uploads/partner/ico_partner_10.svg', 10, 'Y');
