import { useState } from 'react';
import img_counseling from '../../assets/images/img_counseling_adult.png';

const tabList = [
  '특장점',
  '정서 문제\n(우울 · 불안 · 공황)',
  '관계 문제\n(연애 · 가족 · 직장 갈등 등)',
  '번아웃 · 직장 스트레스',
  '진로 · 삶의 방향 혼란',
  '자존감 · 자기이해'
];

const CounselingChild = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>성인 상담 (20세 이상)</h2>
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
                    >{tab.split('\n').map((line, j) => (<>{j > 0 && <br />}{line}</>))}</button>
                ))}
            </div>
            <div className="tab_content">
                {activeTab === 0 && (
                    <>
                        <div className='tit_img'>
                            <img src={img_counseling} alt="성인 상담" />
                        </div>
                        <div className='tit'>
                            <h3>반복되는 문제 속에서<span className='mobile_br'></span>나를 이해하고 삶의 방향을 다시 찾는 시간</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>무엇이 다른가요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>정서·관계·삶의 방향을 함께 다루는 통합 상담</li>
                                    <li>심리검사 기반의 객관적인 자기이해와 맞춤 상담</li>
                                    <li>우울·불안·관계·진로 분야별 전문가 배정</li>
                                    <li>현재의 문제 해결과 장기적인 삶의 방향 설정을 함께 진행</li>
                                    <li>필요 시 병원 연계 및 통합적 접근</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>상담은 어떻게 진행되나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>반복되는 문제를 이해하고, 삶의 방향을 다시 세워가는 과정입니다.</li>
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
                                        <strong>심리검사</strong>
                                        <span>정서·성격·스트레스 상태 확인</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>해석 상담</strong>
                                        <span>문제의 원인과 반복되는 패턴 이해</span>
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
                                        <strong>상담 진행</strong>
                                        <span>일상 속 변화와 회복</span>
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
                                    <li>성인 상담: 50분</li>
                                    <li>심리검사: 60~120분</li>
                                    <li>해석 상담: 50분</li>
                                    <li>상황에 따라 유연하게 조정됩니다.</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <div className='tit'>
                            <h3>감정의 어려움은 단순한 기분 문제가 아니라<span className='mobile_br'></span>삶의 에너지와 방향에 영향을 주는 중요한 신호입니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>우울<br />체크리스트</h3>
                                <p>2개 이상 해당 시 우울·불안 상담을 권장 합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>우울감이나 무기력이 지속된다</li>
                                    <li>해야 할 일을 시작하기 어렵다</li>
                                    <li>긴장과 불안이 자주 반복된다</li>
                                    <li>일상에서 즐거움이나 흥미가 줄어들었다</li>
                                    <li>자신에 대한 부정적인 생각이 많아졌다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>불안 · 공황<br />체크리스트</h3>
                                <p>2개 이상 해당 시 우울·불안 상담을 권장 합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>걱정이 많고 생각이 멈추지 않는다</li>
                                    <li>긴장하거나 불안한 상태가 자주 지속된다</li>
                                    <li>가슴 답답함, 두근거림, 숨막힘을 느낀다</li>
                                    <li>예민해지고 쉽게 피로해진다</li>
                                    <li>특정 상황에서 불안이 갑자기 올라온다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>나를 힘들게 하는 감정의 원인을 이해하고, 우울과 불안에 휘둘리지 않는 안정감을 회복합니다.</li>
                                    <li>정서조절훈련 · 인지행동치료 · 감정회복훈련</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <div className='tit'>
                            <h3>관계에서 반복되는 패턴은<span className='mobile_br'></span>나의 감정과 삶 전체에 영향을 미칩니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>2개 이상 해당 시 관계 상담을 권장합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>관계에서 반복되는 갈등이 있다</li>
                                    <li>상대에게 맞추다 지치거나 억울함이 쌓인다</li>
                                    <li>감정을 표현하기 어렵다</li>
                                    <li>관계에서 거리감이나 외로움을 느낀다</li>
                                    <li>같은 문제로 반복적으로 상처를 받는다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>남에게 맞춰주다 지친 나를 지키고, 상처받지 않으면서 당당하게 내 마음을 전하는 건강한 관계의 기술을 배웁니다.</li>
                                    <li>관계회복상담 · 의사소통훈련 · 감정표현훈련 · 경계설정훈련</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 3 && (
                    <>
                        <div className='tit'>
                            <h3>지속적인 피로와 무기력은<span className='mobile_br'></span>단순 피곤함이 아니라 회복이 필요한 상태입니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>2개 이상 해당 시 스트레스 상담 권장</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>일에 대한 의욕이 크게 떨어졌다</li>
                                    <li>출근이나 업무가 부담스럽다</li>
                                    <li>쉽게 지치고 에너지가 없다</li>
                                    <li>감정적으로 무기력하거나 예민하다</li>
                                    <li>쉬어도 회복되는 느낌이 없다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>단순히 쉬는 것을 넘어 마음의 배터리를 다시 채우고, 일과 삶 사이에서 나를 잃지 않는 단단한 중심을 잡도록 돕습니다.</li>
                                    <li>번아웃회복 · 스트레스관리 · 에너지회복훈련 · 삶의균형코칭</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 4 && (
                    <>
                        <div className='tit'>
                            <h3>방향이 흔들릴 때<span className='mobile_br'></span>삶 전체가 막막하게 느껴질 수 있습니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>2개 이상 해당 시 진로·자기이해 상담을 권장합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>지금의 삶이 맞는지 확신이 없다</li>
                                    <li>진로 또는 직업 방향이 혼란스럽다</li>
                                    <li>목표 없이 시간을 보내는 느낌이 든다</li>
                                    <li>의미나 동기를 찾기 어렵다</li>
                                    <li>변화가 필요하지만 어떻게 해야 할지 모르겠다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>나의 강점과 가치관을 발견하고, 삶의 방향과 목표를 구체적으로 설계해 나갑니다.</li>
                                    <li>진로코칭 · 자기이해 · 가치탐색 · 목표설계</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 5 && (
                    <>
                        <div className='tit'>
                            <h3>자존감의 문제는<span className='mobile_br'></span>내가 나를 어떻게 바라보는지에서 시작됩니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 해당 시 디지털 사용습관 평가 및 상담 권장합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>스스로에 대한 확신이 부족하다</li>
                                    <li>비교나 평가에 민감하다</li>
                                    <li>자신을 자주 비난한다</li>
                                    <li>선택이나 결정이 어렵다</li>
                                    <li>내가 어떤 사람인지 잘 모르겠다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>자신을 있는 그대로 이해하고 수용하며, 건강한 자기존중감을 회복합니다.</li>
                                    <li>자기이해상담 · 인지재구성 · 자기수용훈련 · 강점탐색</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>성인 상담 신청하기</button>
                <button type="button" className='btn_secondary'>검사 &amp; 해석 상담 신청하기</button>
            </div>
        </section>
    </div>
  );
};
export default CounselingChild;
