import AnimatedSection from '../../components/AnimatedSection';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import img_global from '../../assets/images/img_global_features.png';
import img_global2 from '../../assets/images/img_global_features2.png';
import img_global3 from '../../assets/images/img_global_features3.png';
import img_global4 from '../../assets/images/img_global_features4.png';
import img_global5 from '../../assets/images/img_global_features5.png';
import img_global6 from '../../assets/images/img_global_features6.png';
import img_global7 from '../../assets/images/img_global_features7.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const tabList = [
  '특장점',
  '선교사 심리상담',
  '다문화·유학생 심리상담',
  '해외 거주자 상담',
  '귀국자 상담',
  'Global Business (B2B)',
  'Partnership'
];

const tabKeys = ['features', 'missionary', 'multicultural', 'overseas', 'returnee', 'b2b', 'partnership'];

const GlobalFeatures = () => {
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
            <h2>글로벌</h2>
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
                            <img src={img_global} alt="특장점" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>언어를 넘어, 문화와 마음을 이해하는 상담</h3>
                            <p>해외생활, 선교사역, 다문화 환경에서 경험하는<span className='pc_br'></span>정서·관계·적응·정체성의 어려움을 문화적 맥락과 함께 이해합니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>WithOne Global<br /> 차별성</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>선교사·MK·다문화가족·유학생 특화 상담</li>
                                    <li>영어·중국어·일본어·베트남어·몽골어 상담 가능</li>
                                    <li>전 세계 어디서나 온라인 상담 가능</li>
                                    <li>문화와 정체성을 고려한 맞춤 상담</li>
                                    <li>상담·코칭·교육 통합 지원</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block" direction="up">
                            <div className='s_tit'>
                                <h3>글로벌 상담은 어떻게 다른가요?</h3>
                                <p>글로벌 상담은 개인의 심리적 어려움만 보는 것이 아니라,<span className='pc_br'></span>문화와 환경의 변화 속에서 경험하는 적응·관계·정체성의 어려움을 함께 이해하고 회복을 돕는 과정입니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='step_list_child'>
                                    <li>
                                        <div className='ico'>
                                            <p>초기 면담</p>
                                        </div>
                                        <p className='txt'>문화·환경·적응 상태와 현재 어려움 이해</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>심리 평가</p>
                                        </div>
                                        <p className='txt'>필요 시 심리검사를 통한 정서·성격·관계 특성 이해</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>해석 상담</p>
                                        </div>
                                        <p className='txt'>정서·관계·적응 및 정체성의 어려움 종합적 이해</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>상담 방향 설정</p>
                                        </div>
                                        <p className='txt'>문화적 배경과 현재 환경을 고려한 맞춤 상담 계획</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>상담 진행</p>
                                        </div>
                                        <p className='txt'>정서 회복 · 관계 회복 · 문화 적응 · 정체성 통합</p>
                                    </li>
                                </ul>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>교육 프로그램 신청하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_global2} alt="선교사 심리상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>사명을 지키기 위한, 마음의 회복</h3>
                            <p>사명을 이어가기 위해, 마음에도 회복이 필요합니다.<span className='pc_br'></span>
사역에 헌신할수록 자신의 감정과 마음을 충분히 돌보지 못하는 경우가 많습니다.<span className='pc_br'></span>
WithOne은 선교 현장과 사역의 특수성을 이해하는 전문 심리상담과 회복 프로그램을 제공합니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>주요 어려움</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>정서 소진 및 번아웃</li>
                                    <li>팀·동역자 갈등</li>
                                    <li>외상 및 위기 경험</li>
                                    <li>비자발적 철수</li>
                                    <li>정체성 및 소명 혼란</li>
                                    <li>부부·가족 관계 문제</li>
                                    <li>문화 적응 및 재적응</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 프로그램</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>디브리핑 상담 → 사역 경험과 감정 정리</li>
                                    <li>번아웃 회복 상담 → 정서 소진 및 회복</li>
                                    <li>위기·외상 상담 → 충격 사건 및 트라우마 회복</li>
                                    <li>소명·정체성 상담 → 삶과 사역 방향 재정립</li>
                                    <li>부부·가족 상담 → 관계 회복 및 재적응</li>
                                    <li>MK 상담 → 정서·관계·학습·진로 지원</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>선교사 · 사역자<br />교육 프로그램</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>디브리핑 회복 워크숍</li>
                                    <li>번아웃 예방 및 회복 워크숍</li>
                                    <li>팀 갈등 회복 워크숍</li>
                                    <li>선교사 부부 회복 워크숍</li>
                                    <li>선교사 배우자 회복 프로그램</li>
                                    <li>MK 부모 교육 프로그램</li>
                                    <li>부인선교사 정서 회복 프로그램</li>
                                </ul>
                                <p>사역을 멈추게 하는 상담이 아니라, 사람을 먼저 회복하여 삶과 사역을 다시 바라볼 수 있도록 돕습니다.</p>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>상담 신청하기</button>
                            <button type="button" className='btn_secondary'>교육 프로그램 신청하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_global3} alt="다문화·유학생 심리상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>낯선 환경 속에서도, 나를 잃지 않도록</h3>
                            <p>문화와 환경이 달라질 때 어려움은 단순한 적응의 문제를 넘어<span className='pc_br'></span>
