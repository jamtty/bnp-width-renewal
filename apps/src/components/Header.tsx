import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NAV_ITEMS } from '../constants/nav';
import logoImg from '../assets/images/logo.svg';
import logoActiveImg from '../assets/images/logo_active.svg';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [gnbOpen, setGnbOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
    if (mobileOpen) setMobileExpanded(null);
  };

  const toggleMobileItem = (id: string) => {
    setMobileExpanded((prev) => (prev === id ? null : id));
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
            className={`header${gnbOpen ? ' gnb-open' : ''}${scrolled ? ' scrolled' : ''}${mobileOpen ? ' mobile-open' : ''}`}
            onMouseEnter={() => setGnbOpen(true)}
            onMouseLeave={() => setGnbOpen(false)}
        >
            <h1 className="logo">
            <Link to="/" onClick={handleLogoClick}>
                <img className="logo-default" src={logoImg} alt="헤세드상담코칭연구소" />
                <img className="logo-active" src={logoActiveImg} alt="헤세드상담코칭연구소" />
            </Link>
            </h1>

            {/* 햄버거 버튼 (모바일) */}
            <button
              type="button"
              className="mobile_menu_btn"
              aria-label="메뉴 열기"
              onClick={toggleMobile}
            ></button>

            {/* GNB (PC) */}
            <nav id="gnbMenu" className={menuOpen ? 'open' : ''}>
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

        {/* 모바일 드로어 메뉴 */}
        {mobileOpen && <div className="mobile_overlay" onClick={closeMenu} />}
        <nav className={`mobile_nav${mobileOpen ? ' open' : ''}`}>
          <div className="mobile_nav_head">
            <Link to="/" className="mobile_nav_logo" onClick={closeMenu}>
              <img src={logoActiveImg} alt="헤세드상담코칭연구소" />
            </Link>
            <button type="button" className="mobile_nav_close" aria-label="메뉴 닫기" onClick={closeMenu}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <ul className="mobile_gnb">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className={`mobile_gnb_item${mobileExpanded === item.id ? ' expanded' : ''}`}>
                <button
                  type="button"
                  className={`mobile_gnb_btn${activeId === item.id ? ' on' : ''}`}
                  onClick={() => toggleMobileItem(item.id)}
                >
                  {item.label}
                  <span className="mobile_gnb_arrow" />
                </button>
                <ul className="mobile_sub">
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
    </>
  );
};

export default Header;


