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
import img_specialized8 from '../../assets/images/img_specialized_features8.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';

const tabList = [
  '특장점',
  '공황·불안',
  '번아웃·직장 스트레스',
  'ADHD·실행력',
  '은둔 · 고립 청년',
  '중독 회복',
  '식이장애·섭식문제',
  '커리어 전환·방향 설계'
];

const tabKeys = ['features', 'panic', 'burnout', 'adhd', 'recluse', 'addiction', 'eating', 'career'];

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
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_why'>
                                    <li>몸의 반응</li>
                                    <li>불안한 생각</li>
                                    <li>회피 행동 이 패턴이 반복되며 불안이 유지됩니다.</li>
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
                                    <li>불안과 신체 반응을 스스로 조절하는 힘 회복</li>
                                    <li>공황·불안을 지속시키는 반복 패턴의 이해와 변화</li>
                                    <li>심리검사 기반 개인별 맞춤 상담 설계</li>
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
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_why'>
                                    <li>과도한 책임감</li>
                                    <li>감정 소진</li>
                                    <li>회복 부족 이 악순환이 반복되며 번아웃이 지속됩니다.</li>
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
                                    <li>번아웃·직장 스트레스에 대한 전문 상담</li>
                                    <li>심리검사 기반 소진 패턴 이해 및 맞춤 상담 설계</li>
                                    <li>회복을 방해하는 일과 관계의 패턴 점검</li>
                                    <li>버티는 삶에서 지속 가능한 삶으로의 전환</li>
                                </ul>
                                <p>단순히 쉬는 것이 아니라 다시 소진되지 않는 삶의 방식을 만듭니다.</p>
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
                            <p>
                                계획은 세우지만 실행이 어렵고, 시작해도 끝까지 이어지지 않는다면<span className='pc_br'></span>단순한 의지의 문제가 아니라 주의집중과 실행기능, 자기조절의 어려움과 관련될 수 있습니다.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>실행기능과 자기조절력을 강화하는 맞춤 상담·코칭</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_why'>
                                    <li>해야 할 일은 많아지고</li>
                                    <li>시작은 어려워지고</li>
                                    <li>미루게 되고</li>
                                    <li>자책과 죄책감이 쌓이면서 실행에 대한 자신감이 점점 낮아질 수 있습니다.</li>
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
                                    <li>집중력과 자기조절 능력 강화</li>
                                    <li>시간관리와 우선순위 설정</li>
                                    <li>현실적인 목표와 지속 가능한 습관 구축</li>
                                </ul>
                                <p>생각에 머무르지 않고, 나에게 맞는 방식으로 실행하는 힘을 키웁니다.</p>
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
                            <img src={img_specialized8} alt="은둔 · 고립 청년" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>사람을 만나고 세상으로 나가야 한다는 건 알지만,<span className='pc_br'></span>왜 점점 더 혼자 있고 싶어질까요?</h3>
                            <p>오랜 시간 관계와 사회생활을 피하고 집 안에 머무는 시간이 늘어난다면<span className='pc_br'></span>단순한 의지 부족이 아니라 불안·상처·실패 경험·관계의 어려움이 쌓인 결과일 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>안전한 관계에서 시작해 세상과 다시 연결되는 힘을 회복하는 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_why'>
                                    <li>불안과 상처</li>
                                    <li>관계·사회생활 회피</li>
                                    <li>고립</li>
                                    <li>자신감 저하의 흐름이 반복되면서 세상으로 다시 나가는 일이 점점 더 어려워질 수 있습니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>은둔과 고립에 이르게 된 심리적 원인과 관계 패턴 이해</li>
                                    <li>우울·불안·자존감 등 심리 상태를 고려한 맞춤 상담</li>
                                    <li>작은 일상 회복부터 관계와 사회적 연결까지 단계적 지원</li>
                                    <li>개인의 속도에 맞춘 현실적인 변화와 실행 계획 설계</li>
                                </ul>
                                <p>억지로 세상 밖으로 나오게 하는 것이 아니라, 다시 연결될 수 있는 힘을 함께 만들어 갑니다.</p>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
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
                                    <li>단순한 의지의 문제가 아니라 감정·충동·습관·환경이 연결된 반복 패턴이 형성되어 있을 수 있습니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_why'>
                                    <li>불편한 감정이나 스트레스</li>
                                    <li>강한 충동</li>
                                    <li>반복 행동</li>
                                    <li>일시적 해소</li>
                                    <li>후회와 다시 쌓이는 스트레스의 악순환이 반복되면서 행동이 강화될 수 있습니다.</li>
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
                                    <li>반복 행동을 유발하고 유지하는 요인 이해</li>
                                    <li>충동과 감정 조절 능력 강화</li>
                                    <li>재발을 줄이기 위한 생활 구조 설계</li>
                                    <li>건강한 대처 행동과 회복 습관 형성</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>위드원의 차별점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>중독 행동만 멈추게 하기보다 반복되는 이유와 패턴을 함께 이해합니다.</li>
                                    <li>심리검사를 바탕으로 개인별 회복 방향을 설계합니다.</li>
                                    <li>감정·관계·생활환경과 행동 패턴을 통합적으로 다룹니다.</li>
                                    <li>"참는 회복" 이 아니라 "지속 가능한 변화" 를 만들어갑니다.</li>
                                </ul>
                                <p>끊어내는 것에 그치지 않고, 다시 반복되지 않는 삶의 힘을 만들어 갑니다.</p>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
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
                            <img src={img_specialized6} alt="식이장애·감정조절 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>반복되는 폭식과 절식,<span className='pc_br'></span>그 뒤에는 마음의 어려움이 숨어 있을 수 있습니다.</h3>
                            <p>폭식, 극단적인 절식, 체중과 체형에 대한 집착이 반복된다면<span className='pc_br'></span>단순한 식습관의 문제가 아니라 감정과 자기인식, 반복되는 섭식 행동이 서로 연결되어 있을 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>감정과 섭식 행동을 함께 이해하고 회복하는 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_why'>
                                    <li>불편한 감정과 스트레스</li>
                                    <li>폭식·절식 등 섭식 행동</li>
                                    <li>죄책감과 자기비난이 반복되면서 어려움이 지속될 수 있습니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>섭식 행동과 그 이면의 감정을 함께 다루는 상담</li>
                                    <li>심리검사 기반 반복 패턴 이해 및 맞춤 상담 설계</li>
                                    <li>신체 이미지와 자기인식의 건강한 변화</li>
                                    <li>자기비난에서 자기이해와 회복으로의 전환</li>
                                </ul>
                                <p>음식과의 싸움을 멈추고, 나 자신과 다시 건강한 관계를 만들어 갑니다.</p>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 7 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_specialized7} alt="커리어 전환·방향 설계 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>이직, 공백기, 진로 고민으로<span className='pc_br'></span>같은 고민을 반복하고 있나요?</h3>
                            <p>정보가 부족해서가 아니라, 나에 대한 이해와 선택의 기준이<span className='pc_br'></span>충분히 정리되지 않았기 때문일 수 있습니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>자기이해를 바탕으로 나에게 맞는 삶과 커리어의 방향을 설계하는 상담·코칭</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>왜 반복될까요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_why'>
                                    <li>불확실성</li>
                                    <li>불반복되는 고민</li>
                                    <li>결정 미루기</li>
                                    <li>자신감 저하의 흐름이 이어지면서 나아갈 방향을 잃기 쉽습니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>자기이해를 기반으로 한 진로·커리어 방향 설계</li>
                                    <li>강점·가치관·성향을 종합적으로 분석</li>
                                    <li>현실적인 선택 기준과 우선순위 정립</li>
                                    <li>막연한 고민을 실행 가능한 계획으로 구체화</li>
                                </ul>
                                <p>막연한 고민에서 벗어나, 나만의 기준으로 선택하고 실행하는 삶을 만들어 갑니다.</p>
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
