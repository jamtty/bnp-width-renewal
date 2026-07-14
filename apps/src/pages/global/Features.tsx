const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>특장점</h2>
        </div>
        <section className="con_1">
            <div className='tit'>
                <h3>언어가 아니라, 마음을 이해하는 상담</h3>
                <p>해외생활, 선교사역, 다문화 환경에서 경험하는<span className='pc_br'></span>정서·관계·정체성의 어려움을 함께 다룹니다.</p>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>WithOne Global<br /> 차별성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>선교사·MK·다문화·유학생 전문 상담</li>
                        <li>영어·중국어·일본어·베트남어·몽골어 상담 가능</li>
                        <li>전 세계 어디서나 온라인 상담 가능</li>
                        <li>문화와 정체성을 고려한 맞춤 상담</li>
                        <li>상담·코칭·교육 통합 지원</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>글로벌 상담은<br />어떻게 다른가요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>글로벌 상담은 문화와 환경 속에서 반복되는 적응·관계·정체성의 어려움을 함께 이해하는 과정입니다.</li>
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
                            <strong>초기 상담</strong>
                            <span>문화·환경·적응 상태 이해</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>정밀 평가</strong>
                            <span>심리검사 및 정서·관계 분석</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>해석 상담</strong>
                            <span>정체성·관계·적응 구조 이해</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>개입 계획</strong>
                            <span>문화적 맥락을 반영한 맞춤 전략</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>상담 진행</strong>
                            <span>정서 회복 · 관계 회복 · 적응 지원</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>상담 신청하기</button>
                <button type="button" className='btn_secondary'>교육 프로그램 신청하기</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
