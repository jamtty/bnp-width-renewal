const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>기업 코칭 & 조직 프로그램</h2>
        </div>
        <section className="con_1">
            <div className='tit'>
                <h3>사람이 바뀌면 성과가 바뀌고,<span className='pc_br'></span>관계가 바뀌면 조직이 바뀝니다</h3>
            </div>
            <div className='box'>
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
            </div>
            <div className='box'>
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
            </div>
            <div className='box d-block'>
                <div className='s_tit'>
                    <h3>운영 프로세스</h3>
                    <p>성과를 만드는 것은 전략이지만, 성과를 지속시키는 것은 관계입니다.</p>
                </div>
                <div className='s_info'>
                    <ul className='step_list'>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>STEP 1</strong>
                            <span>조직 진단 및 인터뷰</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>STEP 2</strong>
                            <span>핵심 관계 구조 분석</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>STEP 3</strong>
                            <span>맞춤 코칭·워크숍 진행</span>
                        </li>
                        <li>
                            <div className='ico'></div>
                            <div className='line'></div>
                            <strong>STEP 4</strong>
                            <span>실행 점검 및 사후 관리</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='btn_wrap'>
                <button type="button" className='btn_primary'>기업코칭 프로그램 신청하기</button>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
