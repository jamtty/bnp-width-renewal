import { useState } from 'react';
import img_counseling from '../../assets/images/img_counseling_child.png';

const tabList = [
  '아동 원데이 마음 검사',
  '청소년 원데이 마음 검사',
  '성인 원데이 마음 검사',
];

const CounselingChild = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>원데이 마음 검사</h2>
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
                            <img src={img_counseling} alt="아동 상담" />
                        </div>
                        <div className='tit'>
                            <h3>아이의 행동은 고쳐야 할 문제가 아니라<span className='mobile_br'></span>이해해야 할 신호일 수 있습니다</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>무엇을 확인하나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>아이의 정서 상태와 행동 특성</li>
                                    <li>또래 및 가족과의 관계 반응</li>
                                    <li>부모-자녀 상호작용 방식</li>
                                    <li>양육 태도와 반응 패턴</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>진행 방식</h3>
                                <p>아동은 검사처럼 진행하지 않습니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>놀이관찰 및 간단 놀이평가</li>
                                    <li>부모 양육태도 검사</li>
                                    <li>아동 정서·행동 체크</li>
                                    <li>(필요 시) 주의력 간단 확인</li>
                                </ul>
                                <p>아이의 상태를 자연스럽게 이해하고, 부모의 방향까지 함께 정리합니다</p>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <div className='tit'>
                            <h3>무기력, 학업 문제, 감정 기복</h3>
                            <p>단순 문제가 아니라 정서·학습·관계가 함께 영향을 주고 있을 수 있습니다</p>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>무엇을 확인하나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>정서 상태 (우울·불안)</li>
                                    <li>학습 및 실행력 흐름</li>
                                    <li>진로 방향</li>
                                    <li>부모와의 관계 상태</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>검사 구성</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>청소년 정서 검사 (MMPI-A)</li>
                                    <li>기질·성격 검사 (TCI)</li>
                                    <li>생각·감정 흐름 탐색 (SCT)</li>
                                    <li>(필요 시) 간단 진로·학습 확인</li>
                                </ul>
                                <p>혼란을 정리하고 방향을 잡는 데 도움을 줍니다.</p>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <div className='tit'>
                            <h3>반복되는 감정과 스트레스가 있다면<span className='mobile_br'></span>단순 기분이 아니라 패턴일 수 있습니다</h3>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>무엇을 확인하나요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>현재 정서 상태 (우울·불안·스트레스)</li>
                                    <li>성격 및 감정 반응 방식</li>
                                    <li>반복되는 생각과 관계 패턴</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>검사 구성</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_3'>
                                    <li>성격·기질 검사 (TCI)</li>
                                    <li>정서 상태 검사 (MMPI-2)</li>
                                    <li>생각·감정 흐름 탐색 (SCT)</li>
                                </ul>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='s_tit'>
                                <h3>진행 과정(공통)</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_3'>
                                    <li>검사 및 평가 진행 (약 60~90분)</li>
                                    <li>해석 상담 (50분)</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>원데이 검사 예약하기</button>
            </div>
        </section>
    </div>
  );
};
export default CounselingChild;
