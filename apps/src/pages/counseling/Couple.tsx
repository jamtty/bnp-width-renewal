import { useState } from 'react';
import img_counseling from '../../assets/images/img_counseling_couple.png';

const tabList = [
  '특장점',
  '관계 정밀 진단 및 분석',
  '부부 커플 상담'
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
                            <h3>
                                반복되는 싸움에는 이유가 있습니다.<span className='mobile_br'></span>
                                서로를 바꾸려 하기보다
                                왜 같은 갈등이 반복되는지<span className='mobile_br'></span>이해하고
                                관계의 패턴을 바꾸어 갑니다.
                            </h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>무엇이 다른가요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>부부·커플 상담 20년 이상 임상 경험</li>
                                    <li>두 사람이 아닌 "관계"를 함께 이해하는 상담</li>
                                    <li>심리검사 기반 관계 패턴 분석</li>
                                    <li>대화와 갈등 해결 기술 실제 훈련</li>
                                    <li>관계 회복부터 이혼 결정까지 함께 상담</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>상담은 어떻게 진행되나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>현재의 갈등을 함께 이해하고 관계의 방향까지 함께 만들어 가는 과정입니다. 문제를 해결하고, 관계의 방향까지 함께 정리하는 상담입니다.</li>
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
                                        <strong>초기 면담<br />(동반 상담)</strong>
                                        <span>현재 갈등과 반복되는 관계 패턴 이해</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>관계 진단<br />(필요시)</strong>
                                        <span>애착·성격·소통 패턴 객관적 확인</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>해석 상담</strong>
                                        <span>갈등이 반복되는 구조와 원인 이해</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>상담 방향 설정</strong>
                                        <span>회복 또는 이혼 방향 정리</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>상담 진행</strong>
                                        <span>감정 회복 · 대화 변화 · 관계 회복</span>
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
                                    <li>초기 면담 : 80~90분</li>
                                    <li>부부·커플 상담: 80~90분</li>
                                    <li>관계 진단(심리검사 활용)</li>
                                    <li>해석 상담: 50~80분</li>
                                    <li>상황에 따라 유연하게 조정됩니다.</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <div className='tit'>
                            <h3>반복되는 갈등 뒤에는<span className='mobile_br'></span>감정 반응, 애착 방식, 소통 패턴이 숨어 있습니다</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>데이트 관계<br />진단 패키지</h3>
                                <p>반복되는 연애 패턴을 이해하고, 관계의 방향을 찾아갑니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>기질·성격 검사 (TCI)</li>
                                    <li>애착 유형 검사</li>
                                    <li>의사소통 유형 검사</li>
                                    <li>갈등 반응 패턴 검사</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>신혼부부 관계<br />진단 패키지</h3>
                                <p>왜 같은 사람에게 상처받고, 같은 갈등이 반복되는지 이해합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>기질·성격 검사 (TCI)</li>
                                    <li>PREPARE/ENRICH</li>
                                    <li>의사소통분석</li>
                                    <li>가치관 분석</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>부부 관계<br />진단 패키지</h3>
                                <p>반복되는 갈등의 이유를 감정이 아닌 구조로 이해합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>관계 만족도 검사</li>
                                    <li>TCI 성격검사</li>
                                    <li>애착유형 분석(ECR)</li>
                                    <li>의사소통 패턴 분석</li>
                                    <li>갈등 구조 분석</li>
                                </ul>
                                <p>관계 회복 가능성 · 핵심 문제 · 변화 방향 제시</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>이혼 전 결정<br />진단 패키지</h3>
                                <p>감정이 아닌 객관적 기준으로 관계를 점검합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>관계 만족도 검사</li>
                                    <li>TCI 성격검사</li>
                                    <li>애착유형 분석(ECR)</li>
                                    <li>MMPI-2 정서 상태 검사</li>
                                    <li>관계 지속 가능성 평가</li>
                                </ul>
                                <p>회복 가능성 · 관계 유지 가능성 · 이혼 결정 기준 정리</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>이혼 전 결정 상담</h3>
                                <p>감정이 아닌 기준으로 관계의<span className='mobile_br'></span>현재 상태와 회복 가능성을 점검합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>관계 상태 점검</li>
                                    <li>감정 정리</li>
                                    <li>후회 없는 선택을 위한 방향 정리</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>가까워질 용기<br />(부부관계 재설계 상담)</h3>
                                <p>관계 속에 사라진 친밀감과 정서적 연결을 회복하고,<span className='mobile_br'></span>다시 함께 살아갈 방법을 만들어 갑니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>감정 표현 회복</li>
                                    <li>건강한 대화 훈련</li>
                                    <li>관계 재정비</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <div className='tit'>
                            <h3>사랑도 소통도 연습이 필요합니다<span className='mobile_br'></span>서로의 감정과 애착 방식을 이해하고 건강한 관계를 만들어 갑니다.<span className='mobile_br'></span>애착 이해 · 감정 소통 · 건강한 관계 만들기</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>사랑에도 연습이 필요해요<br />(데이트 관계 상담)</h3>
                                <p>좋아하는 마음만으로는<span className='mobile_br'></span>건강한 관계가 유지되지 않습니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>관계 패턴 이해</li>
                                    <li>감정 조절 훈련</li>
                                    <li>건강한 소통 전략</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>다시 만날 수 있을까<br />(이별 후 재회 상담)</h3>
                                <p>헤어진 이유를 객관적으로 돌아보고<span className='mobile_br'></span>재회의 가능성과 현실성을 함께 점검합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>감정 정리</li>
                                    <li>관계 가능성 평가</li>
                                    <li>재회 현실성 판단</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>부부&커플 상담 신청하기</button>
                <button type="button" className='btn_secondary'>검사 &amp; 해석 상담 신청하기</button>
            </div>
        </section>
    </div>
  );
};
export default CounselingChild;
