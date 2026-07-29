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
                    WithOne은 ICF 인증 코치와 상담학 전문가가 함께하여<span className='pc_br'></span>
                    심리와 행동을 연결하는 코칭을 제공합니다.
                </p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>무엇이 다른가요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>심리 기반 코칭 - 행동 뒤에 있는 기질·감정·동기를 함께 이해합니다.</li>
                        <li>맞춤 실행 전략 - 나에게 맞는 방식으로 목표를 설계합니다.</li>
                        <li>전문가 협업 시스템 - ICF 코치 + 상담 전문가 협업</li>
                        <li>변화 유지 시스템 - 코칭 이후까지 실행을 점검합니다.</li>
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
                        <li>3회 과정 - 문제 정리 · 방향 설정 · 실행 시작</li>
                        <li>6회 과정 - 패턴 변화 · 실행 전략 · 습관 형성</li>
                        <li>10회 과정 - 목표 달성 · 행동 변화 · 삶의 전환</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box d-block" direction="up">
                <div className='s_tit'>
                    <h3>상담은 어떻게 진행되나요?</h3>
                    <p>좋은 계획보다 중요한 것은 지속되는 실행입니다.</p>
                </div>
                <div className='s_info'>
                    <ul className='step_list_child'>
                        <li>
                            <div className='ico'>
                                <p>사전 진단</p>
                            </div>
                            <p className='txt'>문제 및 생활 패턴 이해</p>
                        </li>
                        <li>
                            <div className='ico'>
                                <p>코치 매칭</p>
                            </div>
                            <p className='txt'>심리검사 및 기능 평가</p>
                        </li>
                        <li>
                            <div className='ico'>
                                <p>코칭 진행</p>
                            </div>
                            <p className='txt'>문제 구조 및 유지 요인 설명</p>
                        </li>
                        <li>
                            <div className='ico'>
                                <p>실행 점검</p>
                            </div>
                            <p className='txt'>이론 기반 맞춤 전략 수립</p>
                        </li>
                        <li>
                            <div className='ico'>
                                <p>변화 유지</p>
                            </div>
                            <p className='txt'>행동·감정 변화까지 연결</p>
                        </li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>상담 및 코칭 방향</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>좋은 계획보다 중요한 것은 지속되는 실행입니다.</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
