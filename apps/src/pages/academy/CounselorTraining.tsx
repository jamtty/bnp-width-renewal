import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy3.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>전문 상담사 수련</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="전문 상담사 수련" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>기법을 배우는 것을 넘어,<span className='pc_br'></span>사람을 깊이 이해하는 상담자로 성장합니다</h3>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>인턴·레지던트 수련과정<br />(Compass)</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>체계적인 단계별 상담 수련</li>
                        <li>교수급 전문가 슈퍼비전</li>
                        <li>실제 사례 중심 임상훈련</li>
                        <li>사례개념화 및 심리진단 훈련</li>
                        <li>상담자의 자기이해와 전문성 성장</li>
                        <li>학회 자격과 연계된 수련과정</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>슈퍼바이저</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>20년 이상 임상·교육 경험의 교수급 슈퍼바이저</li>
                        <li>대상관계·정신분석 기반 사례 이해</li>
                        <li>사례개념화 및 상담 개입 전문 지도</li>
                        <li>상담자의 성장을 고려한 맞춤형 슈퍼비전</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
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
                        <li>한국아동미술치료학회</li>
                        <li>EAP상담협회</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>수련과정 신청하기</button>
                <button type="button" className='btn_secondary'>수련과정 문의하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
