import AnimatedSection from '../../components/AnimatedSection';
import img_counseling from '../../assets/images/img_specialized_career.png';


const SpecializedCareer = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>커리어 전환 · 방향 설계</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_counseling} alt="커리어 전환 · 방향 설계" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>지금 이 방향이 맞는지 확신이 없으신가요?</h3>
                <p>이직, 공백기, 진로 고민이 반복된다면 정보 부족이 아니라<span className='pc_br'></span>선택 기준이 흔들리는 상태일 수 있습니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>핵심 접근</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>자기이해를 바탕으로 삶의 방향을 찾는 상담</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>왜 반복될까요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>불확실성 → 고민 반복 → 결정 미루기 이 흐름이 반복되면 방향이 흐려집니다.</li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>특장점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>자기이해 기반 진로·커리어 설계</li>
                        <li>강점·가치관·성향을 함께 분석</li>
                        <li>막연한 고민을 실행 가능한 계획으로 전환</li>
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
export default SpecializedCareer;