정서·관계·정체성·학업과 진로의 문제로 이어질 수 있습니다.<br />
WithOne은 개인의 문화적 배경을 이해하며 정서·관계·정체성·진로를 통합적으로 지원합니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>문화적 맥락과 정체성을 함께 이해하는 통합 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>상담 대상</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>유학생 · 다문화 청년 · 다문화가정 자녀 · 결혼이주민 · 해외생활 및 귀국 경험자</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>주요 어려움</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>외로움 · 고립감 · 문화적응 스트레스</li>
                                    <li>우울 · 불안 · 학업 및 진로 스트레스</li>
                                    <li>부모·자녀 및 가족 갈등</li>
                                    <li>정체성·소속감의 혼란</li>
                                    <li>차별 및 문화적 갈등 경험</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특화 상담</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>정서·적응 상담 → 불안·우울·외로움·문화적응</li>
                                    <li>관계 상담 → 친구·가족·문화 간 관계 갈등</li>
                                    <li>정체성 상담 → 소속감·문화적 정체성·자기이해</li>
                                    <li>학업·진로 상담 → 학업 적응·진로 탐색·미래 방향</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>교육 프로그램</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>유학생 문화적응 프로그램</li>
                                    <li>다문화 정체성 프로그램</li>
                                    <li>다문화 관계·소통 프로그램</li>
                                    <li>유학생 학업·진로 적응 프로그램</li>
                                    <li>귀국자 재적응·회복 프로그램</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg5} alt="" className="bg_img" />
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
                            <img src={img_global4} alt="해외 거주자 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>멀리 있어 더 고립되는 마음을 위한 상담</h3>
                            <p>해외 생활은 환경의 문제가 아니라 정서와 관계의 문제로 이어집니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>정서 · 관계 · 적응 통합 상담</li>
                                    <li>문화적 맥락을 고려한 맞춤 상담</li>
                                    <li>온라인 기반 글로벌 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>상담 대상</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>해외 거주자</li>
                                    <li>주재원 및 가족</li>
                                    <li>장기 체류자</li>
                                    <li>해외 이주 준비자</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>주요 어려움</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>고립감 및 외로움</li>
                                    <li>우울·불안 및 정서적 소진</li>
                                    <li>부부·가족 관계 갈등</li>
                                    <li>문화 적응 스트레스</li>
                                    <li>사회적 관계 단절</li>
                                    <li>정체성 및 삶의 방향 혼란</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>정서 회복 → 우울·불안·소진 회복</li>
                                    <li>관계 회복 → 가족·부부·사회적 관계 재연결</li>
                                    <li>정체성 회복 → 낯선 환경 속에서도 나다운 삶 유지</li>
                                    <li>정밀 심리평가 → 개인 맞춤 회복 전략 설계</li>
                                    <li>적응 지원 → 문화적 차이와 새로운 환경에 대한 적응</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>해외 거주자<br />회복 프로그램</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>해외생활 정서회복 프로그램</li>
                                    <li>해외생활 부부·가족 관계 프로그램</li>
                                    <li>문화적응 및 관계회복 프로그램</li>
                                    <li>외로움·고립 회복 프로그램</li>
                                    <li>해외 이주·정착 준비 프로그램</li>
                                </ul>
                                <p>멀리 있어도 혼자가 되지 않도록, 낯선 환경 속에서 나답게 살아갈 힘을 함께 찾아갑니다.</p>
                            </div>
                            <img src={ico_box_bg5} alt="" className="bg_img" />
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
                            <img src={img_global5} alt="귀국자 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>익숙한 곳에서 낯설어진 나를 위한 회복</h3>
                            <p>
                                돌아왔지만 이전과 같은 삶으로 돌아가기 어렵다면,<span className='pc_br'></span>
