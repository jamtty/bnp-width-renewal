import AnimatedSection from '../../components/AnimatedSection';
const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>리더십 코칭</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit" direction="up">
                <h3>좋은 리더는 사람을 관리하지 않고,<span className='pc_br'></span>관계를 이끕니다</h3>
                <p>성과와 관계 사이에서 고민하는 리더에게 사람의 마음을 이해하는 리더십을 제공합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>대상</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>팀장 · 관리자</li>
                        <li>기업 임원</li>
                        <li>기관 및 조직 리더</li>
                        <li>교회·사역 리더</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>핵심 영역</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>의사소통</li>
                        <li>갈등 관리</li>
                        <li>팀 리더십</li>
                        <li>관계 영향력</li>
                        <li>의사결정</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>위드원만의 차별성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>대상관계이론 기반 리더십 코칭</li>
                        <li>무의식적 관계 패턴 분석</li>
                        <li>리더-팀원 상호작용 진단</li>
                        <li>실제 대화 중심 코칭</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>이런 문제를 다룹니다</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>팀원과의 반복되는 갈등</li>
                        <li>말해도 전달되지 않는 소통 문제</li>
                        <li>성과 압박과 번아웃</li>
                        <li>리더십 자신감 저하</li>
                        <li>조직 내 관계 스트레스</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>코칭 결과</h3>
                </div>
                <div className='s_info'>
                    <p className="top">리더십은 기술이 아니라 관계의 예술입니다.</p>
                    <ul className='ul_list_1'>
                        <li>대화가 달라집니다</li>
                        <li>갈등이 줄어듭니다</li>
                        <li>팀 신뢰가 높아집니다</li>
                        <li>영향력이 커집니다</li>
                        <li>리더십이 안정됩니다</li>
                    </ul>
                </div>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
