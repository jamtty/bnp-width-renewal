import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import logoActiveImg from '../assets/images/logo_active.svg';

const NAV_ITEMS = [
  {
    id: 'center',
    label: '센터소개',
    sub: [
      { label: '센터소개', to: '/center/intro' },
      { label: '센터철학', to: '/center/philosophy' },
      { label: '상담안내', to: '/center/guide' },
      { label: '전문가 소개', to: '/center/experts' },
    ],
  },
  {
    id: 'counseling',
    label: '상담',
    sub: [
      { label: '아동', to: '/counseling/child' },
      { label: '청소년', to: '/counseling/teen' },
      { label: '성인', to: '/counseling/adult' },
      { label: '부부·커플', to: '/counseling/couple' },
      { label: '시니어', to: '/counseling/senior' },
    ],
  },
  {
    id: 'specialized',
    label: '특화상담',
    sub: [
      { label: '특장점', to: '/specialized/features' },
      { label: '공황·불안 상담', to: '/specialized/panic' },
      { label: '번아웃·직장 스트레스 상담', to: '/specialized/burnout' },
      { label: 'ADHD·실행력 상담', to: '/specialized/adhd' },
      { label: '중독 회복 상담', to: '/specialized/addiction' },
      { label: '식이장애·감정조절 상담', to: '/specialized/eating' },
      { label: '커리어 전환·방향 설계 상담', to: '/specialized/career' },
    ],
  },
  {
    id: 'psychology',
    label: '심리검사',
    sub: [
      { label: '원데이 마음 스캔', to: '/psychology/oneday' },
      { label: '종합 심리검사 (Full Battery)', to: '/psychology/full' },
      { label: '아동 놀이발달 평가', to: '/psychology/child' },
      { label: '청소년 심리검사', to: '/psychology/teen' },
      { label: '진로·학습 검사', to: '/psychology/career' },
    ],
  },
  {
    id: 'coaching',
    label: '코칭',
    sub: [
      { label: '코칭안내', to: '/coaching/intro' },
      { label: '학습 진로 코칭', to: '/coaching/learning' },
      { label: '라이프 코칭', to: '/coaching/life' },
      { label: '리더십 코칭', to: '/coaching/leadership' },
      { label: '전환기 코칭', to: '/coaching/transition' },
      { label: '기업 코칭 & 조직 프로그램', to: '/coaching/corporate' },
    ],
  },
  {
    id: 'global',
    label: '글로벌',
    sub: [
      { label: '선교사 심리상담', to: '/global/missionary' },
      { label: '다문화·유학생 심리상담', to: '/global/multicultural' },
      { label: '해외 거주자 상담', to: '/global/overseas' },
      { label: '귀국자 상담', to: '/global/returnee' },
      { label: 'Global Business (B2B)', to: '/global/b2b' },
    ],
  },
  {
    id: 'academy',
    label: '아카데미',
    sub: [
      { label: '관계 대화 코치 과정', to: '/academy/relationship-coach' },
      { label: '전문 상담사 수련 과정', to: '/academy/counselor-training' },
      { label: '전문 자격 프로그램', to: '/academy/certification' },
      { label: '전문상담사 교육', to: '/academy/education' },
      { label: '교회·기관 교육 프로그램', to: '/academy/church' },
      { label: '기관·기업 프로그램', to: '/academy/corporate' },
      { label: '관계 리디자인 세미나', to: '/academy/seminar' },
    ],
  },
  {
    id: 'board',
    label: '게시판',
    sub: [
      { label: '공지사항', to: '/notice' },
      { label: '자료실', to: '/data' },
    ],
  },
];

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [gnbOpen, setGnbOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeId = NAV_ITEMS.find((item) =>
    item.sub.some((sub) => path.startsWith(sub.to))
  )?.id ?? '';

  const closeMenu = () => {
    setMenuOpen(false);
    setGnbOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (path === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
        {/* 스킵 네비게이션 */}
        <div id="skipNavigation">
            <ul>
            <li><a href="#content">본문 바로가기</a></li>
            <li><a href="#gnbMenu">주요메뉴 바로가기</a></li>
            <li><a href="#footer">하단 바로가기</a></li>
            </ul>
        </div>

        {/* header */}
        <div
            className={`header${gnbOpen ? ' gnb-open' : ''}${scrolled && !gnbOpen ? ' scrolled' : ''}`}
            onMouseEnter={() => setGnbOpen(true)}
            onMouseLeave={() => setGnbOpen(false)}
        >
            <h1 className="logo">
            <Link to="/" onClick={handleLogoClick}>
                <img src={gnbOpen || scrolled ? logoActiveImg : logoImg} alt="헤세드상담코칭연구소" />
            </Link>
            </h1>
            {/* GNB */}
            <nav
            id="gnbMenu"
            className={menuOpen ? 'open' : ''}
            >
            <ul className="gnb">
                {NAV_ITEMS.map((item) => (
                <li
                    key={item.id}
                    className={`gnb_item${activeId === item.id ? ' on' : ''}`}
                >
                    <Link
                    to={item.sub[0].to}
                    className="gnb_link"
                    onClick={closeMenu}
                    >
                    {item.label}
                    </Link>
                    <ul className="sub_menu">
                    {item.sub.map((sub) => (
                        <li key={sub.to}>
                        <Link
                            to={sub.to}
                            className={path.startsWith(sub.to) ? 'on' : ''}
                            onClick={closeMenu}
                        >
                            {sub.label}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </li>
                ))}
            </ul>
            </nav>
            {gnbOpen && <div className="gnb-panel" aria-hidden="true" />}
        </div>
    </>
  );
};

export default Header;


