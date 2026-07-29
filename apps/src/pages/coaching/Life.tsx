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
                <p>열심히 살아왔지만 더 이상 지금의 방식으로는 만족스럽지 않을 때,<span className='pc_br'></span>삶의 우선순위와 방향을 다시 정리합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>대상</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>번아웃을 경험하는 직장인</li>
                        <li>삶의 방향이 막막한 사람</li>
                        <li>일과 삶의 균형이 무너진 사람</li>
                        <li>의미와 동기를 잃은 사람</li>
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
                        <li>자기관리</li>
                        <li>감정조절</li>
                        <li>관계 균형</li>
                        <li>삶의 우선순위</li>
                        <li>목표 재설계</li>
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
                        <li>삶의 우선순위가 명확해집니다.</li>
                        <li>감정 소모가 줄어듭니다.</li>
                        <li>일과 삶의 균형이 회복됩니다.</li>
                        <li>나에게 맞는 삶의 방향을 찾게 됩니다.</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>위드원만의 차별성</h3>
                </div>
                <div className='s_info'>
                    <p className="top">더 많이 하는 삶이 아니라, 더 나답게 살아가는 삶을 만듭니다.</p>
                    <ul className='ul_list_2'>
                        <li>심리와 코칭을 통합한 접근</li>
                        <li>기질과 성격을 고려한 맞춤 전략</li>
                        <li>실행 가능한 변화 계획 설계</li>
                        <li>지속 가능한 삶의 구조 만들기</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
