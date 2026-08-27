import AnimatedSection from '../../components/AnimatedSection';
import img_coaching from '../../assets/images/img_coaching_features5.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>전환기 코칭<span>Life Transition Coaching</span></h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_coaching} alt="전환기 코칭" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>변화의 시기는 위기가 아니라<span className='pc_br'></span>새로운 시작입니다</h3>
                <p>삶의 중요한 전환점에서 변화된 나와 환경을 이해하고,<span className='pc_br'></span>앞으로의 삶과 역할, 방향을 새롭게 설계합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>대상</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>퇴직 및 은퇴를 준비하는 사람</li>
                        <li>이직 및 커리어 전환을 고민하는 사람</li>
                        <li>중년기 이후의 삶을 재설계하고 싶은 사람</li>
                        <li>자녀 독립 이후 새로운 삶을 준비하는 사람</li>
                        <li>번아웃 이후 새로운 방향을 찾는 사람</li>
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
                        <li>정체성 재정립</li>
                        <li>삶의 우선순위 정리</li>
                        <li>진로·커리어 및 소명 탐색</li>
                        <li>관계와 역할 변화 적응</li>
                        <li>미래 설계 및 실행</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>위드원만의 차별성</h3>
                </div>
                <div className='s_info'>
                    <p className="top">변화에 적응하는 것을 넘어, 변화 이후의 삶을 새롭게 설계합니다.</p>
                    <ul className='ul_list_2'>
                        <li>심리검사 기반 자기이해</li>
                        <li>상담과 코칭의 통합적 접근</li>
                        <li>삶의 의미와 새로운 정체성 탐색</li>
                        <li>개인의 강점·가치·경험을 연결한 방향 설계</li>
                        <li>실행 가능한 변화 계획 수립</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>이런 고민을 다룹니다</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>앞으로 무엇을 하며 살아야 할지 막막합니다.</li>
                        <li>지금까지의 역할이 사라지면 내가 누구인지 모르겠습니다.</li>
                        <li>새로운 일을 시작하고 싶지만 결정하기 어렵습니다.</li>
                        <li>변화된 가족과 관계 속에서 내 자리를 찾기 어렵습니다.</li>
                        <li>인생의 다음 단계에서 무엇이 중요한지 다시 찾고 싶습니다.</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>코칭을 통해 달라지는 것</h3>
                </div>
                <div className='s_info'>
                    <p className="top">인생의 전환점은 끝이 아니라, 새로운 장을 시작하는 시간입니다.</p>
                    <ul className='ul_list_1'>
                        <li>변화된 나와 현재를 이해합니다.</li>
                        <li>삶의 새로운 우선순위를 세웁니다.</li>
                        <li>앞으로의 방향과 목표를 구체화합니다.</li>
                        <li>과거의 경험과 미래의 가능성을 연결합니다.</li>
                        <li>나에게 맞는 다음 삶을 설계하고 실행합니다.</li>
                    </ul>
                </div>
                <img src={ico_box_bg5} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <a href="http://pf.kakao.com/_AXwJn/chat" target="_blank" rel="noopener noreferrer" className='btn_primary'>코칭 상담 신청하기</a>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
