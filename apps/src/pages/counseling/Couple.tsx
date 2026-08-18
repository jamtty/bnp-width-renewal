import AnimatedSection from '../../components/AnimatedSection';
import { useState } from 'react';
import img_counseling from '../../assets/images/img_counseling_couple.png';
import img_counseling2 from '../../assets/images/img_counseling_couple2.png';
import img_counseling3 from '../../assets/images/img_counseling_couple3.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';
import ico_box_bg_time from '../../assets/images/ico_box_bg_time.svg';

const tabList = [
  '특장점',
  '관계 정밀 진단 및 분석',
  '부부 커플 상담'
];

const CounselingChild = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>부부·커플 상담</h2>
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
                    >{tab.split('\n').map((line, j) => (<>{j > 0 && <br />}{line}</>))}</button>
                ))}
            </div>
            <div className="tab_content">
                {activeTab === 0 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_counseling} alt="성인 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>
                                반복되는 싸움에는 이유가 있습니다.<span className='pc_br'></span>
                                서로를 바꾸려 하기보다
                                왜 같은 갈등이 반복되는지<span className='pc_br'></span>이해하고
                                관계의 패턴을 바꾸어 갑니다.
                            </h3>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>무엇이 다른가요?</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>부부·커플 상담 20년 이상 임상 경험</li>
                                    <li>두 사람이 아닌 "관계"를 함께 이해하는 상담</li>
                                    <li>심리검사 기반 관계 패턴 분석</li>
                                    <li>대화와 갈등 해결을 위한 실제적인 관계 코칭</li>
                                    <li>관계 회복부터 관계의 지속 여부에 대한 결정까지 지원</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block" direction="up">
                            <div className='s_tit'>
                                <h3>상담은 어떻게 진행되나요?</h3>
                                <p>현재의 갈등을 함께 이해하고 관계의 방향까지 함께 만들어 가는 과정입니다.<br />문제를 해결하고, 관계의 방향까지 함께 정리하는 상담입니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='step_list_child'>
                                    <li>
                                        <div className='ico'>
                                            <p>초기 면담</p>
                                        </div>
                                        <p className='txt'>현재 문제와 상황 이해</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>심리검사</p>
                                        </div>
                                        <p className='txt'>정서·성격·진로 상태 확인</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>해석 상담</p>
                                        </div>
                                        <p className='txt'>갈등이 반복되는 구조와<span className='pc_br'></span>원인 이해</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>상담 방향 설정</p>
                                        </div>
                                        <p className='txt'>관계 회복 또는 관계의 지속 여부에 대한 방향 탐색</p>
                                    </li>
                                    <li>
                                        <div className='ico'>
                                            <p>상담 진행</p>
                                        </div>
                                        <p className='txt'>감정 회복 · 의사소통 변화 · 관계 패턴 변화</p>
                                    </li>
                                </ul>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection className="box" direction="up">
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
                            <img src={ico_box_bg_time} alt="" className="bg_img" />
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 1 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_counseling2} alt="관계 정밀 진단 및 분석" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>반복되는 갈등 뒤에는<span className='pc_br'></span>감정 반응, 애착 방식, 소통 패턴이 숨어 있습니다</h3>
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>데이트 관계 진단 패키지</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_1'>
                                    <li>기질·성격 검사 (TCI)</li>
                                    <li>애착 유형 검사</li>
                                    <li>의사소통 유형 검사</li>
                                    <li>갈등 반응 패턴 검사</li>
                                </ul>
                                <p className='Package-txt-blue'>반복되는 연애 패턴을 이해하고, 관계의 방향을 찾아갑니다.</p>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>신혼부부 관계 진단 패키지</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_2'>
                                    <li>기질·성격 검사 (TCI)</li>
                                    <li>PREPARE/ENRICH</li>
                                    <li>의사소통분석</li>
                                    <li>가치관 분석</li>
                                </ul>
                                <p className='Package-txt-blue'>현재의 관계를 이해하고, 함께 살아가기 위한 건강한 관계의 기초를 만들어 갑니다.</p>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>부부 관계 진단 패키지</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_3'>
                                    <li>관계 만족도 검사</li>
                                    <li>TCI 성격검사</li>
                                    <li>애착유형 분석(ECR)</li>
                                    <li>의사소통 패턴 분석</li>
                                    <li>갈등 구조 분석</li>
                                </ul>
                                <p className='Package-txt-blue'>핵심 관계 문제 · 반복 패턴 · 변화 방향 제시</p>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>이혼 전 관계 점검 패키지</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_1'>
                                    <li>관계 만족도 평가</li>
                                    <li>기질·성격 검사(TCI)</li>
                                    <li>애착 유형 분석(ECR)</li>
                                    <li>정서·심리 상태 평가(MMPI-2)</li>
                                    <li>반복되는 갈등과 관계 패턴 분석</li>
                                </ul>
                                <p className='Package-txt-blue'>현재 관계 상태 · 핵심 갈등 · 관계 변화 가능성 탐색</p>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        {/*
                        <AnimatedSection className="box" direction="up">
                            <div className='s_tit'>
                                <h3>이혼 전 결정 상담</h3>
                                <p>감정이 아닌 기준으로 관계의<span className='pc_br'></span>현재 상태와 회복 가능성을 점검합니다.</p>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_1'>
                                    <li>관계 상태 점검</li>
                                    <li>감정 정리</li>
                                    <li>후회 없는 선택을 위한 방향 정리</li>
                                </ul>
                            </div>
                            <img src={ico_box_bg5} alt="" className="bg_img" />
                        </AnimatedSection>
                        */}
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>가까워질 용기<br />(부부관계 재설계 상담)</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_2'>
                                    <li>감정적 연결 회복</li>
                                    <li>애착 욕구 이해</li>
                                    <li>갈등 패턴 변화</li>
                                    <li>친밀감 회복</li>
                                    <li>관계 재설계</li>
                                </ul>
                                <p className='Package-txt-blue'>관계 속에서 멀어진 친밀감과 정서적 연결을 회복하고,<span className='pc_br'></span>다시 함께 살아갈 관계의 방식을 만들어갑니다.</p>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                    </>
                )}
                {activeTab === 2 && (
                    <>
                        <AnimatedSection className="tit_img" direction="up">
                            <img src={img_counseling3} alt="부부 커플 상담" />
                        </AnimatedSection>
                        <AnimatedSection className="tit" direction="up">
                            <h3>사랑도 소통도 연습이 필요합니다<span className='pc_br'></span>서로의 감정과 애착 방식을 이해하고 건강한 관계를 만들어 갑니다.<span className='pc_br'></span>애착 이해 · 감정 소통 · 건강한 관계 만들기</h3>
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>사랑에도 연습이 필요해요<br />(데이트 관계 상담)</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_1'>
                                    <li>애착 이해</li>
                                    <li>관계 패턴 이해</li>
                                    <li>감정 조절</li>
                                    <li>건강한 의사소통</li>
                                </ul>
                                <p className='Package-txt-blue'>좋아하는 마음만으로 건강한 관계가 만들어지는 것은 아닙니다.<br />서로의 감정과 애착 방식을 이해하고 건강하게 사랑하는 방법을 배워갑니다.</p>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>우리, 결혼해도 괜찮을까?<br />(결혼 전·예비부부 상담)</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_2'>
                                    <li>성격 이해</li>
                                    <li>가치관 점검</li>
                                    <li>갈등 방식 이해</li>
                                    <li>결혼생활 준비</li>
                                </ul>
                                <p className='Package-txt-blue'>사랑을 넘어 함께 살아가기 위해 서로의 가치관과 기대,<span className='pc_br'></span>성격과 관계 방식을 이해하고 결혼생활의 기초를 준비합니다.</p>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>왜 우리는 같은 문제로 싸울까?<br />(부부 갈등 상담)</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_3'>
                                    <li>갈등 패턴 이해</li>
                                    <li>감정 및 욕구 이해</li>
                                    <li>의사소통 변화</li>
                                    <li>관계 회복</li>
                                </ul>
                                <p className='Package-txt-blue'>누가 옳고 그른지를 따지기보다 반복되는 갈등 속에 숨은 감정과 욕구,<span className='pc_br'></span>관계 패턴을 이해하고 새로운 소통 방식을 만들어갑니다.</p>
                            </div>
                            <img src={ico_box_bg3} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>가까워질 용기<br />(부부관계 재설계 상담)</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_1'>
                                    <li>정서적 연결 회복</li>
                                    <li>애착 욕구 이해</li>
                                    <li>친밀감 회복</li>
                                    <li>관계 재설계</li>
                                </ul>
                                <p className='Package-txt-blue'>관계 속에서 멀어진 친밀감과 정서적 연결을 회복하고,<span className='pc_br'></span>서로를 새롭게 이해하며 다시 함께 살아갈 관계의 방식을 만들어갑니다.</p>
                            </div>
                            <img src={ico_box_bg4} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>외도·신뢰 회복 상담</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_2'>
                                    <li>상처와 감정 정리</li>
                                    <li>신뢰 손상 이해</li>
                                    <li>관계 지속 여부 탐색</li>
                                    <li>신뢰 재형성</li>
                                </ul>
                                <p className='Package-txt-blue'>외도나 관계의 배신으로 무너진 신뢰와 상처를 다루고,<span className='pc_br'></span>관계를 지속할 것인지에 대한 선택과 회복의 과정을 함께합니다.</p>
                            </div>
                            <img src={ico_box_bg5} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>이별 후 관계 상담</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_3'>
                                    <li>감정 정리</li>
                                    <li>이별 원인 이해</li>
                                    <li>관계 패턴 점검</li>
                                    <li>재회 방향 탐색</li>
                                </ul>
                                <p className='Package-txt-blue'>헤어진 관계와 이별의 이유를 객관적으로 돌아보고,<span className='pc_br'></span>다시 만나는 것이 서로에게 건강한 선택인지 함께 살펴봅니다.</p>
                            </div>
                            <img src={ico_box_bg1} alt="" className="bg_img" />
                        </AnimatedSection>
                        <AnimatedSection className="box d-block-new" direction="up">
                            <div className='s_tit'>
                                <h3>함께할까, 헤어질까?<br />(이혼 전 결정 상담)</h3>
                            </div>
                            <div className='s_info'>
                                <ul className='ul_list_Package_1'>
                                    <li>관계 상태 점검</li>
                                    <li>감정 정리</li>
                                    <li>핵심 문제 이해</li>
                                    <li>선택의 기준 탐색</li>
                                </ul>
                                <p className='Package-txt-blue'>관계를 유지해야 할지 끝내야 할지 혼란스러운 상황에서 현재의 관계를 객관적으로 이해하고,<span className='pc_br'></span>충분히 고민한 후 자신에게 중요한 선택의 방향을 찾아갑니다.</p>
                            </div>
                            <img src={ico_box_bg2} alt="" className="bg_img" />
                        </AnimatedSection>
                    </>
                )}
            </div>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>부부&커플 상담 신청하기</button>
                <button type="button" className='btn_secondary'>검사 &amp; 해석 상담 신청하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default CounselingChild;
