import AnimatedSection from '../../components/AnimatedSection';
import img_counseling from '../../assets/images/img_psychology_child.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>아동 놀이·발달 검사</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_counseling} alt="아동 놀이·발달 검사" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>아이의 행동에는 이유가 있습니다</h3>
                <p>
                    산만함, 짜증, 위축, 떼쓰기는 단순히 고쳐야 할 문제가 아니라<span className='pc_br'></span>아이의 마음과 발달 상태를 이해해야 할 신호일 수 있습니다.
                </p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>이런 경우 필요합니다</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>아이의 행동과 감정 변화를 이해하기 어려울 때</li>
                        <li>주의집중이나 발달 상태가 걱정될 때</li>
                        <li>정서·행동의 어려움이 반복될 때</li>
                        <li>아이에게 맞는 양육 방향이 고민될 때</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>무엇을 확인하나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>아이의 정서 상태와 감정 표현</li>
                        <li>행동 특성과 반복되는 패턴</li>
                        <li>현재의 발달 및 인지 수준</li>
                        <li>부모·자녀 상호작용과 양육환경</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            {/*
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>평가 구성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>놀이관찰 및 놀이평가 → 감정표현 · 관계방식 · 정서 상태</li>
                        <li>발달 및 인지 평가 → 현재 발달 수준 확인</li>
                        <li>부모 양육 분석 → 상호작용 및 양육 패턴 분석</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            */}
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>진행과정</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>아동의 연령과 발달 수준, 평가 내용에 따라 소요 시간과 검사 구성이 달라질 수 있습니다.  이것을 추가 해 주세요</p>
                    <ul className='ul_list_1'>
                        <li>부모 초기 면담(약 20~30분)</li>
                        <li>아동 놀이관찰 및 평가(약 40~60분)</li>
                        <li>필요 시 발달·인지 및 정서·행동 평가 추가</li>
                        <li>전문가 종합 분석</li>
                        <li>부모 결과 해석 상담(약 50분)</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>아동 심리검사 예약하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
