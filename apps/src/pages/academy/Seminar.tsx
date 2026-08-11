import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy8.png';
const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>관계 리디자인 교육</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="관계 리디자인 교육" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>관계는 이해하는 만큼, 달라질 수 있습니다</h3>
                <p>
                    반복되는 갈등과 거리감은 사람의 문제가 아니라 관계 패턴의 문제일 수 있습니다.<br />
                    나와 상대를 이해하고, 관계를 변화시키는 대화와 연결의 방법을 배우는 일반인 대상 관계교육 프로그램입니다.
                </p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>연애 프로그램</h3>
                </div>
                <div className="bg">
                    <div className='s_info'>
                        <p className="top">“좋아하는 마음만으로 좋은 관계가 만들어질까요?”</p>
                        <ul className='ul_list_1_2'>
                            <li>나의 연애·애착 패턴 이해</li>
                            <li>건강한 관계와 위험한 관계 구별</li>
                            <li>감정과 욕구를 표현하는 대화법</li>
                            <li>갈등과 경계를 다루는 방법</li>
                            <li>건강한 사랑과 관계 만들기</li>
                        </ul>
                    </div>
                    <div className="s_info2">
                        <p>사랑에도 연습이<br />필요합니다</p>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>예비부부 프로그램</h3>
                </div>
                <div className="bg">
                    <div className='s_info'>
                        <p className="top">“우리는 함께 살아갈 준비가 되어 있을까요?”</p>
                        <ul className='ul_list_1_2'>
                            <li>나의 연애·애착 패턴 이해</li>
                            <li>건강한 관계와 위험한 관계 구별</li>
                            <li>감정과 욕구를 표현하는 대화법</li>
                            <li>갈등과 경계를 다루는 방법</li>
                            <li>건강한 사랑과 관계 만들기</li>
                        </ul>
                    </div>
                    <div className="s_info2">
                        <p>결혼 전, 사랑보다<br />먼저 알아야 할 것들</p>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>부부 프로그램</h3>
                </div>
                <div className="bg">
                    <div className='s_info'>
                        <p className="top">“사랑하지만, 왜 자꾸 멀어질까요?”</p>
                        <ul className='ul_list_1_2'>
                            <li>반복되는 부부 갈등 패턴 이해</li>
                            <li>서로의 감정과 욕구 이해</li>
                            <li>상처를 줄이는 대화법</li>
                            <li>관계 회복 대화 실습</li>
                        </ul>
                    </div>
                    <div className="s_info2">
                        <p>부부, 다시 연결되다</p>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>부모 프로그램</h3>
                </div>
                <div className="bg">
                    <div className='s_info'>
                        <p className="top">“아이를 바꾸기보다, 아이의 마음을 먼저 이해합니다”</p>
                        <ul className='ul_list_1_2'>
                            <li>아이의 행동 뒤에 있는 감정 이해</li>
                            <li>관계 중심의 건강한 훈육</li>
                            <li>부모의 감정과 반응 패턴 이해</li>
                            <li>부모·자녀 갈등을 줄이는 대화법</li>
                        </ul>
                    </div>
                    <div className="s_info2">
                        <p>마음을 읽는 부모</p>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>가족 프로그램</h3>
                </div>
                <div className="bg">
                    <div className='s_info'>
                        <p className="top">“가까워야 할 가족이 가장 어려운 이유”</p>
                        <ul className='ul_list_1_2'>
                            <li>세대 간 가치관과 관계 차이 이해</li>
                            <li>가족 안에서 반복되는 감정·관계 패턴 이해</li>
                            <li>건강한 경계와 역할 설정</li>
                            <li>가족 관계를 회복하는 소통 방식</li>
                        </ul>
                    </div>
                    <div className="s_info2">
                        <p>가족, 다시 연결되다</p>
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>관계 리디자인 세미나 신청하기</button>
                <button type="button" className='btn_secondary'>교육 일정 확인하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
