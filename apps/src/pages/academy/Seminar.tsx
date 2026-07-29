import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy8.png';
const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>관계 리디자인 세미나</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="관계 리디자인 세미나" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>관계는 바꿀 수 있습니다</h3>
                <p>
                    반복되는 갈등과 거리감은사람의 문제가 아니라 관계 패턴의 문제일 수 있습니다.<br />
                    관계를 이해하고, 실제로 변화시키는 대화와 연결의 방법을 배웁니다.
                </p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>부부 프로그램</h3>
                </div>
                <div className="bg">
                    <div className='s_info'>
                        <p className="top">부부: 다시, 연결되다.<br />“사랑하지만, 왜 자꾸 멀어질까요?”</p>
                        <ul className='ul_list_1_2'>
                            <li>반복되는 갈등 패턴 이해</li>
                            <li>감정을 전달하는 대화 방식 이해</li>
                            <li>관계 회복 대화 실전 연습</li>
                        </ul>
                    </div>
                    <div className="s_info2">
                        <p>서로를 다시 이해하고<br />연결되는 경험</p>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>부모 프로그램</h3>
                </div>
                <div className="bg">
                    <div className='s_info'>
                        <p className="top">마음을 읽는 부모<br />“아이를 바꾸기보다, 아이의 마음을 먼저 이해합니다”</p>
                        <ul className='ul_list_1_2'>
                            <li>아이 행동 뒤에 있는 감정 이해</li>
                            <li>훈육이 아닌 관계 중심 양육</li>
                            <li>부모-자녀 갈등을 줄이는 대화법</li>
                        </ul>
                    </div>
                    <div className="s_info2">
                        <p>아이와의 관계가<br />달라지는 부모 코칭</p>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>가족 프로그램</h3>
                </div>
                <div className="bg">
                    <div className='s_info'>
                        <p className="top">세대 간 회복<br />“가까워야 할 가족이 가장 어려운 이유”</p>
                        <ul className='ul_list_1_2'>
                            <li>세대 간 가치관 차이 이해</li>
                            <li>가족 내 감정 패턴 분석</li>
                            <li>관계를 회복하는 소통 방식</li>
                        </ul>
                    </div>
                    <div className="s_info2">
                        <p>가족 관계를<br />다시 연결하는 경험</p>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>코칭 프로그램 제안서 요청하기</button>
                <button type="button" className='btn_secondary'>비즈니스 미팅 신청</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
