import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy7.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>기관·기업 교육 프로그램</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="기관·기업 교육 프로그램" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>사람이 성장하면, 조직의 가능성이 커집니다</h3>
                <p>
                    조직의 변화는 제도만으로 이루어지지 않습니다.<br />
                    WithOne은 심리학과 관계 전문성을 기반으로 구성원의<span className='pc_br'></span>자기돌봄·관계대화·리더십·소통과 협업을 돕는 맞춤형 교육과 워크숍을 제공합니다.
                </p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>자기돌봄 & 번아웃 예방</h3>
                </div>
                <div className='s_info'>
                    <p className="top">지치지 않고 오래 일할 수 있는 힘을 만듭니다</p>
                    <ul className='ul_list_1'>
                        <li>직장인을 위한 자기돌봄</li>
                        <li>스트레스와 감정관리</li>
                        <li>번아웃 예방과 회복</li>
                        <li>회복탄력성 강화</li>
                        <li>일과 삶의 균형</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>관계대화 & 소통</h3>
                </div>
                <div className='s_info'>
                    <p className="top">좋은 조직은 말이 많은 조직이 아니라, 대화가 되는 조직입니다</p>
                    <ul className='ul_list_1'>
                        <li>나와 다른 사람을 이해하는 관계대화</li>
                        <li>갈등을 줄이는 감정 소통</li>
                        <li>건강한 자기표현과 경청</li>
                        <li>세대 간 소통과 관계 이해</li>
                        <li>피드백과 대화의 기술</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>리더십 교육</h3>
                </div>
                <div className='s_info'>
                    <p className="top">사람을 움직이는 리더십은 관계에서 시작됩니다</p>
                    <ul className='ul_list_1'>
                        <li>리더의 자기이해와 리더십 스타일</li>
                        <li>관계 중심 리더십</li>
                        <li>갈등을 다루는 리더의 대화법</li>
                        <li>리더·팀원 간 신뢰 형성</li>
                        <li>감정과 관계를 읽는 리더십</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>팀워크 & 협업</h3>
                </div>
                <div className='s_info'>
                    <p className="top">함께 일하는 방식을 바꾸면 조직이 달라집니다</p>
                    <ul className='ul_list_1'>
                        <li>팀 내 관계 이해</li>
                        <li>갈등관리와 문제해결</li>
                        <li>심리적 안전감과 신뢰</li>
                        <li>소통과 협업 역량 강화</li>
                        <li>건강한 조직문화 만들기</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>생애·커리어 지원</h3>
                </div>
                <div className='s_info'>
                    <p className="top">구성원의 성장이 조직의 지속 가능한 성장으로 이어집니다</p>
                    <ul className='ul_list_1'>
                        <li>커리어와 삶의 방향 설계</li>
                        <li>중간관리자 역할 전환</li>
                        <li>중년기와 생애전환</li>
                        <li>퇴직·은퇴 준비</li>
                        <li>일과 삶의 의미 찾기</li>
                    </ul>
                </div>
                <img src={ico_box_bg5} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>WithOne 맞춤 교육</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>기관·기업별 요구에 따른 맞춤 프로그램 설계</li>
                        <li>특강 · 워크숍 · 집단 프로그램 운영</li>
                        <li>심리학 기반 전문 콘텐츠</li>
                        <li>실제 사례와 참여 중심 교육</li>
                        <li>상담 · EAP · 코칭 프로그램 연계 가능</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>기관·기업 교육 프로그램 제안서 요청하기</button>
                <button type="button" className='btn_secondary'>맞춤 교육 문의하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
