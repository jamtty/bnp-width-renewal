import AnimatedSection from '../../components/AnimatedSection';
import img_counseling from '../../assets/images/img_specialized_addiction.png';

const SpecializedAddiction = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>중독 회복</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_counseling} alt="중독 회복" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>끊고 싶은데, 왜 자꾸 반복될까요?</h3>
                <p>게임, 스마트폰, 술, 도박, 쇼핑 등 같은 행동이 반복된다면<span className='pc_br'></span>의지 부족이 아니라 반복 행동의 구조가 형성된 상태일 수 있습니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>특장점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>충동·습관·행동패턴 회복 상담</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>왜 반복될까요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>불편한 감정 → 충동 → 행동 → 후회 이 흐름이 반복되면서 중독 행동이 강화됩니다.</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>무엇이 달라지나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>반복 행동의 원인 이해</li>
                        <li>충동 조절 능력 회복</li>
                        <li>재발 예방 구조 설계</li>
                        <li>건강한 대처 행동 형성</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>위드원의 차별점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>중독 행동보다 원인을 먼저 이해합니다</li>
                        <li>심리검사 기반 맞춤 회복 전략을 설계합니다</li>
                        <li>감정·관계·생활 패턴을 함께 다룹니다</li>
                        <li>"참는 것"이 아닌 "변화가 지속되는 구조"를 만듭니다</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <a href="http://pf.kakao.com/_AXwJn/chat" target="_blank" rel="noopener noreferrer" className='btn_primary'>상담 신청하기</a>
                <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedAddiction;
