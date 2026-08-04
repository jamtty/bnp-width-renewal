import AnimatedSection from '../../components/AnimatedSection';
import img_academy from '../../assets/images/img_academy2.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>관계 대화 코치 과정</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_academy} alt="관계 대화 코치 과정" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>관계를 바꾸는 사람은 말을 잘하는 사람이 아니라,<span className='pc_br'></span>마음을 이해하는 사람입니다</h3>
                <p>배우는 것을 넘어, 관계의 변화를 돕는 전문가로 성장합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>2급 과정</h3>
                </div>
                <div className='s_info'>
                    <p className="top">나를 이해하고, 관계를 여는 대화의 기초</p>
                    <p className="top">대상 : 부모 · 청년 · 일반인 · 관계대화를 배우고 싶은 사람</p>
                    <ul className='ul_list_1'>
                        <li>자기이해와 감정 인식</li>
                        <li>감정과 욕구 이해</li>
                        <li>공감적 경청</li>
                        <li>안전한 자기표현</li>
                        <li>관계를 여는 질문과 대화</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>1급 과정</h3>
                </div>
                <div className='s_info'>
                    <p className="top">관계 속 반복되는 패턴을 이해하고, 변화를 돕는 단계</p>
                    <p className="top">대상 : 교사 · 리더 · 상담자 · 코치</p>
                    <ul className='ul_list_1'>
                        <li>1차 감정과 2차 감정 이해</li>
                        <li>관계 속 반복 패턴 이해</li>
                        <li>의도와 욕구 읽기</li>
                        <li>갈등과 관계역동 이해</li>
                        <li>경계와 건강한 관계 설정</li>
                        <li>관계대화 심화 실습</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>전문가 과정</h3>
                </div>
                <div className='s_info'>
                    <p className="top">관계대화를 가르치고, 현장에서 변화를 이끄는 전문가 과정</p>
                    <p className="top">대상 : 상담사 · 코치 · 전문 강사</p>
                    <ul className='ul_list_1'>
                        <li>관계대화 프로그램 운영</li>
                        <li>개인 및 집단 관계대화 코칭</li>
                        <li>집단·워크숍 진행</li>
                        <li>관계대화 사례 분석 및 수퍼비전</li>
                        <li>관계대화 강의법 및 교수법</li>
                        <li>학교·교회·기업·기관 강사 활동</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
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
