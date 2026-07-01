import img_counseling from '../../assets/images/img_psychology_teen.png';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>청소년 심리검사</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="청소년 심리검사" />
            </div>
            <div className='tit'>
                <h3>문제가 아니라, 방향의 문제일 수 있습니다</h3>
                <p>무기력, 반항, 학업 문제는 단순한 의지의 문제가 아니라<span className='mobile_br'></span>정서·관계·진로가 연결된 결과일 수 있습니다.</p>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>이런 경우 필요합니다</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>학습 의욕이 떨어지고 무기력이 심한 경우</li>
                        <li>불안, 우울, 감정 기복이 반복되는 경우</li>
                        <li>진로 방향이 혼란스러운 경우</li>
                        <li>부모와 갈등이 많아진 경우</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>무엇을 확인하나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>정서 상태 (우울·불안)</li>
                        <li>성격 및 동기 구조</li>
                        <li>학습 및 실행 기능</li>
                        <li>진로 적성 및 방향</li>
                        <li>부모·또래 관계</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>검사 구성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>MMPI-A → 정서 상태</li>
                        <li>TCI → 기질 및 성격</li>
                        <li>진로검사 → 적성 및 방향 탐색</li>
                        <li>학습·실행 기능 분석 → 집중력·미루기·동기</li>
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
                        <li>현재 어려움의 원인 이해</li>
                        <li>학습·정서·진로 방향 설정</li>
                        <li>강점과 성장 가능성 발견</li>
                        <li>부모와 자녀의 상호 이해 증진</li>
                    </ul>
                </div>
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>청소년 심리검사 예약하기</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
