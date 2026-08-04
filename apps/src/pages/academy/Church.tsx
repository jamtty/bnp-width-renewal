import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy6.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>교회·사역자 교육 프로그램</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="교회·사역자 교육 프로그램" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>사람을 돌보는 교회, 관계가 살아나는 공동체</h3>
                <p>신앙생활과 사역 속에서도 마음은 지치고 관계는 어려워질 수 있습니다.<br />
                WithOne은 심리학과 기독교적 가치를 바탕으로 자기돌봄과 관계대화를 통해<span className='pc_br'></span>개인의 회복과 건강한 공동체를 돕는 교육 프로그램을 제공합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>자기돌봄 프로그램</h3>
                </div>
                <div className='s_info'>
                    <p className="top">나를 돌보는 것은, 더 오래 사랑하기 위한 시작입니다</p>
                    <ul className='ul_list_1'>
                        <li>내 마음과 감정 알아차리기</li>
                        <li>몸이 보내는 스트레스 신호 이해하기</li>
                        <li>소진과 번아웃 예방하기</li>
                        <li>건강한 경계 세우기</li>
                        <li>죄책감 없이 나를 돌보는 연습</li>
                        <li>신앙과 일상 속 자기돌봄 실천</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>관계대화 프로그램</h3>
                </div>
                <div className='s_info'>
                    <p className="top">말을 바꾸기 전에, 마음을 이해합니다</p>
                    <ul className='ul_list_1'>
                        <li>나와 상대의 감정 이해하기</li>
                        <li>관계에서 반복되는 나의 패턴 발견하기</li>
                        <li>상대의 마음을 듣는 공감적 경청</li>
                        <li>상처를 주지 않고 내 마음 표현하기</li>
                        <li>갈등 상황에서 건강하게 대화하기</li>
                        <li>사랑하면서도 건강한 경계 세우기</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>교회 관계 회복 프로그램</h3>
                </div>
                <div className='s_info'>
                    <p className="top">갈등을 피하는 공동체가 아니라, 갈등을 건강하게 다루는 공동체로</p>
                    <ul className='ul_list_1'>
                        <li>목회자·리더 관계대화</li>
                        <li>장로·권사·집사·사역팀 갈등관리</li>
                        <li>성도 간 관계회복과 소통</li>
                        <li>세대 간 관계와 소통</li>
                        <li>건강한 공동체를 위한 관계 경계</li>
                        <li>교회 공동체 관계회복 워크숍</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>사역자 회복 프로그램</h3>
                </div>
                <div className='s_info'>
                    <p className="top">사역자를 지키는 것이, 교회를 건강하게 세우는 일입니다</p>
                    <ul className='ul_list_1'>
                        <li>목회자·사역자 자기돌봄</li>
                        <li>사역자 번아웃 예방과 회복</li>
                        <li>선교사 디브리핑과 회복</li>
                        <li>사역자 부부 관계회복</li>
                        <li>목회자·사역자 관계 스트레스 관리</li>
                        <li>소명과 삶의 방향 재정립</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>대상별 맞춤 프로그램</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>목회자 · 사모 · 교역자</li>
                        <li>장로 · 권사 · 집사 · 교회 리더</li>
                        <li>선교사 · 선교단체</li>
                        <li>청년부 · 대학부</li>
                        <li>부부 · 부모 · 가족</li>
                        <li>교회 소그룹 · 사역팀</li>
                    </ul>
                </div>
                <img src={ico_box_bg5} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>교회·사역자 교육 프로그램 제안 요청하기</button>
                <button type="button" className='btn_secondary'>교회 맞춤 프로그램 문의하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
