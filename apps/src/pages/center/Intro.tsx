import con1Img from '../../assets/images/pg_intro_con1.png';
import con2Img from '../../assets/images/pg_intro_con2.png';
import con3Img from '../../assets/images/pg_intro_con3.png';
import con4Img from '../../assets/images/pg_intro_con4.png';
import con5Img from '../../assets/images/pg_intro_con5.png';
import con6Img from '../../assets/images/pg_intro_con6.png';
import con2_1Img from '../../assets/images/pg_intro_con2_1.png';
import con2_2Img from '../../assets/images/pg_intro_con2_2.png';
import con2_3Img from '../../assets/images/pg_intro_con2_3.png';
import con2_4Img from '../../assets/images/pg_intro_con2_4.png';
import con2_5Img from '../../assets/images/pg_intro_con2_5.png';

const CenterIntro = () => {
  return (
    <div className="page_cont">
        <div className="page_tit">
            <h2>위드원 상담코칭센터</h2>
            <p>상담 · 교육 · 연구가 연결된 회복 중심 상담 코칭 센터</p>
        </div>
        <section className="con_1">
            <ul className="con_list">
                <li className="con_card">
                    <div className="con_card_img">
                    <img src={con1Img} alt="교수진과 전문가가 함께하는 연구기반 심리상담 플랫폼" />
                    </div>
                    <div className="con_card_text">
                    <span className="con_num">1</span>
                    <h3>교수진과 전문가가 함께하는 연구기반<br />심리상담 플랫폼</h3>
                    <p>
                        상담 · 심리검사 · 글로벌 상담 · 전문가 교육 · 기관 심리지원을<br />연결하여 개인과 조직의 회복과 성장을 돕습니다.
                    </p>
                    </div>
                </li>
                <li className="con_card">
                    <div className="con_card_img">
                    <img src={con2Img} alt="숫자로 보는 위드원" />
                    </div>
                    <div className="con_card_text">
                    <span className="con_num">2</span>
                    <h3>숫자로 보는 위드원</h3>
                    <p>20+ Years 상담 · 교육 · 연구 경험<br />검증된 임상 경험과 교육 노하우</p>
                    </div>
                </li>
                <li className="con_card">
                    <div className="con_card_img">
                    <img src={con3Img} alt="Professor Network" />
                    </div>
                    <div className="con_card_text">
                    <span className="con_num">3</span>
                    <h3>Professor Network</h3>
                    <p>교수 및 전문위원 네트워크<br />교수 · 슈퍼바이저 · 전문상담사 협력 시스템</p>
                    </div>
                </li>
                <li className="con_card">
                    <div className="con_card_img">
                    <img src={con4Img} alt="Languages" />
                    </div>
                    <div className="con_card_text">
                    <span className="con_num">4</span>
                    <h3>Languages</h3>
                    <p>글로벌 특화 상담<br />영어 · 중국어 · 일본어 · 베트남어 · 몽골어 · 한국어</p>
                    </div>
                </li>
                <li className="con_card">
                    <div className="con_card_img">
                    <img src={con5Img} alt="Partnership" />
                    </div>
                    <div className="con_card_text">
                    <span className="con_num">5</span>
                    <h3>Partnership</h3>
                    <p>국내외 기관 협력<br />기업 · 학교 · 교회 · 선교단체</p>
                    </div>
                </li>
                <li className="con_card">
                    <div className="con_card_img">
                    <img src={con6Img} alt="One-Stop Platform" />
                    </div>
                    <div className="con_card_text">
                    <span className="con_num">6</span>
                    <h3>One-Stop Platform</h3>
                    <p>상담 · 검사 · 교육 통합 시스템<br />진단부터 회복까지 연결되는 통합 플랫폼</p>
                    </div>
                </li>
            </ul>
        </section>
        <div className="page_tit">
            <h2>연구와 임상을 연결하는 회복과 성장의 심리상담</h2>
            <p>교수진 · 전문상담사 · 글로벌 전문가가 함께하는 연구기반 심리상담</p>
        </div>
        <section className="con_2">
            <ul className="con_list">
                <li>
                    <div className='card'>심리상담</div>
                    <div className='box'>
                        <div className='thumbnail'><img src={con2_1Img} alt="심리상담" /></div>
                        <p>아동 · 청소년 · 성인<br />부부 · 가족 · 시니어</p>
                    </div>
                </li>
                <li>
                    <div className='card'>특화상담</div>
                    <div className='box'>
                        <div className='thumbnail'><img src={con2_2Img} alt="심리상담" /></div>
                        <p>공황 · 불안 · ADHD<br />번아웃· 식이장애 · 중독</p>
                    </div>
                </li>
                <li>
                    <div className='card'>심리검사</div>
                    <div className='box'>
                        <div className='thumbnail'><img src={con2_3Img} alt="심리상담" /></div>
                        <p>원데이 마음스캔 · 종합심리검사<br />진로·학습검사</p>
                    </div>
                </li>
                <li>
                    <div className='card'>글로벌상담</div>
                    <div className='box'>
                        <div className='thumbnail'><img src={con2_4Img} alt="심리상담" /></div>
                        <p>선교사 · 유학생 · 다문화<br />해외거주자 · 귀국자</p>
                    </div>
                </li>
                <li>
                    <div className='card'>코칭</div>
                    <div className='box'>
                        <div className='thumbnail'><img src={con2_5Img} alt="심리상담" /></div>
                        <p>학습 · 진로 · 라이프<br />리더십 · 전환기 코칭</p>
                    </div>
                </li>
            </ul>
        </section>
    </div>
  );
};
export default CenterIntro;
