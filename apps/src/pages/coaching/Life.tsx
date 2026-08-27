import AnimatedSection from '../../components/AnimatedSection';
import img_coaching from '../../assets/images/img_coaching_features3.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>라이프 코칭</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_coaching} alt="라이프 코칭" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>삶의 균형과 방향을 다시 설계합니다</h3>
                <p>열심히 살아왔지만 지금의 방식으로는 더 이상 만족스럽지 않을 때,<span className='pc_br'></span>
나에게 중요한 것이 무엇인지 돌아보고 삶의 우선순위와 방향을 다시 설계합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>대상</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>삶의 방향과 목표가 막막한 사람</li>
                        <li>일과 삶의 균형을 다시 찾고 싶은 사람</li>
                        <li>변화가 필요하지만 어디서부터 시작할지 모르는 사람</li>
                        <li>삶의 의미와 동기를 잃은 사람</li>
                        <li>새로운 전환기를 준비하는 사람</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>핵심 영역</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>자기이해</li>
                        <li>삶의 우선순위</li>
                        <li>일과 관계의 균형</li>
                        <li>가치와 의미</li>
                        <li>목표 재설계</li>
                        <li>실행과 변화</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>무엇이 달라지나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>삶에서 중요한 것이 명확해집니다.</li>
                        <li>나에게 맞는 선택의 기준을 세웁니다.</li>
                        <li>일과 관계, 나 자신 사이의 균형을 찾아갑니다.</li>
                        <li>막연한 고민을 구체적인 목표와 실행으로 연결합니다.</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>위드원만의 차별성</h3>
                </div>
                <div className='s_info'>
                    <p className="top">더 많이 하는 삶이 아니라, 더 나답게 살아가는 삶을 설계합니다.</p>
                    <ul className='ul_list_2'>
                        <li>심리학적 자기이해와 코칭의 통합</li>
                        <li>기질·성격·가치를 고려한 맞춤 전략</li>
                        <li>실행 가능한 변화 계획 설계</li>
                        <li>지속 가능한 삶의 구조 만들기</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <a href="http://pf.kakao.com/_AXwJn/chat" target="_blank" rel="noopener noreferrer" className='btn_primary'>코칭 상담 신청하기</a>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
