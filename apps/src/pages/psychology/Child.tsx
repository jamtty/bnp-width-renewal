import img_counseling from '../../assets/images/img_psychology_child.png';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>아동 놀이·발달 검사</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="아동 놀이·발달 검사" />
            </div>
            <div className='tit'>
                <h3>아이의 행동에는 이유가 있습니다</h3>
                <p>산만함, 짜증, 위축, 떼쓰기 고쳐야 할 문제가 아니라<span className='mobile_br'></span>이해해야 할 신호입니다</p>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>이런 경우 필요합니다</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>아이의 행동이 이해되지 않을 때</li>
                        <li>ADHD 또는 발달 문제가 걱정될 때</li>
                        <li>정서·행동 문제가 반복될 때</li>
                        <li>양육 방향이 고민될 때</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>무엇을 확인하나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>아이의 감정 상태</li>
                        <li>행동 패턴과 문제 원인</li>
                        <li>발달 수준</li>
                        <li>부모-자녀 상호작용</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
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
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>검사를 통해<br />얻을 수 있는 것</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>아이를 바꾸기 전에, 먼저 아이를 이해합니다.</p>
                    <ul className='ul_list_1'>
                        <li>아이의 특성과 강점 이해</li>
                        <li>문제 행동의 원인 파악</li>
                        <li>부모 양육 방향 설정</li>
                        <li>가정·학교 지원 방법 제안</li>
                    </ul>
                </div>
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>아동 심리검사 예약하기</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
