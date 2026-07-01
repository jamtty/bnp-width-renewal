import img_counseling from '../../assets/images/img_psychology_career.png';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>진로·학습 검사</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="진로·학습 검사" />
            </div>
            <div className='tit'>
                <h3>왜 안 되는지 알면, 방향이 보입니다</h3>
                <p>공부가 안 되는 이유, 진로가 막막한 이유는<span className='mobile_br'></span>능력 부족이 아니라 나에게 맞는 방식과 방향을 아직 찾지 못했기 때문일 수 있습니다.</p>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>이런 경우 필요합니다</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>공부를 해야 하는데 시작이 어려운 경우</li>
                        <li>노력에 비해 성과가 나오지 않는 경우</li>
                        <li>진로 방향이 자주 바뀌는 경우</li>
                        <li>무엇을 좋아하는지 모르겠는 경우</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>무엇을 정확히<br />알 수 있나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>나의 성향과 에너지 방향</li>
                        <li>학습 방식과 집중 패턴</li>
                        <li>동기 구조와 미루기 원인</li>
                        <li>진로 적합성과 흥미 분야</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>검사 구성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>성격·기질 검사 (TCI)</li>
                        <li>진로 적성 검사</li>
                        <li>학습 및 실행 기능 분석</li>
                        <li>동기 및 행동 패턴 탐색</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>검사를 통해<br />얻을 수 있는 것</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>문제를 해결하기 전에, 먼저 이해해야 합니다.</p>
                    <ul className='ul_list_1'>
                        <li>나에게 맞는 학습 전략 발견</li>
                        <li>강점과 잠재력 이해</li>
                        <li>진로 방향 설정</li>
                        <li>자신감과 동기 향상</li>
                    </ul>
                </div>
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>진로·학습 검사 예약하기</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
