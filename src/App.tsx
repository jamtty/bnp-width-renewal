import { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import bannerPc from '../../uploads/banner/banner_file_202308222942917.png';
import bannerMobile from '../../uploads/banner/banner_file_202308222639832.png';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';
import InfoPage from './pages/InfoPage';
import EapPage from './pages/EapPage';
import CounselingPage from './pages/CounselingPage';
import EducationPage from './pages/EducationPage';
import NoticePage from './pages/NoticePage';
import NoticeDetailPage from './pages/NoticeDetailPage';
import DataPage from './pages/DataPage';
import DataDetailPage from './pages/DataDetailPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminNoticePage from './pages/admin/AdminNoticePage';
import AdminNoticeFormPage from './pages/admin/AdminNoticeFormPage';
import AdminDataPage from './pages/admin/AdminDataPage';
import AdminDataFormPage from './pages/admin/AdminDataFormPage';
import AdminMyPage from './pages/admin/AdminMyPage';
import AdminLayout from './components/admin/AdminLayout';
import { useAuthStore, isTokenExpired } from './store/useAuthStore';

declare var $: any;

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, accessToken } = useAuthStore();
  if (!isAuthenticated || isTokenExpired(accessToken)) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      <PrivateRoute>{children}</PrivateRoute>
    </AdminLayout>
  );
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/eap" element={<EapPage />} />
      <Route path="/counseling" element={<CounselingPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/notice/:id" element={<NoticeDetailPage />} />
      <Route path="/data" element={<DataPage />} />
      <Route path="/data/:id" element={<DataDetailPage />} />
      {/* 관리자 */}
      <Route path="/admin/login" element={<AdminLayout><AdminLoginPage /></AdminLayout>} />
      <Route path="/admin" element={<AdminRoute><AdminNoticePage /></AdminRoute>} />
      <Route path="/admin/notice" element={<AdminRoute><AdminNoticePage /></AdminRoute>} />
      <Route path="/admin/notice/write" element={<AdminRoute><AdminNoticeFormPage /></AdminRoute>} />
      <Route path="/admin/notice/edit/:id" element={<AdminRoute><AdminNoticeFormPage /></AdminRoute>} />
      <Route path="/admin/data" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
      <Route path="/admin/data/write" element={<AdminRoute><AdminDataFormPage /></AdminRoute>} />
      <Route path="/admin/data/edit/:id" element={<AdminRoute><AdminDataFormPage /></AdminRoute>} />
      <Route path="/admin/mypage" element={<AdminRoute><AdminMyPage /></AdminRoute>} />
      </Routes>
    </>
  );
}

function MainPage() {
  const [bannerUrl, setBannerUrl] = useState(
    window.innerWidth <= 768 ? bannerMobile : bannerPc
  );

  useEffect(() => {
    const handleResize = () => {
      setBannerUrl(window.innerWidth <= 768 ? bannerMobile : bannerPc);
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <div className="wrap main">
      <Header />
      <div id="container">
        <div id="visual">
          <div className="slider">
            <div className="bann_img01" style={{ backgroundImage: `url(${bannerUrl})` }} />
          </div>
        </div>
        <div id="contents">
          <div className="cont_w_area">
            <div className="box_type01">
              <div className="box_cont bg_img01">
                <div>
                  <h4 className="tit_02">EAP</h4>
                  <p>EAP 프로그램은 개인의 정신 건강과 건강한 기업문화을 기반으로 조직문화 증진 및 생산성 향상을 목적으로 한 기업의 정신건강관리 프로그램 입니다.</p>
                  <Link to="/eap">More</Link>
                </div>
              </div>
              <div className="box_cont bg_img02">
                <div>
                  <h4 className="tit_02">상담 및 코칭</h4>
                  <p>심리상담, 심리검사, 코칭 등 다양한 프로그램으로 고객들이 원하는 서비스를 제공하고 있습니다.</p>
                  <Link to="/counseling">More</Link>
                </div>
              </div>
              <div className="box_cont bg_img03">
                <div>
                  <h4 className="tit_02">임상 수련/교육</h4>
                  <p>이 과정은 사람의 마음을 온전히 이해하고자 노력하고, 건강하게 회복하도록 돕고자 자신의 삶을 결정한 전문상담사들의 교육 과정입니다.</p>
                  <Link to="/education">More</Link>
                </div>
              </div>
            </div>
            <h4 className="tit_03">서울특별시 영등포구 당산동5가 11-47 로뎀나무내과 5층 <em>헤세드상담코칭연구소</em></h4>
            <div className="box_map" style={{ overflow: 'hidden' }}>
              <iframe
                className="map_area"
                src="https://maps.google.com/maps?q=37.530774,126.904339&z=16&output=embed"
                style={{ border: 0, width: '100%', height: '420px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="헤세드상담코칭연구소 위치"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
