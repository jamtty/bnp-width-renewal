import AnimatedSection from '../../components/AnimatedSection';
import img_coaching from '../../assets/images/img_coaching_features6.png';
import ico_box_bg1 from '../../assets/images/ico_box_bg1.svg';
import ico_box_bg2 from '../../assets/images/ico_box_bg2.svg';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <AnimatedSection className="page_tit" direction="up">
            <h2>기업 코칭 & 조직 프로그램</h2>
        </AnimatedSection>
        <section className="con_1">
            <AnimatedSection className="tit_img" direction="up">
                <img src={img_coaching} alt="기업 코칭 & 조직 프로그램" />
            </AnimatedSection>
            <AnimatedSection className="tit" direction="up">
                <h3>사람이 바뀌면 성과가 바뀌고,<span className='pc_br'></span>관계가 바뀌면 조직이 바뀝니다</h3>
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>핵심 프로그램</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>조직 진단 및 관계 역동 분석</li>
                        <li>리더십 코칭</li>
                        <li>팀 갈등 조정 및 회복</li>
                        <li>소통·협업 워크숍</li>
                        <li>번아웃 예방 및 회복 프로그램</li>
                    </ul>
                </div>
                <img src={ico_box_bg1} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box" direction="up">
                <div className='s_tit'>
                    <h3>특장점</h3>
                </div>
                <div className='s_info'>
                    <ul className='ul_list_1'>
                        <li>관계역동 기반 조직 진단</li>
                        <li>리더-팀원 상호작용 분석</li>
                        <li>갈등의 원인보다 구조 분석</li>
                        <li>코칭과 상담을 통합한 개입</li>
                        <li>관계 변화가 성과로 연결되는 설계</li>
                    </ul>
                </div>
                <img src={ico_box_bg2} alt="" className="bg_img" />
            </AnimatedSection>
            <AnimatedSection className="box d-block" direction="up">
                <div className='s_tit'>
                    <h3>운영 프로세스</h3>
                    <p>성과를 만드는 것은 전략이지만, 성과를 지속시키는 것은 관계입니다.</p>
                </div>
                <div className='s_info'>
                    <ul className='step_list_child'>
                        <li>
                            <div className='ico'>
                                <p>STEP 1</p>
                            </div>
                            <p className='txt'>조직 진단 및 인터뷰</p>
                        </li>
                        <li>
                            <div className='ico'>
                                <p>STEP 2</p>
                            </div>
                            <p className='txt'>핵심 관계 구조 분석</p>
                        </li>
                        <li>
                            <div className='ico'>
                                <p>STEP 3</p>
                            </div>
                            <p className='txt'>맞춤 코칭·워크숍 진행</p>
                        </li>
                        <li>
                            <div className='ico'>
                                <p>STEP 4</p>
                            </div>
                            <p className='txt'>실행 점검 및 사후 관리</p>
                        </li>
                    </ul>
                </div>
            </AnimatedSection>
            <AnimatedSection className="btn_wrap" direction="up">
                <button type="button" className='btn_primary'>기업코칭 프로그램 신청하기</button>
            </AnimatedSection>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
