import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import type { SubNavItem } from '../../constants/nav';
import { NAV_ITEMS } from '../../constants/nav';
import icoHome from '../../assets/images/ico_home.svg';

interface SubLayoutProps {
  /** 서브 비주얼 배경 이미지 */
  bgImage: string;
  /** LNB(서브메뉴) 항목 */
  lnbItems: SubNavItem[];
  /** 카테고리 라벨 */
  categoryLabel: string;
  /** 현재 카테고리 ID (예: 'center') */
  categoryId: string;
  /** 페이지 타이틀 */
  title: string;
  /** 페이지 본문 콘텐츠 */
  children?: React.ReactNode;
}

const SubLayout = ({
  bgImage,
  lnbItems,
  categoryLabel,
  categoryId,
  title,
  children,
}: SubLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryId = e.target.value;
    const cat = NAV_ITEMS.find((n) => n.id === newCategoryId);
    if (cat && cat.sub.length > 0) {
      navigate(cat.sub[0].to);
    }
  };

  const handleSubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };

  return (
    <div className="wrap sub">
      <Header />

      <div id="container">
        {/* 서브 비주얼 */}
        <div
          className="sub_visual"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="sub_vis_inner">
            <h2 className="sub_vis_title">{categoryLabel}</h2>
          </div>
        </div>

        {/* 브레드크럼 + 콘텐츠 */}
        <div id="contents">
          {/* 브레드크럼 + LNB 드롭다운 */}
          <div className="breadcrumb">
            <div className="breadcrumb_inner">
              {/* Home 아이콘 */}
              <button
                type="button"
                className="breadcrumb_home"
                onClick={() => navigate('/')}
                aria-label="홈으로 이동"
              >
                <img src={icoHome} alt="홈" />
              </button>

              <span className="breadcrumb_arrow"></span>

              {/* 1depth: GNB 카테고리 드롭다운 */}
              <div className="lnb_select_wrap">
                <select
                  className="lnb_select"
                  value={categoryId}
                  onChange={handleCategoryChange}
                >
                  {NAV_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <span className="breadcrumb_arrow"></span>

              {/* 2depth: 현재 카테고리 서브메뉴 드롭다운 */}
              <div className="lnb_select_wrap">
                <select
                  className="lnb_select"
                  value={pathname}
                  onChange={handleSubChange}
                >
                  {lnbItems.map((item) => (
                    <option key={item.to} value={item.to}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="sub_content_wrap">
            <div className="cont_w_area">
              <h2 className="page-title sr-only">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubLayout;
