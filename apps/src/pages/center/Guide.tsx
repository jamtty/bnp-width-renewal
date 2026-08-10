import AnimatedSection from '../../components/AnimatedSection';
const CenterGuide = () => {
  return (
    <div className="page_cont guide">
        <AnimatedSection className="page_tit" direction="up">
            <h2>증상을 넘어, 삶의 회복으로</h2>
            <p>위드원상담코칭센터와 함께합니다.</p>
        </AnimatedSection>
        <section className="con_1">
            <ul className="card_list">
                <AnimatedSection direction="up" as="li" delay={0}>
                    <div className='tit'>
                        <div className="num">1</div>
                        <h3>상담신청</h3>
                    </div>
                    <p>
                        회복을 향한 첫걸음 접수 문진을 통한 최적의 분야별 전문가 매칭
                    </p>
                </AnimatedSection>
                <AnimatedSection direction="up" as="li" delay={0.15}>
                    <div className='tit'>
                        <div className="num">2</div>
                        <h3>초기면담</h3>
                    </div>
                    <p>
                        문제를 이해하고 방향 설정삶의 배경 탐색을 통한 개인별 맞춤 상담 목표 설정
                    </p>
                </AnimatedSection>
                <AnimatedSection direction="up" as="li" delay={0.3}>
                    <div className='tit'>
                        <div className="num">3</div>
                        <h3>심리평가</h3>
                    </div>
                    <p>
                        보이지 않는 마음까지 정밀 분석 과학적 심리검사를 통한 핵심 역동 및 패턴 파악
                    </p>
                </AnimatedSection>
                <AnimatedSection direction="up" as="li" delay={0.45}>
                    <div className='tit'>
                        <div className="num">4</div>
                        <h3>맞춤 상담·코칭</h3>
                    </div>
                    <p>
                        실제적인 삶의 변화를 만듭니다. 개인 맞춤형 개입으로 정서·관계·행동의 변화 유도
                    </p>
                </AnimatedSection>
                <AnimatedSection direction="up" as="li" delay={0.6}>
                    <div className='tit'>
                        <div className="num">5</div>
                        <h3>회복 및 변화 추적</h3>
                    </div>
                    <p>
                        변화가 일상이 될 때까지 상담 종료 후 지속적인 모니터링 및 성장 프로그램 연계
                    </p>
                </AnimatedSection>
            </ul>
        </section>
    </div>
  );
};
export default CenterGuide;
