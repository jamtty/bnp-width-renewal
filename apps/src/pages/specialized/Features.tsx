import AnimatedSection from '../../components/AnimatedSection';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import img_specialized from '../../assets/images/img_specialized_features.png';
import img_specialized2 from '../../assets/images/img_specialized_features2.png';
import img_specialized3 from '../../assets/images/img_specialized_features3.png';
import img_specialized4 from '../../assets/images/img_specialized_features4.png';
import img_specialized5 from '../../assets/images/img_specialized_features5.png';
import img_specialized6 from '../../assets/images/img_specialized_features6.png';
import img_specialized7 from '../../assets/images/img_specialized_features7.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';

const tabList = [
  '특장점',
  '공황·불안 상담',
  '번아웃·직장 스트레스 상담',
  'ADHD·실행력 상담',
  '중독 회복 상담',
  '식이장애·감정조절 상담',
  '커리어 전환·방향 설계 상담'
];

const tabKeys = ['features', 'panic', 'burnout', 'adhd', 'addiction', 'eating', 'career'];

const SpecializedFeatures = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab = tabKeys.indexOf(tabParam ?? '');
  const [activeTab, setActiveTab] = useState(initialTab >= 0 ? initialTab : 0);

  useEffect(() => {
    const idx = tabKeys.indexOf(tabParam ?? '');
    if (idx >= 0) {
      setActiveTab(idx);
    }
  }, [tabParam]);

  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>특화상담</h2>
        </AnimatedSection>
        <section className="con_1">
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
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_specialized} alt="특장점" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>반복되는 문제에는<span className='pc_br'></span>더 전문적인 접근이 필요합니다.</h3>
                            <p>일반 상담만으로 해결하기 어려운 문제를 전문 평가와 맞춤 개입으로 돕습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>무엇이 다른가요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>문제별 전문상담사 배정</li>
                                    <li>심리검사 기반 원인 분석</li>
                                    <li>증상 완화 + 삶의 변화 설계</li>
                                    <li>이론 기반 맞춤 개입</li>
                                    <li>실제 생활 적용 전략 제공</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block" direction="up">
                            <div className='s_tit'>
                                <h3>상담은 어떻게 진행되나요?</h3>
                                <p>문제를 해결하는 것을 넘어 반복되는 패턴의 구조를 바꾸는 과정입니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='step_list_child'>
                                    <li>
                                        <div className='ico'>
                                            <p>초기 면담</p>
                                        </div>
                                        <p className='txt'>문제 및 생활 패턴 이해</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>정밀 진단</p>
                                        </div>
                                        <p className='txt'>심리검사 및 기능 평가</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>해석 상담</p>
                                        </div>
                                        <p className='txt'>문제 구조 및 유지 요인 설명</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>개입 설계</p>
                                        </div>
                                        <p className='txt'>이론 기반 맞춤 전략 수립</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>상담 진행</p>
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
                                    <li>문제를 이해하는 것을 넘어, 반복되는 패턴을 바꾸는 상담입니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_specialized2} alt="공황·불안 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>이유 없는 불안이 반복되나요?</h3>
                            <p>갑작스러운 두근거림, 숨 막힘, 끊이지 않는 걱정과 불안.<span className='pc_br'></span>반복되는 불안은 의지의 문제가 아니라 몸과 마음이 보내는 신호일 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>신체–생각–행동 통합 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>몸의 반응 → 불안한 생각 → 회피 행동 이 패턴이 반복되며 불안이 유지됩니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>불안을 피하지 않고 다루는 힘 회복</li>
                                    <li>공황·불안 반복 패턴의 원인 분석</li>
                                    <li>심리검사 기반 맞춤 상담 설계</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_specialized3} alt="번아웃·직장 스트레스 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>버티고 있는데, 점점 무너지는 느낌인가요?</h3>
                            <p>쉬어도 회복되지 않고 의욕과 에너지가 계속 떨어진다면<span className='pc_br'></span>단순한 피로가 아니라 번아웃일 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>에너지를 회복하고 삶의 균형을 되찾는 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>과도한 책임감 → 감정 소진 → 회복 부족 이 악순환이 반복되며 번아웃이 지속됩니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>번아웃·직장 스트레스 전문 상담</li>
                                    <li>심리검사 기반 원인 분석 및 맞춤 설계</li>
                                    <li>버티는 삶이 아닌 회복 가능한 삶으로 전환</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 3 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_specialized4} alt="ADHD·실행력 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>해야 하는 걸 알지만, 왜 자꾸 미루게 될까요?</h3>
                            <p>계획은 세우지만 실행이 어렵고 시작은 하지만 끝까지 이어지지 않는다면<span className='pc_br'></span>의지 부족이 아니라 실행 시스템이 흔들리는 상태일 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>실행력 · 자기조절 회복 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>생각 → 계획 → 미루기 → 죄책감 이 흐름이 반복되면서 실행 자신감이 점점 낮아집니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>무엇이 달라지나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>미루기 감소와 실행력 향상</li>
                                    <li>집중력과 자기조절 능력 회복</li>
                                    <li>현실적인 목표·습관 시스템 구축</li>
                                    <li>"해야 하는 사람"에서 "실행하는 사람"으로 변화</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 4 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_specialized5} alt="중독 회복 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>끊고 싶은데, 왜 자꾸 반복될까요?</h3>
                            <p>게임, 스마트폰, 술, 도박, 쇼핑 등 같은 행동이 반복된다면<span className='pc_br'></span>의지 부족이 아니라 반복 행동의 구조가 형성된 상태일 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>충동·습관·행동패턴 회복 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>불편한 감정 → 충동 → 행동 → 후회 이 흐름이 반복되면서 중독 행동이 강화됩니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>무엇이 달라지나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>반복 행동의 원인 이해</li>
                                    <li>충동 조절 능력 회복</li>
                                    <li>재발 예방 구조 설계</li>
                                    <li>건강한 대처 행동 형성</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>위드원의 차별점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>중독 행동보다 원인을 먼저 이해합니다</li>
                                    <li>심리검사 기반 맞춤 회복 전략을 설계합니다</li>
                                    <li>감정·관계·생활 패턴을 함께 다룹니다</li>
                                    <li>"참는 것"이 아닌 "변화가 지속되는 구조"를 만듭니다</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 5 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_specialized6} alt="식이장애·감정조절 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>반복되는 폭식과 절식,<span className='pc_br'></span>그 뒤에 감정이 있습니다.</h3>
                            <p>폭식, 거식, 체중 집착이 반복된다면 단순 식습관이 아니라<span className='pc_br'></span>감정 조절의 어려움이 연결된 상태일 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>감정과 식이 행동을 함께 회복하는 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>불편한 감정 → 폭식·절식 → 죄책감과 자기비난 이 악순환이 반복되며 문제가 유지됩니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>식이 문제와 감정 문제를 함께 다루는 상담</li>
                                    <li>심리검사 기반 원인 분석 및 맞춤 설계</li>
                                    <li>자기비난에서 자기회복으로의 전환</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 6 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_specialized7} alt="커리어 전환·방향 설계 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>지금 이 방향이 맞는지 확신이 없으신가요?</h3>
                            <p>이직, 공백기, 진로 고민이 반복된다면 정보 부족이 아니라<span className='pc_br'></span>선택 기준이 흔들리는 상태일 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>자기이해를 바탕으로 삶의 방향을 찾는 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>불확실성 → 고민 반복 → 결정 미루기 이 흐름이 반복되면 방향이 흐려집니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>자기이해 기반 진로·커리어 설계</li>
                                    <li>강점·가치관·성향을 함께 분석</li>
                                    <li>막연한 고민을 실행 가능한 계획으로 전환</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
                        </AnimatedSection>
                    </>
                )}
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
