import AnimatedSection from '../../components/AnimatedSection';
import img_counseling from '../../assets/images/img_psychology_teen.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';
import ico_box_bg3 from '../../assets/images/ico_box_bg3.svg';
import ico_box_bg4 from '../../assets/images/ico_box_bg4.svg';
import ico_box_bg5 from '../../assets/images/ico_box_bg5.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>청소년 심리검사</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_counseling} alt="청소년 심리검사" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>문제가 아니라, 방향의 문제일 수 있습니다</h3>
                <p>무기력, 반항, 학업 문제는 단순한 의지의 문제가 아니라<span className='pc_br'></span>정서·관계·진로가 연결된 결과일 수 있습니다.</p>
            </AnimatedSection>
            <AnimatedSection className="box d-block-new" direction="up">
                <div className='s_tit'>
                    <h3>이런 경우 필요합니다</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_checklist'>
                        <li>학습 의욕이 떨어지고 무기력이 심한 경우</li>
                        <li>불안, 우울, 감정 기복이 반복되는 경우</li>
                        <li>진로 방향이 혼란스러운 경우</li>
                        <li>부모와 갈등이 많아진 경우</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box d-block-new" direction="up">
                <div className='s_tit'>
                    <h3>무엇을 확인하나요?</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_Counseling'>
                        <li>정서 상태(우울·불안·스트레스)</li>
                        <li>기질·성격 및 감정 반응 특성</li>
                        <li>학습 동기와 실행의 어려움</li>
                        <li>진로 적성 및 방향</li>
                        <li>부모·또래 관계</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box d-block-new" direction="up">
                <div className='s_tit'>
                    <h3>검사 구성</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_test no-ico'>
                        <li>MMPI-A → 정서·심리 상태</li>
                        <li>TCI → 기질·성격 특성</li>
                        <li>Holland 진로탐색검사 → 진로 흥미와 방향</li>
                        <li>MLST-II 학습전략검사 → 학습동기와 자기조절·학습전략</li>
                    </ul>
                </div>
                <img src={ico_box_bg3} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>검사 진행</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>검사 실시(약 2~3시간)</li>
                        <li>전문가 종합 분석</li>
                        <li>결과 해석 상담(약 50분)</li>
                        <li>필요 시 부모 상담 및 상담·학습·진로 방향 제시</li>
                    </ul>
                    <p>청소년의 연령과 현재 어려움에 따라 검사 구성이 조정될 수 있습니다.</p>
                </div>
                <img src={ico_box_bg4} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>검사를 통해<br />얻을 수 있는 것</h3>
                </div>
                <div className='s_info'>
                    <p className='top'>문제를 해결하기 전에, 먼저 아이의 마음과 어려움을 이해합니다.</p>
                    <ul className='ul_list_1'>
                        <li>현재 어려움에 영향을 미치는 요인 이해</li>
                        <li>학습·정서·진로 방향 설정</li>
                        <li>강점과 성장 가능성 발견</li>
                        <li>부모와 자녀의 상호 이해 증진</li>
                    </ul>
                </div>
                <img src={ico_box_bg5} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <a href="http://pf.kakao.com/_AXwJn/chat" target="_blank" rel="noopener noreferrer" className='btn_primary'>청소년 심리검사 예약하기</a>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
