import img_counseling from '../../assets/images/img_specialized_features.png';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>특장점</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="특장점" />
            </div>
            <div className='tit'>
                <h3>반복되는 문제에는<span className='mobile_br'></span>더 전문적인 접근이 필요합니다.</h3>
                <p>일반 상담만으로 해결하기 어려운 문제를 전문 평가와 맞춤 개입으로 돕습니다.</p>
            </div>
            <div className='box'>
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
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>상담은 어떻게 진행되나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>문제를 해결하는 것을 넘어 반복되는 패턴의 구조를 바꾸는 과정입니다.</li>
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
                            <span>문제 및 생활 패턴 이해</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>정밀 진단</strong>
                            <span>심리검사 및 기능 평가</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>해석 상담</strong>
                            <span>문제 구조 및 유지 요인 설명</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>개입 설계</strong>
                            <span>이론 기반 맞춤 전략 수립</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>상담 진행</strong>
                            <span>행동·감정 변화까지 연결</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>상담 및 코칭 방향</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>문제를 이해하는 것을 넘어, 반복되는 패턴을 바꾸는 상담입니다.</li>
                    </ul>
                </div>
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>상담 신청하기</button>
                <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
