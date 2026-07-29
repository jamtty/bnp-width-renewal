import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy.png';

const AcademyIntro = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>이해에서 시작해,<span className='pc_br'></span>전문가로 완성되는 성장의 여정</h2>
            <p>배우는 것을 넘어 상담 · 코칭 · 강의 · 기관 활동까지 연결되는 성장 시스템</p>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="특장점" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>성장 로드맵</h3>
            </AnimatedSection>
            <div className="roadmap">
                <ul className="roadmap_steps">
                    <AnimatedSection className="roadmap_item" direction="up" delay={0} as="li">
                        <span className="roadmap_num">1</span>
                        <div className="roadmap_circle"><span>입문</span></div>
                    </AnimatedSection>
                    <li className="roadmap_arrow" aria-hidden="true"></li>
                    <AnimatedSection className="roadmap_item" direction="up" delay={0.15} as="li">
                        <span className="roadmap_num">2</span>
                        <div className="roadmap_circle"><span>심화</span></div>
                    </AnimatedSection>
                    <li className="roadmap_arrow" aria-hidden="true"></li>
                    <AnimatedSection className="roadmap_item" direction="up" delay={0.3} as="li">
                        <span className="roadmap_num">3</span>
                        <div className="roadmap_circle"><span>전문가</span></div>
                    </AnimatedSection>
                    <li className="roadmap_arrow" aria-hidden="true"></li>
                    <AnimatedSection className="roadmap_item" direction="up" delay={0.45} as="li">
                        <span className="roadmap_num">4</span>
                        <div className="roadmap_circle"><span>강사</span></div>
                    </AnimatedSection>
                    <li className="roadmap_arrow" aria-hidden="true"></li>
                    <AnimatedSection className="roadmap_item" direction="up" delay={0.6} as="li">
                        <span className="roadmap_num">5</span>
                        <div className="roadmap_circle"><span>파트너</span></div>
                    </AnimatedSection>
                </ul>
                <AnimatedSection className="roadmap_quote" direction="up" delay={0.8}>
                    <p>한 번의 교육이 아니라,<span className='mo_br'></span> 평생 성장하는 전문가 플랫폼</p>
                </AnimatedSection>
            </div>

        </section>
    </div>
  );
};

export default AcademyIntro;
