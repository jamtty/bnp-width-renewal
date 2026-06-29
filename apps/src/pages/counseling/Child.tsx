import { useState } from 'react';
import img_counseling_child from '../../assets/images/img_counseling_child.png';

const tabList = [
  '특장점',
  'ADHD · 주의력 · 충동성',
  '디지털 과의존',
  '틱· 신체긴장',
  '정서불안 · 분노조절',
  '자존감· 자기이해',
  '또래관계 · 학교적응'
];

const CounselingChild = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>아동 상담 (만 4세 ~ 12세)</h2>
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
                            <img src={img_counseling_child} alt="아동 상담" />
                        </div>
                        <div className='tit'>
                            <h3>아이를 고치기보다, 아이의 마음을 먼저 이해합니다</h3>
                            <p>아이의 변화가 상담실에서 끝나지 않고 가정과 학교까지 이어지도록 함께합니다.</p>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>무엇이 다른가요?</h3>
                                <p>3개 이상 반복된다면 전문가 상담을 권합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>교수진 자문 기반의 전문 상담 시스템</li>
                                    <li>심리검사 기반의 맞춤 상담 방향 설정</li>
                                    <li>부모와 함께 변화를 만들어가는 양육 코칭</li>
                                    <li>가정과 학교까지 연결되는 변화 지원</li>
                                    <li>놀이·정서·행동·관계를 함께 보는 통합 상담</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>상담은 어떻게 진행되나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>아이의 현재 상태를 이해하고 정서와 행동의 변화를 함께 만들어가는 과정입니다.</li>
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
                                        <span>아이의 일상과 부모의 고민 이해</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>심리검사(필요시)</strong>
                                        <span>정서·주의력·발달 상태 확인</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>해석 상담</strong>
                                        <span>아이의 어려움과 원인 설명</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>상담 방향 설정</strong>
                                        <span>아이에게 맞는 개입 방향 설정</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>상담 진행 &amp; 부모코칭</strong>
                                        <span>
                                            아이에게 맞는 개입 방향 설정<br />
                                            상담 진행 & 부모코칭<br />
                                            아이 변화와 가정 내 변화 연결
                                        </span>
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
                                    <li>심리검사: 60~120분</li>
                                    <li>아동 상담: 40~50분</li>
                                    <li>해석 상담: 50분</li>
                                    <li>부모 상담: 50분</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <div className='tit'>
                            <h3>집중이 어렵고 산만한 아이,<br />단순한 성격 문제가 아닙니다.</h3>
                            <p>
                                해야 할 일을 알고 있지만 끝까지 이어가지 못하는 경우가 많습니다.<br />
                                주의력과 실행기능, 자기조절 능력을 함께 살펴야 합니다.
                            </p>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 반복된다면 전문가 상담을 권합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>집중이 쉽게 흐트러진다</li>
                                    <li>해야 할 일을 자주 미룬다</li>
                                    <li>가만히 있기가 어렵다</li>
                                    <li>말을 끊거나 끼어든다</li>
                                    <li>충동적으로 행동하는 경우가 많다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>의지가 부족한 게 아니라 도움이 필요한 신호입니다. 멈추는 연습이 필요합니다.</li>
                                    <li>놀이치료 · 부모훈련 · 행동수정 · 실행기능훈련 · 자기조절훈련<br />정밀 평가 + 부모코칭 + 자기조절 훈련 통합 진행</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <div className='tit'>
                            <h3>게임과 스마트폰 문제는<br />단순 사용 시간이 아니라 스스로 멈추기 어려운<br />조절 문제와 연결됩니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 반복된다면 전문가 상담을 권합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>스마트폰/게임을 멈추기 어렵다</li>
                                    <li>사용 후 짜증이나 분노가 증가한다</li>
                                    <li>수면 시간이 늦어지고 리듬이 깨진다</li>
                                    <li>현실 활동보다 디지털에 더 몰입한다</li>
                                    <li>부모 통제가 갈등으로 이어진다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>스마트폰보다 재미있는 '성취감'을 경험하면 아이는 스스로 멈출 수 있습니다.</li>
                                    <li>디지털조절훈련 · 부모코칭 · 생활습관훈련 · 자기조절훈련</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 3 && (
                    <>
                        <div className='tit'>
                            <h3>틱은 습관이 아니라<br />아이의 긴장과 불안이<br />몸으로 표현되는 신호입니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 반복된다면 전문적인 점검이 도움이 됩니다</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>눈깜빡임, 헛기침 등 반복 행동이 있다</li>
                                    <li>긴장 시 증상이 심해진다</li>
                                    <li>멈추려 해도 어렵다</li>
                                    <li>지적하면 더 심해진다</li>
                                    <li>아이가 부끄러워한다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>몸으로 터져 나오는 긴장을 말과 호흡으로 안전하게 풀어내어,<br />아이의 몸과 마음을 편안하게 만듭니다.</li>
                                    <li>긴장이완훈련 · 불안조절훈련 · 가족반응코칭 · 놀이치료</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 4 && (
                    <>
                        <div className='tit'>
                            <h3>집중이 어렵고 산만한 아이 노력하는데도<br />자꾸 놓치는 아이가 있습니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 반복된다면 정서 상담을 권합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>쉽게 울거나 짜증을 낸다</li>
                                    <li>감정을 말로 표현하기 어렵다</li>
                                    <li>걱정이 많고 불안하다</li>
                                    <li>분노 후 후회하거나 위축된다</li>
                                    <li>예민하고 감정 기복이 크다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>화부터 내는 습관을 바꾸기 위해, 아이가 자기 마음을 정확한 언어로 표현하는 법을 배웁니다.</li>
                                    <li>놀이치료 · 감정코칭 · 정서조절훈련 · 자기표현훈련</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 5 && (
                    <>
                        <div className='tit'>
                            <h3>아이의 자신감은 칭찬보다<br />경험 속에서 자랍니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 반복된다면 자존감 및 자기이해 상담을 권합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>나는 못해”라는 말을 자주 한다</li>
                                    <li>친구나 형제와 비교에 민감하다</li>
                                    <li>도전을 피하거나 쉽게 포기한다</li>
                                    <li>칭찬을 받아들이지 못한다</li>
                                    <li>위축되거나 자신감이 부족하다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>아이가 자신의 강점과 가능성을 발견하고, 스스로를 긍정적으로 바라볼 수 있도록 돕습니다.<br />
작은 성공 경험을 통해 "나도 할 수 있다"는 자신감을 키워갑니다.</li>
                                    <li>자기이해상담 , 놀이치료 , 자기표현훈련, 인지재구성 , 강점 발견 및 성공경험 훈련</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 6 && (
                    <>
                        <div className='tit'>
                            <h3>관계 문제는 시간이 지날수록<br />아이의 자존감과 학교 생활 전반에 영향을 줍니다.</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>체크리스트</h3>
                                <p>3개 이상 반복된다면 또래관계·학교적응 상담을 권합니다</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>친구와 자주 갈등이 있다</li>
                                    <li>혼자 있는 경우가 많다</li>
                                    <li>학교 가기를 힘들어한다</li>
                                    <li>자기표현이 어렵거나 지나치게 강하다</li>
                                    <li>집단 활동에서 불편함을 느낀다</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>치료 방법</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>친구의 마음을 읽고 갈등을 해결하는 연습을 통해, 어떤 상황에서도<br />당당하게 어울릴 수 있는 대화 기술을 배웁니다</li>
                                    <li>사회성훈련 · 역할놀이 · 갈등해결훈련 · 부모상담</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>아동 상담 신청하기</button>
                <button type="button" className='btn_secondary'>검사 &amp; 해석 상담 신청하기</button>
            </div>
        </section>
    </div>
  );
};
export default CounselingChild;
