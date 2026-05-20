-- ============================================================
-- 기존 하드코딩 의료진 시드 데이터
-- 실행 전 doctor_tbl, doctor_file_tbl 생성 필요
-- 이미지 파일은 uploads/doctor/ 경로에 복사되어 있어야 함
-- ============================================================

SET NAMES utf8mb4;

-- 기존 동일 데이터 정리
DELETE df FROM doctor_file_tbl df INNER JOIN doctor_tbl d ON d.DOC_IDX = df.DOC_IDX WHERE d.IN_MEM_ID = 'seed:hardcoded';
DELETE FROM doctor_tbl WHERE IN_MEM_ID = 'seed:hardcoded';

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (1, 'internal', '이학수', '원장', '내과', NULL, '한양대학교 학사 석사 박사
대한초음파학회 회원', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (1, 1, 'ms_lhs.jpg', 'ms_lhs.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (2, 'internal', '이성희', '진료과장', '내과', NULL, '한양대학교 의과대학원 석/박사
한양대학교병원 소화기 내과 전임의
소화기내시경학회 정회원', NULL, '약력', 'Y', 2, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (2, 2, 'ms_lsh.jpg', 'ms_lsh.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (3, 'internal', '박호용', '내과계 진료부원장', '내과', NULL, '한양대학교 의과대학원 석사
삼성서울병원 소화기 내과 임상강사
소화기 내과 학회 정회원
소화기내시경학회 정회원', NULL, '약력', 'Y', 3, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (3, 3, 'ms_phy.jpg', 'ms_phy.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (4, 'internal', '이상일', '진료과장', '내과', NULL, '동국대의대 졸업
성균관의대 내과 외래교수
내과학회 정회원
한국 심장초음파학회 정회원', NULL, '약력', 'Y', 4, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (4, 4, 'ms_lsi.jpg', 'ms_lsi.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (5, 'cardiology', '최정호', '진료과장', '심장내과', NULL, '연세대학교 의과대학 졸업
연세대학교 의과대학원 석사
신촌 세브란스병원 심장혈관 병원 전임의
인천국제성모병원 심장내과 교수', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (5, 5, 'ms_cjh.jpg', 'ms_cjh.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (6, 'respiratory', '이요한', '진료과장', '호흡기내과', NULL, '연세대학교 의과대학 학사
연세대학교 대학원 의학석사
연세대학교 세브란스기독병원 수련의/전공의
순천향대학교 서울병원 내과 전임의
검단탑병원 호흡기내과 과장
한림병원 호흡기내과 과장
김포우리병원 호흡기내과 과장
다니엘종합병원 호흡기내과 과장
대한내과학회 평생회원
대한임상초음파학회 평생회원
대한결핵 및 호흡기학회 정회원', NULL, '학력 및 경력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (6, 6, 'ms_LYH.jpg', 'ms_LYH.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (7, 'gastroenterology', '강문수', '진료과장', '소화기내과', NULL, '한양대학교 의학박사
한양대학교 내과전공의
강북삼성의료원 소화기내과 전임의
성균관의대 외래교수
김포우리병원 소화기내과 과장
대한내과학회 평생회원
대한소화기내과학회 평생회원 및 소화기내과분과전문의
대한내시경학회 평생회원 및 내시경인정의
대한췌담도내과학회 평생회원 및 췌담도내시경인정의
대한간학회 정회원', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (7, 7, 'ms_kms.jpg', 'ms_kms.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (8, 'nephrology', '오영승', '진료과장', '신장내과', NULL, '건양대학교 의과대학 졸업
가톨릭 중앙의료원 전공의
순천향대학교 부천병원 신장내과 임상강사', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (8, 8, 'ms_oys.png', 'ms_oys.png', '/uploads/doctor/', 0, 'png', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (9, 'nephrology', '이준한', '진료과장', '신장내과', NULL, '한양대학교 의과대학 졸업
한양대학병원 수련의/전공의
한양대학교 서울병원 신장내과 전임의
한양대학교 구리병원 임상전문교수 (hospitalist)
강남효 요양병원 신장내과 과장
미사강변 요양병원 신장내과 과장
아너스힐 김포병원 신장내과 과장
아너스힐 시흥병원 신장내과 과장
내과전문의
투석 전문의
대한내과학회 정회원
대한신장내과학회 정회원', NULL, '약력', 'Y', 2, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (9, 9, 'ms_ljh260302.jpg', 'ms_ljh260302.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (10, 'rheumatology', '박대진', '진료과장', '류마티스내과', NULL, '한양대학교 의학과 석사, 박사
한양대학교병원 인턴, 레지던트, 전임의
연세대학교 원주세브란스기독병원 임상조교수
前 향남스마트병원 내과 과장 (류마티스내과 전문의)', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (10, 10, 'ms_pdj.png', 'ms_pdj.png', '/uploads/doctor/', 0, 'png', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (11, 'neurology', '김성희', '진료과장', '신경과', NULL, '이화여자대학교 신경과 전공의
분당서울대학교 신경과 전임의 및 진료의사
경북대학교 신경과 임상교수
이화여자대학교 신경과 임상교수
뉴성민병원 신경과 과장', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (11, 11, 'ms_ksh.jpg', 'ms_ksh.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (12, 'neurology', '이서현', '진료과장', '신경과', NULL, '계명대학교 의과대학 졸업
계명대학교 동산병원 전공의
대한신경과학회 정회원', NULL, '약력', 'Y', 2, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (12, 12, 'ms_lsh.png', 'ms_lsh.png', '/uploads/doctor/', 0, 'png', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (13, 'surgery', '이승원', '진료과장', '외과', NULL, '대한외과학회 정회원
대한 항문외과 평생회원
대장내시경 세부전문의', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (13, 13, 'ms_lsw.jpg', 'ms_lsw.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (14, 'obstetrics', '김태용', '진료과장', '산부인과', NULL, '서울대학교 의과대학 졸업
삼성서울병원 수련의
부산문화병원 전공의
분당서울대병원 부인종양 임상강사', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (14, 14, 'ms_kty.jpg', 'ms_kty.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (15, 'orthopedics', '권태형', '원장', '정형외과', NULL, '한양대학교 대학원 석/박사
대한정형외과 학회 평생회원', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (15, 15, 'ms_kth.jpg', 'ms_kth.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (16, 'orthopedics', '이성필', '원장', '정형외과', NULL, '한양대학교병원 수부 및 상지외과 전임의
대한정형외과학회 정회원
대한견관절, 주관절학회 정회원', NULL, '약력', 'Y', 2, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (16, 16, 'ms_lsf.jpg', 'ms_lsf.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (17, 'orthopedics', '서우영', '외과계 진료부원장', '정형외과', NULL, '한양대학교병원 정형외과 임상교수
원주 성지병원 관절센터 과장
대한족부관절학회 기획위원
대한관절경학회 정회원', NULL, '약력', 'Y', 3, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (17, 17, 'ms_swy.jpg', 'ms_swy.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (18, 'orthopedics', '주일한', '진료과장', '정형외과', NULL, '한양대학교병원 견주관절 / 수부 전임의
한양대학교병원 정형외과 외래교수
대한견주관절의학회 정회원
대한수부외과학회 정회원', NULL, '약력', 'Y', 4, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (18, 18, 'ms_jih.jpg', 'ms_jih.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (19, 'orthopedics', '이재호', '진료과장', '정형외과', NULL, '한양대학교병원 외상 및 하지외과 전임의 수료
한양대학교병원 정형외과 외래교수
대한슬관절학회 정회원
대한골절학회 정회원', NULL, '약력', 'Y', 5, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (19, 19, 'ms_ljh.jpg', 'ms_ljh.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (20, 'orthopedics', '이제민', '진료과장', '정형외과', NULL, '정형외과 의학박사
단국대학교병원 정형외과 전임 부교수
단국대학교병원 권역외상센터 외상전담의
분당 서울대학교병원 척추 전임의
대한정형외과학회 정회원
대한척추외과학회 정회원
대한경추연구학회 정회원 (현직 인사위원장)
대한고관절학회 정회원', NULL, '약력', 'Y', 6, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (20, 20, 'ms_ljm.jpg', 'ms_ljm.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (21, 'orthopedics', '최시훈', '진료과장', '정형외과', NULL, '정형외과 의학박사
스포츠의학 인증전문의
한양대학교병원 외상 및 하지외과 전임의 수료
한양대학교병원 정형외과 외래교수
대한정형외과학회 정회원
대한스포츠의학회 정회원
대한골절학회 정회원', NULL, '약력', 'Y', 7, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (21, 21, 'ms_csh.jpg', 'ms_csh.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (22, 'orthopedics', '신성철', '진료과장', '정형외과', NULL, '세브란스병원 인공관절 및 관절경 전임의
연세대학교 의과대학 세브란스병원 외래교수
대한슬관절학회 정회원
대한정형외과 스포츠의학회 정회원
2025 ISAKOS (국제 관절경·스포츠의학회) 구연발표', NULL, '약력', 'Y', 8, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (22, 22, 'ms_ssc.jpg', 'ms_ssc.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (23, 'urology', '김석', '원장', '비뇨의학과', NULL, '한양대학교 의학대학원 박사
을지대학교 의과대학 외래교수
석비뇨기과 원장', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (23, 23, 'ms_ks.jpg', 'ms_ks.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (24, 'painclinic', '권용덕', '진료과장', '신경통증클리닉', NULL, '한양대학교 의과대학 졸업
한양대학교 마취통증의학과 전공의
고려대학교 마취통증의학과 전임의
세연마취통증의학과의원 부원장
서울고든병원 마취통증의학과 원장
대한통증학회 통증분과 인증의
대한통증학회 정회원', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (24, 24, 'ms_kyd.jpg', 'ms_kyd.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (25, 'anesthesiology', '이재기', '진료과장', '마취통증의학과', NULL, '한양대학교 의과대학원 석사
한양대학교 마취통증학과 전공의
마취통증의학회 회원', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (25, 25, 'ms_ljg.jpg', 'ms_ljg.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (26, 'anesthesiology', '조희영', '진료과장', '마취통증의학과', NULL, '한양대학교졸업
한양대학교 전공의
제주한마음병원 진료부원장', NULL, '약력', 'Y', 2, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (26, 26, 'ms_jhy.jpg', 'ms_jhy.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (27, 'labmedicine', '권석운', '과장', '진단검사의학과', NULL, '서울의대 졸업
서울의대 박사
서울대병원 진단검사의학과 전공의, 전임의
서울아산병원 진단검사의학과 교수', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (27, 27, 'ms_ksw.jpg', 'ms_ksw.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (28, 'radiology', '이학수', '원장', '영상의학과', NULL, '한양대학교 학사 석사 박사
을지대학교병원 영상의학과교수
대한방사선의학회 회원
대한초음파학회 회원', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (28, 28, 'ms_lhs.jpg', 'ms_lhs.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (29, 'radiology', '김선미', '진료과장', '영상의학과', NULL, '한양대학교 의과대학 졸업
한일병원 영상의학과 과장
대한초음파 학회 정회원', NULL, '약력', 'Y', 2, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (29, 29, 'ms_ksm.jpg', 'ms_ksm.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (30, 'radiology', '권재현', '진료과장', '영상의학과', NULL, '경북대학교 졸업
경북대학교 전공의
서울아산병원 전임의
동국대 일산병원 영상의학과 교수', NULL, '약력', 'Y', 3, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (30, 30, 'ms_kjh.jpg', 'ms_kjh.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (31, 'emergency', '최규만', '진료실장', '응급의학과', NULL, '연세대학교 공과대학 졸업
국립경상대학교 의학전문대학원 의학석사
국립중앙의료원 인턴 수료
국립중앙의료원 응급의학과 전공의 수료
아산충무병원 응급의학과 과장
한림대학교 강남성심병원 응급의학과 진료교수
밀양윤병원 응급의학과 실장
김포뉴고려병원 응급의학과 과장
대한응급의학과 정회원
대한응급의학과 지도전문의
밀양소방서 구급지도의사
경상남도 구급지도 협의회 위원', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (31, 31, 'ms_cgm.jpg', 'ms_cgm.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (32, 'emergency', '강바우', '진료과장', '응급의학과', NULL, '서울대학교 자연과학대학 생명과학부 졸업
강원대학교 의과대학 의학전문대학원 졸업
강원대학교병원 인턴 수료
강원대학교병원 응급의학과 전공의 수료
응급의학과 전문의', NULL, '약력', 'Y', 2, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (32, 32, 'ms_kbw.jpg', 'ms_kbw.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (33, 'emergency', '조수임', '진료과장', '응급의학과', NULL, '응급의학과 전문의
The University of Sydney, bachelor of medical science 졸업
국립경상대학교 의학전문대학원 의학석사
국립중앙의료원 인턴 수료
국립중앙의료원 응급의학과 전공의 수료', NULL, '약력', 'Y', 3, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (33, 33, 'ms_csi.jpg', 'ms_csi.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (34, 'emergency', '김형규', '진료과장', '응급의학과', NULL, '한림대학교 의학과 졸업
한림대학교 강동성심병원 응급의학과 전공의 수료
삼척의료원 응급의학과 과장
아산충무병원 응급의학과 과장
경기도의료원 수원병원 응급의학과 과장
밀양 윤병원 응급의학과 과장
평택성모병원 응급의학과 과장
충청북도 충주의료원 응급의학과 과장', NULL, '약력', 'Y', 4, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (34, 34, 'ms_khg.jpg', 'ms_khg.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (35, 'emergency', '성강민', '진료과장', '응급의학과', NULL, '응급의학과 전문의
건국대학교병원 전공의
충주건국대병원 임상조교수
추병원 응급실 과장
한일병원 응급실 과장', NULL, '약력', 'Y', 5, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (35, 35, 'ms_skm.jpg', 'ms_skm.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (36, 'emergency', '이상수', '진료과장', '응급의학과', NULL, '충남대학교 의과대학 의학과 졸업
가천대 길병원 응급의학과 전공의 수료
응급의학과 전문의 자격 취득
BLS(Basic Life Support) Provider
ELS-Resuscitation 과정 수료
ELS-Trauma 과정 수료
대한응급의학회 정회원
대한응급의료지도 의사협의회 정회원
전 비에스종합병원 응급의학과 과장', NULL, '약력', 'Y', 6, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (36, 36, 'ms_lss.jpg', 'ms_lss.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (37, 'criticalcare', '안영모', '진료실장', '응급의학과', NULL, '국립 경상대학교 의과대학 학사
가천대학교 의학전문대학 석사
가천대 길병원 응급의학과 전공의 수료
인천 기독병원 과장
가천대 길병원 외래교수
검단 탑종합병원 과장
동군산병원 과장
남양주 현대병원 과장
중앙대학교 병원 외래교수', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (37, 37, 'ms_aym.jpg', 'ms_aym.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

-- ============================================================
-- 건강증진센터(hpcenter) 의료진 시드 데이터
-- ============================================================

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (38, 'hpcenter', '김민주', '진료과장', '검진의학과', NULL, '부산대학교 의학전문대학원 졸업
부산대학교 병원 인턴
인천비아뜨의원 검진의', NULL, '약력', 'Y', 1, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (38, 38, 'ms_1.jpg', 'ms_1.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (39, 'hpcenter', '김선미', '진료과장', '영상의학과', NULL, '한양대학교 의과대학 졸업
한일병원 영상의학과 과장
대한초음파 학회 정회원', NULL, '약력', 'Y', 2, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (39, 39, 'ms_2.png', 'ms_2.png', '/uploads/doctor/', 0, 'png', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (40, 'hpcenter', '권재현', '진료과장', '영상의학과', NULL, '경북대학교 졸업
경북대학교 전공의
서울아산병원 전임의
동국대 일산병원 영상의학과 교수', NULL, '약력', 'Y', 3, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (40, 40, 'ms_kjh.jpg', 'ms_kjh.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (41, 'hpcenter', '이은우', '진료과장', '외과', NULL, '인제대의대졸업
인제대학교일산백병원 외과전문의
국립암센터 대장암센터 내시경아카데미 전임의', NULL, '약력', 'Y', 4, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (41, 41, 'ms_lew.jpg', 'ms_lew.jpg', '/uploads/doctor/', 0, 'jpg', NOW());

INSERT INTO doctor_tbl (DOC_IDX, DEPT_CODE, DOC_NAME, DOC_TITLE, DOC_MAJOR, DOC_SPECIALTY, DOC_CAREER, SCHEDULE_JSON, CAREER_LABEL, DOC_USE_YN, DOC_SORT_ORDER, DOC_DEL_YN, IN_MEM_ID, INPUTDATE) VALUES (42, 'hpcenter', '이창훈', '진료과장', '소화기내과', NULL, '가톨릭관동대학교 의학과 졸업
보라매 서울대병원 소화기내과 전임의
vic365의원,한강연세병원,박원종내과의원 검진내과', NULL, '약력', 'Y', 5, 'N', 'seed:hardcoded', NOW());
INSERT INTO doctor_file_tbl (FILE_IDX, DOC_IDX, ORI_NAME, SAVE_NAME, FILE_PATH, FILE_SIZE, FILE_EXT, INPUTDATE) VALUES (42, 42, 'ms_lch.jpg', 'ms_lch.jpg', '/uploads/doctor/', 0, 'jpg', NOW());
