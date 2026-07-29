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
                <h3>관계를 바꾸는 사람은 말을 잘하는 사람이 아니라,<span className='pc_br'></span>마음을 읽는 사람입니다</h3>
                <p>배운 사람이 아니라, 변화를 만드는 사람으로 성장합니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>입문 과정</h3>
                </div>
                <div className='s_info'>
                    <p className="top">대상 : 부모 · 청년 · 일반인</p>
                    <ul className='ul_list_1'>
                        <li>자기이해와 감정인식</li>
                        <li>공감적 경청</li>
                        <li>안전한 대화의 시작</li>
                        <li>관계를 여는 질문</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>심화 과정</h3>
                </div>
                <div className='s_info'>
                    <p className="top">관계 속 반복되는 패턴을 읽는 단계<br />대상 : 교사 · 리더 · 상담자</p>
                    <ul className='ul_list_1'>
                        <li>3회 과정 - 문제 정리 · 방향 설정 · 실행 시작</li>
                        <li>6회 과정 - 패턴 변화 · 실행 전략 · 습관 형성</li>
                        <li>10회 과정 - 목표 달성 · 행동 변화 · 삶의 전환</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>전문가 과정</h3>
                </div>
                <div className='s_info'>
                    <p className="top">대상 : 상담사 · 코치 · 전문 강사</p>
                    <ul className='ul_list_1'>
                        <li>관계대화 프로그램 운영</li>
                        <li>집단 및 워크숍 진행</li>
                        <li>관계 리디자인 강의법</li>
                        <li>학교·교회·기관 강사 활동</li>
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