단순한 적응의 문제가 아니라 변화된 나와 환경을 다시 연결하는 과정이 필요할 수 있습니다.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 접근</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>재적응·관계·정체성을 함께 다루는 통합 상담</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>상담 대상</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>해외생활 후 귀국자 · 유학 후 귀국 청년 · 귀국 가족 · 해외 장기체류 후 귀국자</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>주요 어려움</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>역문화 충격 및 재적응 스트레스</li>
                                    <li>가족·친구 관계의 어색함과 변화</li>
                                    <li>소속감 상실과 정체성 혼란</li>
                                    <li>귀국 후 무기력·외로움·고립감</li>
                                    <li>진로 및 삶의 방향에 대한 혼란</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>특장점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>재적응 → 변화된 한국 생활과 환경에 안정적으로 적응</li>
                                    <li>재연결 → 가족·친구·사회적 관계 다시 연결</li>
                                    <li>정체성 통합 → 해외에서의 경험과 현재의 나를 하나의 삶으로 연결</li>
                                    <li>방향 재설계 → 귀국 이후 진로와 삶의 새로운 방향 설정</li>
                                </ul>
                                <p>과거의 삶으로 돌아가는 것이 아니라, 변화된 나로 다시 시작할 수 있도록 돕습니다.</p>
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
                            <img src={img_global6} alt="Global Business (B2B)" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>글로벌 환경의 복잡성이 성과를 흔들릴 때<span className='pc_br'></span>사람과 조직의 안정성이 경쟁력이 됩니다</h3>
                            <p>해외 지사, 외국계 기업, 글로벌 조직을 위한 문화·정서·관계 기반의<span className='pc_br'></span>통합 심리지원 솔루션을 제공합니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 프로그램</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>Burnout & Resilience → 소진 예방 및 회복탄력성 강화</li>
                                    <li>Cross-Cultural Communication → 문화 차이로 인한 소통과 갈등 개선</li>
                                    <li>Expat & Family Support → 주재원 및 가족의 현지 적응과 정서 지원</li>
                                    <li>Leadership EQ → 글로벌 리더의 감정·관계·소통 역량 강화</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>적용 대상</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>해외 지사</li>
                                    <li>외국계 기업</li>
                                    <li>글로벌 조직</li>
                                    <li>주재원 및 가족</li>
                                    <li>다문화 팀</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>핵심 강점</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>글로벌 환경에 대한 전문적 이해</li>
                                    <li>다국어 상담 및 프로그램 운영</li>
                                    <li>주재원·가족 통합 지원</li>
                                    <li>기업과 조직 특성에 따른 맞춤 설계</li>
                                    <li>상담·코칭·교육 통합 솔루션</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>기대 효과</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>글로벌 조직 적응력 향상</li>
                                    <li>문화적 차이로 인한 갈등 감소</li>
                                    <li>직원 소진 예방 및 심리적 안정</li>
                                    <li>글로벌 리더십 역량 강화</li>
                                    <li>조직의 관계 안정성과 지속가능성 향상</li>
                                </ul>
                                <p>글로벌 비즈니스의 성과는, 결국 서로 다른 사람들이 함께 일하는 힘에서 시작됩니다.</p>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>기업 상담 · 제안서 요청하기</button>
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 6 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_global7} alt="Partnership" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>당신의 연결이 한 사람의 삶을 다시 세웁니다</h3>
                            <p>위드원상담코칭센터와 위드원 선교회는 전문적인 심리지원이 필요한<span className='pc_br'></span>선교사·사역자 가족·다문화가정·유학생에게 상담과 회복의 기회를 연결합니다.</p>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>왜 필요한가</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>마음을 돌보고, 사람을 세우고, 회복을 연결합니다.</li>
                                    <li>위드원 선교회는 심리·정서적 지원이 필요한 선교사와 사역자, 국내 미자립·개척교회 목회자와 가족을 위해 전문 상담과 심리회복 프로그램을 지원합니다.</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>후원 및 협력 분야</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>선교사 디브리핑 및 소진 회복 상담</li>
                                    <li>선교사 부부·가족 상담 지원</li>
                                    <li>미자립·개척교회 목회자·사모 심리상담 지원</li>
                                    <li>목회자 자녀(PK) 정서·관계 상담 지원</li>
                                    <li>다문화가정 및 자녀 심리상담 지원</li>
                                    <li>유학생 정서·적응 상담 지원</li>
                                    <li>위기 상황 대상자 긴급 심리지원</li>
                                    <li>심리회복 교육 및 집단 프로그램 운영</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>참여 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>정기 후원 → 지속적인 상담 및 회복 프로그램 지원</li>
                                    <li>일시 후원 → 긴급 심리지원 및 상담비 지원</li>
                                    <li>기관 협력(MOU) → 교회·기업·기관과 함께하는 심리회복 프로젝트 운영</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>WithOne<br />Partnership의 가치</h3>
                            </div>
                            <div className='s_info'>
                                <p className="top">상담이 필요한 사람과 회복의 기회를 연결합니다.</p>
                                <ul className='ul_list_1'>
                                    <li>회복 연결</li>
                                    <li>마음 돌봄</li>
                                    <li>위기 지원</li>
                                    <li>관계 회복</li>
                                    <li>사회적 책임</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="btn_wrap" direction="up">
                            <button type="button" className='btn_primary'>후원 및 협력 신청하기</button>
                        </AnimatedSection>
                    </>
                )}
            </div>
        </section>
    </div>
  );
};
export default GlobalFeatures;
