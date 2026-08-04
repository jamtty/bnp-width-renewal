import AnimatedSection from '../../components/AnimatedSection';
import img_coaching from '../../assets/images/img_coaching_features2.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>학습 진로 코칭</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_coaching} alt="학습 진로 코칭" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>생각을 바꾸는 것이 아니라, 실행이 바뀌는 코칭</h3>
                <p>학습과 진로의 문제는 의지 부족이 아니라<span className='pc_br'></span>자신에게 맞지 않는 방식과 방향의 문제일 수 있습니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>학습 코칭</h3>
                </div>
                <div className='s_info'>
                    <p className="top">공부를 못하는 것이 아니라, 공부하는 방식의 문제일 수 있습니다.</p>
                    <ul className='ul_list_2'>
                        <li>학습 효율이 낮은 학생 · 공부를 시작하고 지속하기 어려운 학생 · 시험 불안이 큰 학생 · 성인 학습자</li>
                        <li>핵심 영역 - 집중력 · 학습 습관 · 시간 관리 · 학습 동기 · 자기조절 · 실행력</li>
                        <li>
                            위드원만의 차별성
                            <p className="sm">
                                심리검사(TCI·MLST) 기반 분석<br />
                                개인의 기질과 동기를 반영한 학습 전략 설계<br />
                                잔소리 없이 스스로 움직이는 학습 시스템 구축
                            </p>
                        </li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>진로 코칭</h3>
                </div>
                <div className='s_info'>
                    <p className="top">진로는 직업 선택이 아니라, 삶의 방향을 찾는 과정입니다.</p>
                    <ul className='ul_list_2'>
                        <li>대상 - 청소년, 대학생, 취업 준비생, 직장인</li>
                        <li>핵심 영역 - 강점 발견 , 의사결정 , 커리어 설계 , 직업 적합성</li>
                        <li>
                            위드원만의 차별성
                            <p className="sm">
                                성격·강점·가치·흥미 통합 분석<br />
                                검사 결과를 실제 진로 선택과 실행으로 연결<br />
                                현재의 선택을 넘어 지속 가능한 진로·커리어 방향 설계
                            </p>
                        </li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>코칭을 통해 달라지는 것</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>무엇을 해야 하는지 아는 것을 넘어, 나에게 맞는 방법으로 실행할 수 있도록 돕습니다.</p>
                    <ul className='ul_list_2'>
                        <li>나에게 맞는 학습 방법을 찾습니다.</li>
                        <li>실행하고 지속하는 힘을 키웁니다.</li>
                        <li>진로와 삶의 방향을 구체화합니다.</li>
                        <li>나만의 선택 기준을 세웁니다.</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
