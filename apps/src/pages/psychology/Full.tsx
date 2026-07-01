import img_counseling from '../../assets/images/img_psychology_full.png';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>종합 심리검사 (Full Battery)</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="종합 심리검사 (Full Battery)" />
            </div>
            <div className='tit'>
                <h3>문제의 원인을 정확히 알고 싶다면<span className='mobile_br'></span>반복되는 어려움과 감정의 혼란은</h3>
                <p><span className='mobile_br'></span>겉으로 보이는 증상만으로는 알기 어렵습니다.<br />
                    종합심리검사는 현재의 문제뿐 아니라 그 원인이 되는<span className='mobile_br'></span>심리적 구조까지 함께 이해하도록 돕습니다.
                </p>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>종합심리검사란<br />무엇인가요?</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>
                        지능, 정서, 성격, 행동, 관계, 주의집중 및 스트레스 반응까지 심리 기능 전반을 종합적으로 평가하여 현재 어려움의 원인과 개입 방향을 찾는 정밀검사입니다.<br /><br />이런 경우 권합니다.
                    </p>
                    <ul className='ul_list_1'>
                        <li>ADHD가 의심될 때</li>
                        <li>정서·행동 문제가 반복될 때</li>
                        <li>학습 및 집중력 저하가 있을 때</li>
                        <li>원인을 알 수 없는 어려움이 지속될 때</li>
                        <li>정확한 진단과 상담 방향이 필요할 때</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>아동 종합검사</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>아이의 행동과 감정은 발달과 관계 속에서 이해해야 합니다.<br />아이의 문제 원인 + 양육 방향까지 함께 제시합니다.</p>
                    <ul className='ul_list_1'>
                        <li>놀이·정서·행동 평가</li>
                        <li>발달 및 인지 상태 확인</li>
                        <li>부모-자녀 상호작용 분석</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>청소년 종합검사</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>
                        무기력, 학업 문제, 감정 기복은 정서·진로·관계가 연결된 상태일 수 있습니다.<br />문제가 아니라 전체 흐름을 분석합니다.
                    </p>
                    <ul className='ul_list_1'>
                        <li>정서 상태 (우울·불안)</li>
                        <li>학습 및 실행력</li>
                        <li>진로 방향</li>
                        <li>부모와의 관계</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>성인 종합검사</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>
                        반복되는 감정과 관계의 어려움은 성격 특성과 내면의 심리 구조와 연결되어 있을 수 있습니다.<br />현재 어려움을 만드는 핵심 요인을 종합적으로 이해합니다.
                    </p>
                    <ul className='ul_list_1'>
                        <li>정서 상태 (우울·불안·스트레스)</li>
                        <li>성격 및 반응 패턴</li>
                        <li>관계 및 대인 문제</li>
                        <li>내면 갈등 및 심리적 특성</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>검사 구성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>지능검사 (WAIS/WISC)</li>
                        <li>정서·성격검사 (MMPI-2, MMPI-A)</li>
                        <li>기질·성격검사 (TCI)</li>
                        <li>투사검사 (SCT, 로샤 등)</li>
                        <li>그림검사 (HTP, KFD 등)</li>
                        <li>BGT</li>
                    </ul>
                    <p>※ 개인의 특성과 호소문제에 따라 맞춤 구성됩니다.</p>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>진행 과정</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>검사 실시 (2~4시간)</li>
                        <li>전문가 통합 분석</li>
                        <li>결과 해석 상담 (50분)</li>
                        <li>상담 및 개입 방향 제시</li>
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='s_tit'>
                    <h3>검사를 통해<br />얻을 수 있는 것</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>보이는 문제보다, 그 문제를 만드는 원인을 이해합니다.</p>
                    <ul className='ul_list_1'>
                        <li>현재 어려움의 원인 이해</li>
                        <li>감정·관계 패턴 파악</li>
                        <li>강점과 취약점 확인</li>
                        <li>변화와 성장의 방향 설정</li>
                    </ul>
                </div>
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>종합 심리검사 예약하기</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
