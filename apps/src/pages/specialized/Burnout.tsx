import img_counseling from '../../assets/images/img_specialized_burnout.png';

const SpecializedBurnout = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>번아웃 · 직장 스트레스</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="번아웃 · 직장 스트레스" />
            </div>
            <div className='tit'>
                <h3>버티고 있는데, 점점 무너지는 느낌인가요?</h3>
                <p>쉬어도 회복되지 않고 의욕과 에너지가 계속 떨어진다면<span className='mobile_br'></span>단순한 피로가 아니라 번아웃일 수 있습니다.</p>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>핵심 접근</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>에너지를 회복하고 삶의 균형을 되찾는 상담</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>왜 반복될까요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>과도한 책임감 → 감정 소진 → 회복 부족 이 악순환이 반복되며 번아웃이 지속됩니다.</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>특장점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>번아웃·직장 스트레스 전문 상담</li>
                        <li>심리검사 기반 원인 분석 및 맞춤 설계</li>
                        <li>버티는 삶이 아닌 회복 가능한 삶으로 전환</li>
                    </ul>
                </div>
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>상담 신청하기</button>
                <button type="button" className='btn_secondary'>정밀 진단부터 시작하기</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedBurnout;
