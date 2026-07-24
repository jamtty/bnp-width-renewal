import AnimatedSection from '../../components/AnimatedSection';
const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>전문 상담사 수련 과정</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit" direction="up">
                <h3>기법보다 사람을 이해하는 상담자</h3>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>인턴 레지던트 수련<br />(Compass)</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>교수급 슈퍼비전</li>
                        <li>실제 사례 중심 임상훈련</li>
                        <li>사례개념화 및 진단훈련</li>
                        <li>학회 자격 연계</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>슈퍼바이저</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>20년 이상 임상·교육 경험의 교수급 슈퍼바이저</li>
                        <li>대상관계·정신분석·사례개념화 전문 지도</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>학회 자격 연계</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>한국상담학회</li>
                        <li>한국상담심리학회</li>
                        <li>한국기독교상담심리학회</li>
                        <li>학한국아동미술치료학회</li>
                        <li>EAP상담협회</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>코칭 프로그램 제안서 요청하기</button>
                <button type="button" className='btn_secondary'>비즈니스 미팅 신청</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
