import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy7.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>기관 기업 프로그램</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="기관 기업 프로그램" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>성과의 문제는 결국 사람의 문제입니다</h3>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>조직 갈등 진단</h3>
                </div>
                <div className='s_info'>
                    <p className="top">갈등의 원인을 파악하고 건강한 협업 구조를 만듭니다.</p>
                    <ul className='ul_list_1'>
                        <li>갈등 구조 분석</li>
                        <li>관계 진단</li>
                        <li>해결 전략 제안</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>리더십 영향력 강화</h3>
                </div>
                <div className='s_info'>
                    <p className="top">신뢰와 영향력을 높이는 관계 중심 리더십</p>
                    <ul className='ul_list_1'>
                        <li>리더-팀원 관계 진단</li>
                        <li>영향력 강화</li>
                        <li>신뢰 구축</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>번아웃 예방·회복</h3>
                </div>
                <div className='s_info'>
                    <p className="top">지친 조직에 회복 탄력성을 더합니다.</p>
                    <ul className='ul_list_1'>
                        <li>스트레스 관리</li>
                        <li>소진 예방</li>
                        <li>동기 회복</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>협업 역량 강화</h3>
                </div>
                <div className='s_info'>
                    <p className="top">소통이 달라지면 성과가 달라집니다.</p>
                    <ul className='ul_list_1'>
                        <li>의사소통 훈련</li>
                        <li>피드백 문화</li>
                        <li>협업 향상</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>조직문화 혁신</h3>
                </div>
                <div className='s_info'>
                    <p className="top">심리적 안전감이 성과를 만듭니다.</p>
                    <ul className='ul_list_1'>
                        <li>조직문화 진단</li>
                        <li>관계 개선</li>
                        <li>몰입도 향상</li>
                    </ul>
                </div>
                <img src={ico_box_bg5} alt="" className="bg_img" />
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
