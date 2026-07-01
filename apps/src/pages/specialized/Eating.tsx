import img_counseling from '../../assets/images/img_specialized_eating.png';

const SpecializedEating = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>식이장애 · 감정조절</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="식이장애 · 감정조절" />
            </div>
            <div className='tit'>
                <h3>반복되는 폭식과 절식,<span className='mobile_br'></span>그 뒤에 감정이 있습니다.</h3>
                <p>폭식, 거식, 체중 집착이 반복된다면 단순 식습관이 아니라<span className='mobile_br'></span>감정 조절의 어려움이 연결된 상태일 수 있습니다.</p>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>핵심 접근</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>감정과 식이 행동을 함께 회복하는 상담</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>왜 반복될까요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>불편한 감정 → 폭식·절식 → 죄책감과 자기비난 이 악순환이 반복되며 문제가 유지됩니다.</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>특장점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>식이 문제와 감정 문제를 함께 다루는 상담</li>
                        <li>심리검사 기반 원인 분석 및 맞춤 설계</li>
                        <li>자기비난에서 자기회복으로의 전환</li>
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
export default SpecializedEating;
