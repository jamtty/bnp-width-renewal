import AnimatedSection from '../../components/AnimatedSection';
import img_counseling from '../../assets/images/img_specialized_adhd.png';

const SpecializedAdhd = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>ADHD · 실행력</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_counseling} alt="ADHD · 실행력" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>해야 하는 걸 알지만, 왜 자꾸 미루게 될까요?</h3>
                <p>계획은 세우지만 실행이 어렵고 시작은 하지만 끝까지 이어지지 않는다면<span className='pc_br'></span>의지 부족이 아니라 실행 시스템이 흔들리는 상태일 수 있습니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>특장점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>실행력 · 자기조절 회복 상담</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>왜 반복될까요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>생각 → 계획 → 미루기 → 죄책감 이 흐름이 반복되면서 실행 자신감이 점점 낮아집니다.</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>무엇이 달라지나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>미루기 감소와 실행력 향상</li>
                        <li>집중력과 자기조절 능력 회복</li>
                        <li>현실적인 목표·습관 시스템 구축</li>
                        <li>"해야 하는 사람"에서 "실행하는 사람"으로 변화</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>상담 신청하기</button>
                <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedAdhd;
