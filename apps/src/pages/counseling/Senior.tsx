import { useState } from 'react';
import img_counseling from '../../assets/images/img_counseling_senior.png';

const tabList = [
  '특장점',
  '시니어 진단 패키지',
  '상담 프로그램'
];

const CounselingChild = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>시니어 상담</h2>
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
                                은퇴 이후에도 삶은 계속됩니다<span className='mobile_br'></span>
                                상실과 변화의 시간을 지나<span className='mobile_br'></span>
                                다시 의미 있는 삶을 만들어 가는 상담입니다.
                            </h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>무엇이 다른가요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>사별·은퇴·건강 변화 이후의 심리 회복</li>
                                    <li>우울·외로움·무기력에 대한 전문 상담</li>
                                    <li>자녀·배우자와의 관계 갈등 상담</li>
                                    <li>노년기 삶의 의미와 역할 재설계</li>
                                    <li>가족과 함께하는 의사결정 및 돌봄 상담</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>상담은 어떻게 진행되나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_2'>
                                    <li>"나이가 들어도 삶은 계속됩니다." 정서와 관계를 회복하고 다시 의미 있는 삶을 만들어 가는 상담입니다.</li>
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
                                        <span>현재 갈등과 관계 흐름 이해</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>시니어 진단</strong>
                                        <span>정서·인지·관계 상태 확인</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>해석 상담</strong>
                                        <span>현재 상태와 원인 설명</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>상담 방향 설정</strong>
                                        <span>회복 및 변화 방향 설정</span>
                                    </li>
                                    <li>
                                        <div className='ico'></div>
                                        <div className='line'></div>
                                        <strong>상담 진행</strong>
                                        <span>정서 회복 + 관계 조율 + 삶의 통합</span>
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
                                    <li>시니어 상담: 50분</li>
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
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>시니어 종합 마음 건강 진단</h3>
                                <p>정서·인지·관계·삶의 만족도를 종합적으로 확인하여<span className='mobile_br'></span>현재의 상태와 회복 방향을 찾습니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>우울·무기력 상태 확인</li>
                                    <li>기억력 및 인지 기능 점검</li>
                                    <li>삶의 만족도와 의미 수준 평가</li>
                                    <li>자녀·배우자와의 관계 상태 점검</li>
                                    <li>전문 해석 상담 포함</li>
                                </ul>
                                <p>현재 나의 마음 건강 상태와 필요한 도움을 확인합니다.</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>기억·인지 기능 정밀 진단</h3>
                                <p>기억력 저하와 인지 기능 변화를 확인하고<span className='mobile_br'></span>치매 예방 및 조기 발견을 돕습니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>기억력 및 주의력 평가</li>
                                    <li>인지 기능 전반 점검</li>
                                    <li>일상생활 수행 능력 확인</li>
                                    <li>치매 위험도 및 초기 변화 확인</li>
                                    <li>전문 해석 상담 포함</li>
                                </ul>
                                <p>기억력 저하의 원인을 확인하고 필요한 대응 방향을 안내합니다.</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>정서·상실 반응 진단</h3>
                                <p>사별, 외로움, 우울감, 무기력 등<span className='mobile_br'></span>노년기 정서 상태를 확인합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>우울·불안 수준 평가</li>
                                    <li>상실과 애도 반응 점검</li>
                                    <li>스트레스 및 정서 상태 확인</li>
                                    <li>삶의 의미와 만족도 평가</li>
                                    <li>전문 해석 상담 포함</li>
                                </ul>
                                <p>정서 회복을 위한 상담 방향을 함께 설계합니다.</p>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>상실 회복 프로그램</h3>
                                <p>사별 · 외로움 · 무의미감<span className='mobile_br'></span>상실을 정리하고 삶의 의미를 다시 연결합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>감정 정리</li>
                                    <li>회상 치료</li>
                                    <li>삶의 의미 재구성</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>가족 관계 회복 프로그램</h3>
                                <p>자녀 갈등 · 돌봄 스트레스<span className='mobile_br'></span>세대 간 거리와 감정을 조율합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>자녀 관계 회복</li>
                                    <li>돌봄 부담 조율</li>
                                    <li>가족 역할 정리</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>인지·기억 유지 프로그램</h3>
                                <p>기억력 저하 · 치매 불안<span className='mobile_br'></span>인지 기능을 유지하고 일상을 안정시킵니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>기억력 훈련</li>
                                    <li>주의력 강화</li>
                                    <li>일상 기능 유지</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>시니어 상담 신청하기</button>
                <button type="button" className='btn_secondary'>검사 &amp; 해석 상담 신청하기</button>
            </div>
        </section>
    </div>
  );
};
export default CounselingChild;
