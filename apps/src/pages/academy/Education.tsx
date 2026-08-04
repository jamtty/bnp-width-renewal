import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy5.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>전문상담사 교육</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="전문상담사 교육" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>사람을 읽는 힘이 상담의 깊이를 결정합니다</h3>
                <p>상담이론을 배우는 것을 넘어, 내담자의 마음과 관계 패턴을 이해하고<span className='pc_br'></span>실제 상담에서 변화로 연결하는 전문 상담 역량을 키웁니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>핵심 교육 영역</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>
                            상담이론 & 사례개념화 교육
                            <p className="sm">이론을 실제 사례에 적용하여 문제의 원인과 유지 구조를 이해하는 훈련</p>
                        </li>
                        <li>
                            대상관계이론 교육
                            <p className="sm">내담자의 내면세계와 반복되는 관계 패턴을 이해하는 심층 이론</p>
                        </li>
                        <li>
                            정신역동·정신분석 상담 교육
                            <p className="sm">무의식·방어기제·전이와 역전이를 이해하고 상담에 적용하는 심층 접근</p>
                        </li>
                        <li>
                            정신분석적 진단 교육
                            <p className="sm">표면적인 증상을 넘어 성격 구조와 심리적 역동을 이해하는 임상적 진단</p>
                        </li>
                        <li>
                            치료적 관계 및 관계역동 교육
                            <p className="sm">상담 관계에서 나타나는 전이·역전이와 반복되는 관계 패턴을 이해하고 치료적으로 활용하는 훈련</p>
                        </li>
                        <li>
                            위기상담 교육
                            <p className="sm">자해·자살 위험, 급성 위기 등 위기 상황을 평가하고 안전하게 개입하는 상담 역량 강화</p>
                        </li>
                        <li>
                            트라우마 상담 교육
                            <p className="sm">외상 경험과 심리적 반응을 이해하고 안정화부터 회복까지 단계적으로 돕는 상담 접근</p>
                        </li>
                        <li>
                            상실·애도 상담 교육
                            <p className="sm">사별과 상실 이후의 애도 과정을 이해하고 건강한 회복을 돕는 상담 접근</p>
                        </li>
                        <li>
                            심리검사 교육
                            <p className="sm">MMPI·TCI·SCT 등 심리검사 해석과 사례개념화·상담 연결 훈련</p>
                        </li>
                        <li>
                            상담기법 및 임상 개입 교육
                            <p className="sm">내담자의 특성과 문제에 맞는 상담 목표 설정과 실제 개입 역량 강화</p>
                        </li>
                        <li>
                            사례 슈퍼비전
                            <p className="sm">실제 상담 사례를 중심으로 사례개념화·상담 과정·치료적 개입을 통합적으로 훈련</p>
                        </li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>교육 특징</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>이론과 실제 사례를 연결하는 임상 중심 교육</li>
                        <li>20년 이상 임상 경험의 교수급 전문가 교육</li>
                        <li>사례개념화 중심의 통합적 상담 훈련</li>
                        <li>상담자의 자기이해와 치료적 관계 역량 강화</li>
                        <li>교육·사례·슈퍼비전이 연결되는 지속적 성장 시스템</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>전문상담사 교육 신청하기</button>
                <button type="button" className='btn_secondary'>교육 일정 확인하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
