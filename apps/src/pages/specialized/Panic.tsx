import img_counseling from '../../assets/images/img_specialized_panic.png';

const SpecializedPanic = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>공황 · 불안</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="공황 · 불안" />
            </div>
            <div className='tit'>
                <h3>이유 없는 불안이 반복되나요?</h3>
                <p>갑작스러운 두근거림, 숨 막힘, 끊이지 않는 걱정과 불안.<span className='mobile_br'></span>반복되는 불안은 의지의 문제가 아니라 몸과 마음이 보내는 신호일 수 있습니다.</p>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>핵심 접근</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>신체–생각–행동 통합 상담</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>왜 반복될까요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_2'>
                        <li>몸의 반응 → 불안한 생각 → 회피 행동 이 패턴이 반복되며 불안이 유지됩니다.</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>특장점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>불안을 피하지 않고 다루는 힘 회복</li>
                        <li>공황·불안 반복 패턴의 원인 분석</li>
                        <li>심리검사 기반 맞춤 상담 설계</li>
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
export default SpecializedPanic;
