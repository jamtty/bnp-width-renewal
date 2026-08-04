import AnimatedSection from '../../components/AnimatedSection';
import { useState } from 'react';
import img_academy from '../../assets/images/img_academy4.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const tabList = [
  '임상심리사 자격과정(한국산업인력공단)',
  '미술치료 자격과정(한국아동미술치료학회)',
  '놀이치료 자격과정(한국기독교상담심리학회 연계)',
];

const CounselingChild = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>전문 자격 프로그램</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="전문 자격 프로그램" />
            </AnimatedSection>
            <div className="tab_wrap">
                <span className="tab_bar" style={{ left: `${(100 / tabList.length) * activeTab}%`, width: `${100 / tabList.length}%` }} />
                {tabList.map((tab, i) => (
                    <button
                        key={i}
                        type="button"
                        className={`tab_btn ${activeTab === i ? 'on' : ''}`}
                        onClick={() => setActiveTab(i)}
                    >{tab}</button>
                ))}
            </div>
            <div className="tab_content">
                {activeTab === 0 && (
                    <>
                        <AnimatedSection className="tit" direction="up">
                            <h3>심리검사를 넘어,<span className='pc_br'></span>평가와 상담을 연결하는 임상 전문가 과정</h3>
                            <p>좋은 심리평가는 점수를 읽는 것이 아니라, 사람을 이해하는 데서 시작됩니다.<br />
심리검사의 실시와 해석부터 심리평가, 보고서 작성, 사례개념화까지 체계적으로 익혀 실제 임상 현장에 적용할 수 있는 전문 역량을 키웁니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>국가 자격</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>임상심리사 2급·1급 자격 취득 대비 과정</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>자격 단계</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>임상심리사 2급 과정:<br />임상심리학 및 심리평가 기초, 주요 심리검사의 이해, 검사 실시·채점 및 해석, 심리평가 보고서 작성, 기초 사례개념화 및 임상 실무, 필기·실기시험 대비</li>
                                    <li>임상심리사 1급 과정:<br />고급 심리평가 및 임상적 판단, 심리검사 통합 해석, 심층 사례개념화, 심리평가 보고서 작성 및 피드백, 복합 사례 분석 및 임상 적용, 필기·실기시험 대비</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 교육</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>MMPI·TCI·SCT 등 주요 심리검사</li>
                                    <li>투사검사의 이해와 활용</li>
                                    <li>검사 실시 및 채점</li>
                                    <li>검사 결과의 통합적 해석</li>
                                    <li>심리평가 보고서 작성</li>
                                    <li>해석상담 및 피드백 면담</li>
                                    <li>사례개념화 및 임상적 판단</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>과정 특징</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>국가자격 임상심리사 2급·1급 취득 대비</li>
                                    <li>검사·평가·해석·상담을 연결하는 통합 훈련</li>
                                    <li>실제 사례 중심의 심리평가 실습</li>
                                    <li>교수급 전문가의 사례지도 및 슈퍼비전</li>
                                    <li>상담 및 임상 현장 적용 중심 교육</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>공통 수련 시스템</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>이론·실습·사례·슈퍼비전 통합 교육</li>
                                    <li>교수급 슈퍼바이저의 전문 지도</li>
                                    <li>국가자격 취득 과정과 연계</li>
                                    <li>상담센터 현장 실무 연계</li>
                                    <li>심리평가와 상담을 연결하는 임상 훈련</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg5} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>임상심리사 자격과정 신청하기</button>
                            <button type="button" className='btn_secondary'>교육 일정 확인하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <AnimatedSection className="tit" direction="up">
                            <h3>표현을 통해 마음을 이해하고,<span className='pc_br'></span>상담과 치료 현장에 적용하는 전문가 과정</h3>
                            <p>미술치료의 이론과 실제를 체계적으로 배우고, 다양한 미술 매체와 심리평가,<span className='pc_br'></span>사례개념화 및 치료적 개입을 익혀 실제 상담 현장에서 활용할 수 있는 미술치료 전문가를 양성합니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>국가 자격</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>한국아동미술치료학회 자격 취득 연계 과정</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>자격 단계</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>2급 과정:<br />미술치료 기초이론, 미술 매체의 이해와 활용, 아동·청소년 발달과 미술치료, 미술치료 기초 실습 및 사례 이해</li>
                                    <li>1급 과정:<br />미술치료 심화이론, 사례개념화 및 치료계획 수립, 아동·청소년·성인 사례 적용, 정서·행동·관계 문제의 치료적 개입, 개인·집단 미술치료 프로그램 운영</li>
                                    <li>슈퍼바이저 과정:<br />고급 사례개념화 및 사례지도, 미술치료 슈퍼비전, 교육 및 임상 지도 역량, 미술치료 프로그램 개발 및 전문가 양성</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 교육</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>미술치료 이론과 치료적 접근</li>
                                    <li>다양한 미술 매체 활용과 실제</li>
                                    <li>HTP·KFD 등 그림검사의 이해와 활용</li>
                                    <li>대상별 미술치료 및 사례개념화</li>
                                    <li>개인·집단 미술치료 프로그램 설계</li>
                                    <li>실제 사례 중심 치료 개입 훈련</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>과정 특징</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>한국아동미술치료학회 자격 취득 연계</li>
                                    <li>이론·실습·사례를 연결하는 단계별 교육</li>
                                    <li>실제 상담 현장 중심의 임상 훈련</li>
                                    <li>사례개념화 및 치료적 개입 역량 강화</li>
                                    <li>전문가 슈퍼비전을 통한 지속적인 성장</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>미술치료 자격과정 신청하기</button>
                            <button type="button" className='btn_secondary'>교육 일정 확인하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <AnimatedSection className="tit" direction="up">
                            <h3>놀이를 통해 아이의 마음을 이해하고,<span className='pc_br'></span>상담과 치료 현장에 적용하는 전문가 과정</h3>
                            <p>놀이치료의 이론과 실제를 체계적으로 배우고, 놀이를 통한 아동의 정서와 행동,<span className='pc_br'></span>관계를 이해하여 치료적 개입과 부모상담까지 통합적으로 수행할 수 있는 놀이치료 전문가를 양성합니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>국가 자격</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>한국기독교상담심리학회 자격 취득 연계 과정</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>자격 단계</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>2급 과정:<br />놀이치료 및 모래놀이치료 기초이론, 아동 발달과 심리 이해, 놀이 관찰과 치료적 반응, 놀이치료 기법 및 매체 활용, 기초 사례 이해 및 실습</li>
                                    <li>1급 과정:<br />놀이치료 및 모래놀이치료 심화이론 및 치료적 개입, 사례개념화 및 치료계획 수립, 정서·행동·관계 문제별 놀이치료, 부모상담 및 양육코칭, 아동·부모 통합 사례 적용</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 교육</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>놀이치료 이론과 실제</li>
                                    <li>놀이 관찰 및 치료적 반응</li>
                                    <li>놀이 매체와 치료기법 활용</li>
                                    <li>아동의 정서·행동·관계 이해</li>
                                    <li>부모상담 및 양육코칭</li>
                                    <li>사례개념화 및 슈퍼비전</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>과정 특징</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>기독교상담심리학회 놀이치료사 자격 취득 연계</li>
                                    <li>아동상담과 부모상담을 연결하는 통합 훈련</li>
                                    <li>이론·실습·사례를 연결하는 단계별 교육</li>
                                    <li>실제 상담 사례 중심의 임상 훈련</li>
                                    <li>교수급 전문가 슈퍼비전</li>
                                    <li>현장 적용 중심의 전문가 과정</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>놀이치료 자격과정 신청하기</button>
                            <button type="button" className='btn_secondary'>교육 일정 확인하기</button>
                        </AnimatedSection>
                    </>
                )}
            </div>
        </section>
    </div>
  );
};
export default CounselingChild;
