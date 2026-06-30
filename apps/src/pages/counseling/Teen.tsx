import { useState } from 'react';
import img_counseling from '../../assets/images/img_counseling_teen.png';

const tabList = [
  '특장점',
  '정서불안/자기이해',
  '진로혼란 · 정체감',
  '관계 · 또래 · 가족갈등',
  '학습 · 집중력 · ADHD',
  '디지털 과의존'
];

const CounselingChild = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>청소년 상담 (만 13세 ~ 19세)</h2>
        </div>
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
                        <div className='tit_img'>
                            <img src={img_counseling} alt="청소년 상담" />
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>무엇이 다른가요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>정서·학업·진로·관계를 함께 보는 통합 상담</li>
                                    <li>심리검사 기반 자기이해 및 진로탐색</li>
                                    <li>부모 코칭을 통한 가정 내 대화 연결</li>
                                    <li>감정조절과 실행력을 함께 키우는 상담</li>
                                    <li>문제 해결을 넘어 미래 방향을 함께 설계하는 상담</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>핵심진단</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>기질 분석 (TCI) → 성향과 에너지 방향</li>
                                    <li>심리 상태 (MMPI-A) → 정서·스트레스 상태</li>
                                    <li>진로 탐색 → 가치관과 방향성</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>상담은 어떻게 진행되나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>현재의 어려움을 이해하고, 자기이해와 성장의 방향을 함께 찾아가는 과정입니다.</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box d-block'>
                            <div className='s_tit'>
                                <h3>진행과정</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='step_list'>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>초기 면담</strong>
                                        <span>현재 문제와 상황 이해</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>심리검사(필요시)</strong>
                                        <span>정서·성격·진로 상태 확인</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>해석 상담</strong>
                                        <span>자기이해 및 성장 과제 탐색</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>상담 방향 설정</strong>
                                        <span>변화 목표 및 방향 설정</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>상담 진행 &amp; 부모코칭</strong>
                                        <span>감정조절 + 행동 변화 + 실행코칭</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>상담 시간 안내</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_3'>
                                    <li>초기 면담 : 50분</li>
                                    <li>청소년 상담: 50분</li>
                                    <li>심리검사: 60~120분</li>
                                    <li>해석 상담: 50분</li>
                                    <li>상황에 따라 유연하게 조정됩니다.</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>상담 및 코칭 방향</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>정서·생각·행동·관계를 함께 이해하고,자기이해·감정조절·관계기술·실행코칭을 통해 실제 삶의 변화를 돕습니다.</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <div className='tit'>
                            <h3>감정의 혼란은 청소년기의<span className='mobile_br'></span>중요한 성장 신호일 수 있습니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 반복된다면 정서·자기이해 상담을 권합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>감정 기복이 크고 조절이 어렵다</li>
                                    <li>이유 없이 우울하거나 불안할 때가 많다</li>
                                    <li>자기비난이나 부정적인 생각이 반복된다</li>
                                    <li>감정을 표현하기 어렵거나 억누른다</li>
                                    <li>사소한 일에도 예민하게 반응한다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>감정의 원인을 이해하고, 자기비난보다 자기이해를 통해 건강한 자아를 형성하도록 돕습니다.</li>
                                    <li>정서조절훈련 · 자기이해상담 · 인지개입 · 자기표현훈련 · 자아정체감 탐색</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <div className='tit'>
                            <h3>진로 문제는 단순 선택이 아니라<span className='mobile_br'></span>“나는 누구인가”의 문제입니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 반복된다면 진로·정체감 상담을 권합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>진로에 대한 방향이 전혀 잡히지 않는다</li>
                                    <li>하고 싶은 것과 해야 할 것 사이에서 혼란스럽다</li>
                                    <li>목표 없이 시간을 보내는 경우가 많다</li>
                                    <li>자신에 대한 이해가 부족하다고 느낀다</li>
                                    <li>미래를 생각하면 불안하거나 막막하다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>진로와 정체감 문제는 자기이해에서 출발합니다. 자신의 강점과 가치를 발견하고 구체적인 목표를 설계하는 과정을 통해, 막연한 불안을 방향감 있는 미래 설계로 전환합니다.</li>
                                    <li>자기이해코칭 · 진로탐색 · 강점분석 · 가치관 탐색 · 목표설계</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 3 && (
                    <>
                        <div className='tit'>
                            <h3>관계의 어려움은 정서와 자존감에<span className='mobile_br'></span>직접적인 영향을 줍니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 해당 시 관계 상담 권장</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>친구와의 관계에서 스트레스를 자주 느낀다</li>
                                    <li>또래나 길들이 반복된다</li>
                                    <li>혼자 있는 시간이 많아졌다</li>
                                    <li>부모와 대화가 어렵거나 갈등이 잦다</li>
                                    <li>관계에서 위축되거나 과도하게 예민하다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>관계 패턴을 분석하고 갈등의 원인을 이해하여, 건강한 의사소통과 관계 회복을 돕습니다.</li>
                                    <li>관계문제 · 의사소통문제 · 역할갈등 · 가족상담</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 4 && (
                    <>
                        <div className='tit'>
                            <h3>학습의 어려움은<span className='mobile_br'></span>단순한 성적 문제가 아니라<span className='mobile_br'></span>주의력, 감정, 동기와 깊이 연결되어 있습니다</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 해당 시 학습·집중력 평가 및 상담 권장합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>집중이 잘 되지 않아 공부 지속이 어렵다</li>
                                    <li>해야 할 일을 자주 미루거나 놓친다</li>
                                    <li>계획을 세우지만 실행이 어렵다</li>
                                    <li>공부를 시작하거나 지속하기 어렵다</li>
                                    <li>산만하거나 충동적인 행동이 있다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>부족한 의지를 탓하기보다, 실행기능과 자기조절 능력을 강화하여 스스로 계획하고 끝까지 해내는 경험을 만들어 갑니다.</li>
                                    <li>학습코칭 · 실행기능훈련 · 시간관리훈련 · 자기조절훈련</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 5 && (
                    <>
                        <div className='tit'>
                            <h3>디지털 과의존은 단순한 습관이 아니라<span className='mobile_br'></span>자기조절의 문제입니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 해당 시 디지털 사용습관 평가 및 상담 권장합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>스마트폰·게임을 스스로 멈추기 어렵다</li>
                                    <li>사용 제한 시 강한 짜증이나 분노가 나타난다</li>
                                    <li>사용 시간이 점점 늘어난다</li>
                                    <li>수면 패턴이 깨진다</li>
                                    <li>공부보다 디지털을 우선한다</li>
                                    <li>가족과 갈등이 잦다</li>
                                    <li>사용 후 무기력하거나 학업 집중이 어려워진다</li>
                                    <li>현실 관계보다 온라인 활동에 더 몰입한다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>강력한 디지털 자극에 무뎌진 조절력을 회복하고, 일상의 즐거움과 활력을 찾도록 돕습니다</li>
                                    <li>디지털조절훈련 · 자기조절훈련 · 생활습관코칭 · 부모코칭</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>청소년 상담 신청하기</button>
                <button type="button" className='btn_secondary'>검사 &amp; 해석 상담 신청하기</button>
            </div>
        </section>
    </div>
  );
};
export default CounselingChild;
