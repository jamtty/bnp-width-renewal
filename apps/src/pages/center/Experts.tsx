import { useState } from 'react';
import con1_Img from '../../assets/images/img_sample.png';

const advisorList = [
  {
    name: '김현정 상담사 (임상심리전문가)',
    tags: '#불안 #성인ADHD #트라우마 #감정조절',
    desc: '복잡한 감정을 이해하고 정리하도록 돕는 상담',
    career: ['○○대 상담심리 석사', '보건복지부 임상심리사', '위드원 공감 지도사Level 1'],
  },
  {
    name: '박민수 교수 (정신건강의학과)',
    tags: '#우울증 #불안장애 #스트레스',
    desc: '정신건강의학과 전문의로서 약물 및 심리치료 제공',
    career: ['△△대 의대 정신건강의학과 교수', '대한정신건강의학회 정회원'],
  },
  {
    name: '이영희 수퍼바이저',
    tags: '#관계 #가족상담 #위기개입',
    desc: '20년 이상의 임상 경험을 바탕으로 한 수퍼비전',
    career: ['□□대 사회복지학 박사', '한국상담심리학회 수퍼바이저'],
  },
  {
    name: '최재호 자문위원',
    tags: '#조직컨설팅 #리더십코칭',
    desc: '기업 및 기관 대상 조직 컨설팅 전문',
    career: ['글로벌 HR 컨설팅 대표', '한국코칭협회 인증코치'],
  },
  {
    name: '강미경 수퍼바이저',
    tags: '#아동심리 #발달장애 #놀이치료',
    desc: '아동 심리 발달과 가족 관계 개선을 위한 전문 수퍼비전',
    career: ['발달심리학 박사', '한국놀이치료학회 수퍼바이저'],
  },
  {
    name: '윤상현 자문위원',
    tags: '#중독 #도박중독 #알코올중독',
    desc: '중독 문제로 어려움을 겪는 내담자와 가족 상담',
    career: ['중독심리학 박사', '한국중독정신의학회 자문위원'],
  },
  {
    name: '박지은 상담사',
    tags: '#우울증 #불안 #스트레스',
    desc: '인지행동치료(CBT) 기반의 체계적인 상담 제공',
    career: ['임상심리학 석사', '건강보험공단 임상심리사'],
  },
  {
    name: '조용호 교수',
    tags: '#트라우마 #EMDR #심리치료',
    desc: '트라우마 치료 및 EMDR 전문가 수퍼비전',
    career: ['정신건강의학과 전문의', '대한트라우마학회 이사'],
  },
];

const coachList = [
  {
    name: '송미영 전문상담사',
    tags: '#아동 #청소년 #진로',
    desc: '아동·청소년 상담 및 진로 코칭 전문',
    career: ['한국상담심리학회 전문상담사', '청소년상담사 1급'],
  },
  {
    name: '정대호 전문코치',
    tags: '#자기계발 #경력개발 #면접',
    desc: '경력 전환 및 자기계발 목표 달성 코칭',
    career: ['국제코치연맹(ICF) PCC', 'HRD 전문코치'],
  },
  {
    name: '한지수 전문상담사',
    tags: '#부부상담 #중독 #트라우마',
    desc: '관계 회복과 중독 회복을 위한 전문 상담',
    career: ['가족상담학 석사', '중독심리상담사'],
  },
  {
    name: '김태호 전문코치',
    tags: '#스피치 #프레젠테이션 #리더십',
    desc: '비즈니스 커뮤니케이션 코칭 전문',
    career: ['한국코칭협회 전문코치', '스피치 교육 강사 15년'],
  },
  {
    name: '이나래 전문상담사',
    tags: '#심리검사 #적응 #자존감',
    desc: '심리검사 및 적응 상담을 통한 자존감 회복 지원',
    career: ['심리학 석사', '임상심리사 2급', '심리검사 전문가'],
  },
  {
    name: '황진우 전문코치',
    tags: '#갈등관리 #조직문화 #소통',
    desc: '조직 내 갈등 해결과 효과적인 소통 코칭',
    career: ['조직심리학 박사', 'ICF 인증코치', 'HRD 컨설턴트'],
  },
  {
    name: '서미현 전문상담사',
    tags: '#이별 #애도 #외로움',
    desc: '상실과 이별의 경험을 치유하는 공감 상담',
    career: ['상담심리학 박사', '한국상담학회 전문상담사'],
  },
  {
    name: '박재민 전문코치',
    tags: '#팀빌딩 #성과관리 #코칭리더십',
    desc: '팀의 시너지를 극대화하는 리더십 코칭',
    career: ['경영학 석사', '한국코칭협회 전문코치', '기업 코칭 10년'],
  },
];

const PAGE_SIZE = 4;

const CenterExperts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const list = activeTab === 0 ? advisorList : coachList;
  const totalPages = Math.ceil(list.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageList = list.slice(startIdx, startIdx + PAGE_SIZE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="page_cont experts">
        <div className="page_tit">
            <h2>상담의 기준과 깊이를 지키는 전문가 그룹</h2>
            <p>자문위원 및 슈퍼바이저와 전문상담사 전문 코치</p>
        </div>
        <section className="con_1">
            <div className="tab_wrap">
                <span className="tab_bar" style={{ left: activeTab === 0 ? '0' : '50%' }} />
                <button
                    type="button"
                    className={`tab_btn ${activeTab === 0 ? 'on' : ''}`}
                    onClick={() => { setActiveTab(0); setCurrentPage(1); }}
                >자문위원 및 슈퍼바이저</button>
                <button
                    type="button"
                    className={`tab_btn ${activeTab === 1 ? 'on' : ''}`}
                    onClick={() => { setActiveTab(1); setCurrentPage(1); }}
                >전문상담사 전문 코치</button>
            </div>
            <ul className="card_list">
                {pageList.map((item, i) => (
                    <li key={startIdx + i}>
                        <div className="thumbnail"><img src={con1_Img} alt={item.name} /></div>
                        <div className="txt">
                            <div className="tit">
                                <h3>{item.name}<span>{item.tags}</span></h3>
                            </div>
                            <div className="info">
                                <strong>{item.desc}</strong>
                                <p>{item.career.map((c, idx) => (<>{idx > 0 && <br />}{c}</>))}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {totalPages > 1 && (
            <div className="pagination">
                <button type="button" className="page_btn first" onClick={() => handlePageChange(1)} disabled={currentPage === 1}></button>
                <button type="button" className="page_btn prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}></button>
                {getPageNumbers().map(p => (
                    <button key={p} type="button" className={`page_num ${p === currentPage ? 'on' : ''}`} onClick={() => handlePageChange(p)}>{p}</button>
                ))}
                <button type="button" className="page_btn next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}></button>
                <button type="button" className="page_btn last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}></button>
            </div>
            )}
        </section>
    </div>
  );
};
export default CenterExperts;
