const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>전문상담사 교육</h2>
        </div>
        <section className="con_1">
            <div className='tit'>
                <h3>사람을 읽는 힘이 상담의 깊이를 결정합니다</h3>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>핵심 교육 영역</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>
                            상담이론 & 사례개념화 교육
                            <p className="sm">이론을 실제 사례에 적용하여 문제 구조를 분석하는 훈련</p>
                        </li>

                        <li>
                            대상관계 이론 교육
                            <p className="sm">내담자의 관계 패턴과 내면 구조를 이해하는 핵심 이론</p>
                        </li>
                        <li>
                            정신역동 치료 교육
                            <p className="sm">무의식과 방어기제를 기반으로 한 심층 상담 접근</p>
                        </li>
                        <li>
                            정신분석적 진단 교육 (임상 진단)
                            <p className="sm">표면 증상이 아닌, 성격 구조와 역동을 진단하는 방법</p>
                        </li>
                        <li>
                            심리검사 교육
                            <p className="sm">MMPI · TCI 등 검사 해석과 상담 연결 훈련</p>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>코칭 프로그램 제안서 요청하기</button>
                <button type="button" className='btn_secondary'>비즈니스 미팅 신청</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
