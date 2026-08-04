import AnimatedSection from '../../components/AnimatedSection';
import img_counseling from '../../assets/images/img_psychology_full.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>종합 심리검사<span>Full Battery</span></h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_counseling} alt="종합 심리검사 (Full Battery)" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>문제의 원인을 정확히 알고 싶다면<span className='pc_br'></span>반복되는 어려움과 감정의 혼란은</h3>
                <p><span className='pc_br'></span>겉으로 보이는 증상만으로는 알기 어렵습니다.<br />
                    종합심리검사는 현재의 문제뿐 아니라 그 원인이 되는<span className='pc_br'></span>심리적 구조까지 함께 이해하도록 돕습니다.
                </p>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>종합심리검사란<br />무엇인가요?</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>
                        지능, 인지, 정서, 성격, 행동, 관계, 주의집중 및 스트레스 반응 등 심리 기능 전반을 종합적으로 평가하여 현재의 어려움을 깊이 이해하고 적절한 상담 및 개입 방향을 찾는 정밀 심리평가입니다.<br /><br />이런 경우 권합니다.
                    </p>
                    <ul className='ul_list_1'>
                        <li>ADHD 등 주의집중의 어려움이 의심될 때</li>
                        <li>정서·행동 문제가 반복될 때</li>
                        <li>학습 및 집중력 저하가 지속될 때</li>
                        <li>원인을 알기 어려운 심리적 어려움이 지속될 때</li>
                        <li>보다 종합적인 심리평가와 상담 방향이 필요할 때</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>아동 종합검사</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>
                        아이의 행동과 감정은 발달 특성과 가족관계, 양육환경을 함께 살펴보아야 합니다.<br />아이의 현재 상태를 종합적으로 이해하고 필요한 상담과 부모의 양육 방향을 함께 제시합니다.
                    </p>
                    <ul className='ul_list_1'>
                        <li>놀이·정서·행동 평가</li>
                        <li>발달 및 인지 기능 평가</li>
                        <li>주의집중 및 학습 특성 확인</li>
                        <li>부모·자녀 관계 및 양육환경 이해</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>청소년 종합검사</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>
                        무기력, 학업 문제, 감정 기복은 정서·성격·학업·관계의 어려움이 서로 연결되어 나타날 수 있습니다.<br />
                        겉으로 드러난 문제만이 아니라 청소년의 심리적 특성과 현재의 어려움을 종합적으로 이해합니다.
                    </p>
                    <ul className='ul_list_1'>
                        <li>정서 상태 및 스트레스</li>
                        <li>성격과 자기조절 특성</li>
                        <li>학습 및 주의집중 특성</li>
                        <li>부모·또래 관계</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>성인 종합검사</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>
                        반복되는 감정과 관계의 어려움은 성격 특성과 내면의 심리적 갈등, 스트레스 대처 방식과 연결되어 있을 수 있습니다.<br />
                        현재의 어려움에 영향을 미치는 심리적 요인을 다각도로 이해합니다.
                    </p>
                    <ul className='ul_list_1'>
                        <li>정서 상태 (우울·불안·스트레스)</li>
                        <li>성격 및 감정 반응 특성</li>
                        <li>관계 및 대인관계 패턴</li>
                        <li>내면의 갈등과 심리적 특성</li>
                        <li>인지 기능 및 강점·취약점</li>
                    </ul>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>검사 구성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>지능검사(WAIS/WISC)</li>
                        <li>정서·성격검사(MMPI-2/MMPI-A)</li>
                        <li>기질·성격검사(TCI)</li>
                        <li>투사검사(SCT, 로르샤흐 등)</li>
                        <li>그림검사(HTP, KFD 등)</li>
                        <li>BGT</li>
                    </ul>
                    <p>연령, 개인의 특성 및 호소 문제에 따라 검사 구성이 달라질 수 있습니다.</p>
                </div>
                <img src={ico_box_bg5} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>진행 과정</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>검사 실시 (2~4시간)</li>
                        <li>전문가 종합 분석</li>
                        <li>결과 해석 상담(50분)</li>
                        <li>상담 및 개입 방향 제시</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>검사를 통해<br />얻을 수 있는 것</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>겉으로 보이는 문제를 넘어, 나를 더 깊이 이해하는 데서 변화가 시작됩니다.</p>
                    <ul className='ul_list_1'>
                        <li>현재 어려움에 영향을 미치는 심리적 요인 이해</li>
                        <li>감정과 관계의 반복 패턴 파악</li>
                        <li>개인의 강점과 취약점 확인</li>
                        <li>상담 및 치료적 개입 방향 설정</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>종합 심리검사 예약하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
