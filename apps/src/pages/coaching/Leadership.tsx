import AnimatedSection from '../../components/AnimatedSection';
import img_coaching from '../../assets/images/img_coaching_features4.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>리더십 코칭</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_coaching} alt="리더십 코칭" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>좋은 리더는 사람을 관리하는 것을 넘어, 관계를 이끕니다</h3>
                <p>성과와 관계 사이에서 고민하는 리더에게 자신과 사람을 이해하고<span className='pc_br'></span>조직의 관계를 변화시키는 리더십 코칭을 제공합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>대상</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>팀장 · 관리자</li>
                        <li>기업 임원 · CEO</li>
                        <li>기관 및 조직 리더</li>
                        <li>교회·사역 리더</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>핵심 영역</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>자기이해와 리더십 스타일</li>
                        <li>의사소통</li>
                        <li>갈등 관리</li>
                        <li>팀 리더십</li>
                        <li>관계 영향력</li>
                        <li>의사결정</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>위드원만의 차별성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>리더의 내면을 이해하고, 관계의 변화를 통해 리더십을 성장시킵니다.</li>
                        <li>심리학·대상관계이론 기반 리더십 코칭</li>
                        <li>리더의 감정과 무의식적 관계 패턴 이해</li>
                        <li>리더·팀원 간 관계역동 분석</li>
                        <li>갈등과 반복되는 관계 패턴의 원인 탐색</li>
                        <li>실제 조직 상황과 대화 중심의 코칭</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>이런 문제를 다룹니다</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>팀원과 반복되는 갈등</li>
                        <li>말해도 전달되지 않는 소통의 어려움</li>
                        <li>성과 압박과 리더의 정서적 소진</li>
                        <li>리더십 역할에 대한 부담과 자신감 저하</li>
                        <li>조직 내 관계 스트레스와 갈등</li>
                        <li>중요한 의사결정과 변화 관리</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>코칭을 통해 달라지는 것</h3>
                </div>
                <div className='s_info'>
                    <p className="top">리더십은 기술을 넘어, 사람과 관계를 움직이는 힘입니다..</p>
                    <ul className='ul_list_1'>
                        <li>자신의 리더십 패턴을 이해합니다.</li>
                        <li>대화와 소통 방식이 달라집니다.</li>
                        <li>갈등을 다루는 힘이 커집니다.</li>
                        <li>팀의 신뢰와 협력을 이끄는 역량을 키웁니다.</li>
                        <li>흔들리지 않는 자신만의 리더십을 만들어갑니다</li>
                    </ul>
                </div>
                <img src={ico_box_bg5} alt="" className="bg_img" />
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
