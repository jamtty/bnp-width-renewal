import AnimatedSection from '../../components/AnimatedSection';
const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>선교사 심리상담</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit" direction="up">
                <h3>사명을 지키기 위한, 마음의 회복</h3>
                <p>사역의 자리에서 오래 버텨온 사람일수록 감정을 돌보지 못한 채 살아가는 경우가 많습니다.<span className='pc_br'></span>WithOne은 선교사와 사역자의 삶을 이해하는 전문 심리상담과<span className='pc_br'></span>회복 프로그램을 제공합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>주요 어려움</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>정서 소진 및 번아웃</li>
                        <li>팀·동역자 갈등</li>
                        <li>외상 및 위기 경험</li>
                        <li>비자발적 철수</li>
                        <li>정체성 및 소명 혼란</li>
                        <li>부부·가족 관계 문제</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>핵심 프로그램</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>디브리핑 상담 → 사역 경험과 감정 정리</li>
                        <li>번아웃 회복 상담 → 정서 소진 및 회복</li>
                        <li>위기·외상 상담 → 충격 사건 및 트라우마 회복</li>
                        <li>소명·정체성 상담 → 삶과 사역 방향 재정립</li>
                        <li>부부·가족 상담 → 관계 회복 및 재적응</li>
                        <li>MK 상담 → 정서·관계·학습·진로 지원</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>선교사 · 사역자<br />교육 프로그램</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>디브리핑 회복 워크숍</li>
                        <li>번아웃 예방 및 회복 워크숍</li>
                        <li>팀 갈등 회복 워크숍</li>
                        <li>선교사 부부 회복 워크숍</li>
                        <li>선교사 배우자 회복 프로그램</li>
                        <li>MK 부모 교육 프로그램</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <a href="http://pf.kakao.com/_AXwJn/chat" target="_blank" rel="noopener noreferrer" className='btn_primary'>상담 신청하기</a>
                <button type="button" className='btn_secondary'>교육 프로그램 신청하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
