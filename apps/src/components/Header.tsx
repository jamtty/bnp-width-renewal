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


