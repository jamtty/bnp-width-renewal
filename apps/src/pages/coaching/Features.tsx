import AnimatedSection from '../../components/AnimatedSection';
import img_counseling from '../../assets/images/img_coaching_features.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>특장점</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_counseling} alt="특장점" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>이해를 넘어, 행동이 바뀌는 코칭</h3>
                <p>
                    목표를 세우는 것보다 중요한 것은 실행이 지속되는 구조를 만드는 것입니다.<br />
                    WithOne은 상담심리 전문성과 전문 코칭을 결합하여<span className='pc_br'></span>자기이해에서 실행과 변화까지 연결하는 통합 코칭을 제공합니다.
                </p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>무엇이 다른가요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>심리 기반 코칭 → 행동 뒤에 있는 기질·감정·동기를 함께 이해합니다.</li>
                        <li>맞춤 실행 전략 → 개인의 성향과 상황에 맞는 목표와 실행 방법을 설계합니다.</li>
                        <li>전문가 협업 시스템 → 전문 코치와 상담심리 전문가가 함께합니다.</li>
                        <li>변화 유지 시스템 → 목표 설정에 그치지 않고 실행과 변화의 지속을 점검합니다.</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>코칭 프로그램</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>3회 과정 · 문제 정리 · 방향 설정 · 실행 시작</li>
                        <li>6회 과정 - 패턴 변화 · 실행 전략 · 습관 형성</li>
                        <li>10회 과정 - 목표 달성 · 행동 변화 · 삶의 전환</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>진행 과정</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>사전 진단</li>
                        <li>코칭 방향 설정</li>
                        <li>전문 코치 매칭</li>
                        <li>코칭 진행</li>
                        <li>실행 점검</li>
                        <li>변화 유지</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>상담 및 코칭 방향</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>나를 이해하는 데서 시작해, 실제 삶의 변화로 이어지는 코칭</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <a href="http://pf.kakao.com/_AXwJn/chat" target="_blank" rel="noopener noreferrer" className='btn_primary'>코칭 상담 신청하기</a>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
