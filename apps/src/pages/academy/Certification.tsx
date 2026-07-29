import AnimatedSection from '../../components/AnimatedSection';
import { useState } from 'react';
import img_academy from '../../assets/images/img_academy4.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';

const tabList = [
  '미술치료 자격과정(한국아동미술치료학회)',
  '놀이치료 자격과정(한국기독교상담심리학회 연계)',
  '임상심리사 자격과정(한국산업인력공단)'
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
                            <h3>표현을 통해 마음을 읽고,<span className='pc_br'></span>치료로 연결하는 전문가 과정</h3>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>자격 단계</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>2급 과정: 미술치료 기초 이론 및 실습</li>
                                    <li>1급 과정: 사례개념화 및 심화 치료 개입</li>
                                    <li>슈퍼바이저 과정: 교육 및 임상 지도자 과정</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 교육</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>미술치료 이론 및 매체 활용</li>
                                    <li>그림검사(HTP 등) 해석</li>
                                    <li>아동·청소년·성인 사례 적용</li>
                                    <li>집단 프로그램 설계 및 운영</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>과정 특징</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>학회 자격 취득 연계</li>
                                    <li>실제 상담센터 사례 기반 훈련</li>
                                    <li>임상 적용 중심 실무형 교육</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <AnimatedSection className="tit" direction="up">
                            <h3>놀이를 통해 아이의 마음을 이해하고<span className='pc_br'></span>관계를 회복하는 전문가 과정</h3>
                            <p>아이를 이해하는 것을 넘어, 가족을 이해하는 전문가로 성장합니다</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>자격 단계</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>2급 과정: 놀이치료 기초 이론 및 기술</li>
                                    <li>1급 과정: 심화 개입 및 부모상담 통합</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 교육</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>놀이치료 이론과 실제</li>
                                    <li>HTP · KFD · 투사검사 활용</li>
                                    <li>놀이 관찰 및 치료적 반응</li>
                                    <li>부모상담 및 양육코칭</li>
                                    <li>사례개념화 및 슈퍼비전</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>과정 특징</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>학회 자격 취득 연계</li>
                                    <li>아동상담 + 부모상담 통합 훈련</li>
                                    <li>실제 사례 중심 실습</li>
                                    <li>교수급 슈퍼비전 제공</li>
                                    <li>현장 적용 중심 전문가 과정</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <AnimatedSection className="tit" direction="up">
                            <h3>심리검사를 넘어,<span className='pc_br'></span>평가와 상담을 연결하는 임상 전문가 과정</h3>
                            <p>좋은 검사는 점수를 읽는 것이 아니라, 사람을 이해하는 데서 시작됩니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>자격 단계</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>임상심리사 2급 / 1급 시험 대비 과정</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 교육</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>MMPI · TCI · SCT · 투사검사</li>
                                    <li>검사 실시 및 채점</li>
                                    <li>결과 해석 및 보고서 작성</li>
                                    <li>해석상담 및 피드백 면담</li>
                                    <li>사례개념화 및 임상적 판단</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>과정 특징</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>국가공인 자격증 취득 대비</li>
                                    <li>검사 → 해석 → 상담 통합 훈련</li>
                                    <li>실제 사례 중심 실습</li>
                                    <li>교수급 슈퍼비전 제공</li>
                                    <li>상담센터 실무 즉시 적용</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>공통 수련 시스템</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>이론 · 실습 · 사례 슈퍼비전 통합 교육</li>
                                    <li>교수급 슈퍼바이저 직접 지도</li>
                                    <li>학회 및 국가자격 연계</li>
                                    <li>상담센터 현장 실습 연계</li>
                                    <li>검사와 상담을 연결하는 임상 훈련</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                    </>
                )}
            </div>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>코칭 프로그램 제안서 요청하기</button>
                <button type="button" className='btn_secondary'>비즈니스 미팅 신청</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default CounselingChild;
