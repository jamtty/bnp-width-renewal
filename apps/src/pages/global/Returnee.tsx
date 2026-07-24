import AnimatedSection from '../../components/AnimatedSection';
const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>귀국자 상담</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit" direction="up">
                <h3>익숙한 곳에서 낯설어진 나를 위한 회복</h3>
                <p>돌아왔지만 이전과 같은 삶으로 돌아가기 어려울 때<span className='pc_br'></span>재적응과 정체성 회복이 함께 필요합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>핵심 접근</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>재적응–정체성 통합 상담</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>상담 대상</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>해외 귀국자 · 유학 후 귀국 청년 · 귀국 가족</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>주요 문제</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>재적응 스트레스 · 관계 어색함 · 소속감 상실</li>
                        <li>정체성 혼란 · 진로 방향 재설계</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>특장점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>재적응 : 한국 생활 안착</li>
                        <li>재연결 : 관계 회복</li>
                        <li>정체성 통합 : 해외 경험과 현재 삶 연결</li>
                        <li>방향 재설계 : 진로·삶의 방향 찾기</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>상담 신청하기</button>
                <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
