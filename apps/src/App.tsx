import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollTopButton from './components/ScrollTopButton';
import ScrollToHash from './components/ScrollToHash';
import AnimatedSection from './components/AnimatedSection';
import CenterLayout from './components/subLayout/CenterLayout';
import CounselingLayout from './components/subLayout/CounselingLayout';
import SpecializedLayout from './components/subLayout/SpecializedLayout';
import PsychologyLayout from './components/subLayout/PsychologyLayout';
import CoachingLayout from './components/subLayout/CoachingLayout';
import GlobalLayout from './components/subLayout/GlobalLayout';
import AcademyLayout from './components/subLayout/AcademyLayout';
import BoardLayout from './components/subLayout/BoardLayout';
// 센터소개 페이지
import CenterIntro from './pages/center/Intro';
import CenterPhilosophy from './pages/center/Philosophy';
import CenterGuide from './pages/center/Guide';
import CenterExperts from './pages/center/Experts';
// 상담 페이지
import CounselingChild from './pages/counseling/Child';
import CounselingTeen from './pages/counseling/Teen';
import CounselingAdult from './pages/counseling/Adult';
import CounselingCouple from './pages/counseling/Couple';
import CounselingSenior from './pages/counseling/Senior';
// 특화상담 페이지
import SpecializedFeatures from './pages/specialized/Features';
// 심리검사 페이지
import PsychologyOneday from './pages/psychology/Oneday';
import PsychologyFull from './pages/psychology/Full';
import PsychologyChild from './pages/psychology/Child';
import PsychologyTeen from './pages/psychology/Teen';
// 코칭 페이지
import CoachingFeatures from './pages/coaching/Features';
import CoachingLearning from './pages/coaching/Learning';
import CoachingLife from './pages/coaching/Life';
import CoachingLeadership from './pages/coaching/Leadership';
import CoachingTransition from './pages/coaching/Transition';
import CoachingCorporate from './pages/coaching/Corporate';
// 글로벌 페이지
import GlobalFeatures from './pages/global/Features';
// 아카데미 페이지
import AcademyIntro from './pages/academy/Intro';
import AcademyRelationshipCoach from './pages/academy/RelationshipCoach';
import AcademyCounselorTraining from './pages/academy/CounselorTraining';
import AcademyCertification from './pages/academy/Certification';
import AcademyEducation from './pages/academy/Education';
import AcademyChurch from './pages/academy/Church';
import AcademyCorporatePage from './pages/academy/Corporate';
import AcademySeminar from './pages/academy/Seminar';
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
import AdminBannerPage from './pages/admin/AdminBannerPage';
import AdminBannerFormPage from './pages/admin/AdminBannerFormPage';
import AdminExpertPage from './pages/admin/AdminExpertPage';
import AdminExpertFormPage from './pages/admin/AdminExpertFormPage';
import AdminPopupPage from './pages/admin/AdminPopupPage';
import AdminPopupFormPage from './pages/admin/AdminPopupFormPage';
import PopupLayer from './components/PopupLayer';
import AdminLayout from './components/admin/AdminLayout';
import { useAuthStore, isTokenExpired } from './store/useAuthStore';
import visImg1 from './assets/images/img_vis_1.png';
import visImg2 from './assets/images/img_vis_2.png';
import visImg3 from './assets/images/img_vis_3.png';
import visImg4 from './assets/images/img_vis_4.png';
import partner1 from './assets/images/ico_partner_1.svg';
import partner2 from './assets/images/ico_partner_2.svg';
import partner3 from './assets/images/ico_partner_3.svg';
import partner4 from './assets/images/ico_partner_4.svg';
import partner5 from './assets/images/ico_partner_5.svg';
import partner6 from './assets/images/ico_partner_6.svg';
import partner7 from './assets/images/ico_partner_7.svg';
import partner8 from './assets/images/ico_partner_8.svg';
import partner9 from './assets/images/ico_partner_9.svg';
import partner10 from './assets/images/ico_partner_10.svg';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, accessToken, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const isExpired = !isAuthenticated || isTokenExpired(accessToken);

  // 만료 감지 시 스토어 정리
  useEffect(() => {
    if (isExpired) {
      clearAuth();
    }
  }, [isExpired, clearAuth]);

  // 1분마다 토큰 만료 여부 체크 → 만료 시 자동 로그아웃
  useEffect(() => {
    if (!accessToken) return;
    const interval = setInterval(() => {
      if (isTokenExpired(accessToken)) {
        clearAuth();
        navigate('/admin/login', { replace: true });
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [accessToken, clearAuth, navigate]);

  if (isExpired) {
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
      {/* 센터소개 */}
      <Route path="/center/intro" element={<CenterLayout title="센터소개"><CenterIntro /></CenterLayout>} />
      <Route path="/center/philosophy" element={<CenterLayout title="센터철학"><CenterPhilosophy /></CenterLayout>} />
      <Route path="/center/guide" element={<CenterLayout title="상담안내"><CenterGuide /></CenterLayout>} />
      <Route path="/center/experts" element={<CenterLayout title="전문가 소개"><CenterExperts /></CenterLayout>} />
      {/* 상담 */}
      <Route path="/counseling/child" element={<CounselingLayout title="아동 상담"><CounselingChild /></CounselingLayout>} />
      <Route path="/counseling/teen" element={<CounselingLayout title="청소년 상담"><CounselingTeen /></CounselingLayout>} />
      <Route path="/counseling/adult" element={<CounselingLayout title="성인 상담"><CounselingAdult /></CounselingLayout>} />
      <Route path="/counseling/couple" element={<CounselingLayout title="부부·커플 상담"><CounselingCouple /></CounselingLayout>} />
      <Route path="/counseling/senior" element={<CounselingLayout title="시니어 상담"><CounselingSenior /></CounselingLayout>} />
      {/* 특화상담 */}
      <Route path="/specialized/features" element={<SpecializedLayout title="특화상담"><SpecializedFeatures /></SpecializedLayout>} />
      {/* 심리검사 */}
      <Route path="/psychology/oneday" element={<PsychologyLayout title="원데이 마음 검사"><PsychologyOneday /></PsychologyLayout>} />
      <Route path="/psychology/full" element={<PsychologyLayout title="종합 심리검사 (Full Battery)"><PsychologyFull /></PsychologyLayout>} />
      <Route path="/psychology/child" element={<PsychologyLayout title="아동 놀이발달 평가"><PsychologyChild /></PsychologyLayout>} />
      <Route path="/psychology/teen" element={<PsychologyLayout title="청소년 심리검사"><PsychologyTeen /></PsychologyLayout>} />
      {/* 코칭 */}
      <Route path="/coaching/features" element={<CoachingLayout title="특장점"><CoachingFeatures /></CoachingLayout>} />
      <Route path="/coaching/learning" element={<CoachingLayout title="학습 진로 코칭"><CoachingLearning /></CoachingLayout>} />
      <Route path="/coaching/life" element={<CoachingLayout title="라이프 코칭"><CoachingLife /></CoachingLayout>} />
      <Route path="/coaching/leadership" element={<CoachingLayout title="리더십 코칭"><CoachingLeadership /></CoachingLayout>} />
      <Route path="/coaching/transition" element={<CoachingLayout title="전환기 코칭"><CoachingTransition /></CoachingLayout>} />
      <Route path="/coaching/corporate" element={<CoachingLayout title="기업 코칭 & 조직 프로그램"><CoachingCorporate /></CoachingLayout>} />
      {/* 글로벌 */}
      <Route path="/global/features" element={<GlobalLayout title="글로벌"><GlobalFeatures /></GlobalLayout>} />
      {/* 아카데미 */}
      <Route path="/academy/intro" element={<AcademyLayout title="아카데미 소개"><AcademyIntro /></AcademyLayout>} />
      <Route path="/academy/relationship-coach" element={<AcademyLayout title="관계 대화 코치 과정"><AcademyRelationshipCoach /></AcademyLayout>} />
      <Route path="/academy/counselor-training" element={<AcademyLayout title="전문 상담사 수련 과정"><AcademyCounselorTraining /></AcademyLayout>} />
      <Route path="/academy/certification" element={<AcademyLayout title="전문 자격 프로그램"><AcademyCertification /></AcademyLayout>} />
      <Route path="/academy/education" element={<AcademyLayout title="전문상담사 교육"><AcademyEducation /></AcademyLayout>} />
      <Route path="/academy/church" element={<AcademyLayout title="교회·사역자 교육 프로그램"><AcademyChurch /></AcademyLayout>} />
      <Route path="/academy/corporate" element={<AcademyLayout title="기관·기업 교육 프로그램"><AcademyCorporatePage /></AcademyLayout>} />
      <Route path="/academy/seminar" element={<AcademyLayout title="관계 리디자인 세미나"><AcademySeminar /></AcademyLayout>} />
      {/* 게시판 */}
      <Route path="/notice" element={<BoardLayout title="공지사항"><NoticePage /></BoardLayout>} />
      <Route path="/notice/:id" element={<BoardLayout title="공지사항"><NoticeDetailPage /></BoardLayout>} />
      <Route path="/data" element={<BoardLayout title="자료실"><DataPage /></BoardLayout>} />
      <Route path="/data/:id" element={<BoardLayout title="자료실"><DataDetailPage /></BoardLayout>} />
      {/* 관리자 */}
      <Route path="/admin/login" element={<AdminLayout><AdminLoginPage /></AdminLayout>} />
      <Route path="/admin" element={<AdminRoute><AdminNoticePage /></AdminRoute>} />
      <Route path="/admin/notice" element={<AdminRoute><AdminNoticePage /></AdminRoute>} />
      <Route path="/admin/notice/write" element={<AdminRoute><AdminNoticeFormPage /></AdminRoute>} />
      <Route path="/admin/notice/edit/:id" element={<AdminRoute><AdminNoticeFormPage /></AdminRoute>} />
      <Route path="/admin/data" element={<AdminRoute><AdminDataPage /></AdminRoute>} />
      <Route path="/admin/data/write" element={<AdminRoute><AdminDataFormPage /></AdminRoute>} />
      <Route path="/admin/data/edit/:id" element={<AdminRoute><AdminDataFormPage /></AdminRoute>} />
      <Route path="/admin/banner" element={<AdminRoute><AdminBannerPage /></AdminRoute>} />
      <Route path="/admin/banner/write" element={<AdminRoute><AdminBannerFormPage /></AdminRoute>} />
      <Route path="/admin/banner/edit/:id" element={<AdminRoute><AdminBannerFormPage /></AdminRoute>} />
      <Route path="/admin/expert" element={<AdminRoute><AdminExpertPage /></AdminRoute>} />
      <Route path="/admin/expert/write" element={<AdminRoute><AdminExpertFormPage /></AdminRoute>} />
      <Route path="/admin/expert/edit/:id" element={<AdminRoute><AdminExpertFormPage /></AdminRoute>} />
      <Route path="/admin/popup" element={<AdminRoute><AdminPopupPage /></AdminRoute>} />
      <Route path="/admin/popup/write" element={<AdminRoute><AdminPopupFormPage /></AdminRoute>} />
      <Route path="/admin/popup/edit/:id" element={<AdminRoute><AdminPopupFormPage /></AdminRoute>} />
      <Route path="/admin/mypage" element={<AdminRoute><AdminMyPage /></AdminRoute>} />
      </Routes>
    </>
  );
}

const VIS_SLIDES = [
  {
    img: visImg1,
    title: '증상을 넘어, 나를 이해하고 삶을 회복하는 공간',
    desc: '상담 · 코칭 · 글로벌 상담 심리검사 교육을\n한 곳에서 만나는 통합 심리지원 플랫폼',
  },
  {
    img: visImg2,
    title: '왜 같은 문제가 반복될까요?',
    desc: '문제보다 원인을 이해할 때 변화가 시작됩니다.\n우울·불안·관계 갈등의 근본 원인을 찾고, 회복과 성장의 방향을 함께 설계합니다.',
  },
  {
    img: visImg3,
    title: '일반 상담으로 해결되지 않는 문제라면 특화상담',
    desc: 'ADHD · 공황 · 번아웃 · 식이장애 · 진로전환 등\n분야별 전문가가 함께하는 정밀 진단 기반 특화상담',
  },
  {
    img: visImg4,
    title: '한국과 세계를 연결하는 글로벌 상담\n유학생 · 선교사 · 해외거주자 · 다문화가정 6개 언어 상담 지원',
    desc: '',
  },
];

const PARTNERS = [
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  partner7,
  partner8,
  partner9,
  partner10,
];

function MainPage() {
  const [slideKey, setSlideKey] = useState(0);

  const handleSlideChange = useCallback(() => {
    setSlideKey(prev => prev + 1);
  }, []);

  // ScrollTrigger 플러그인 등록 및 초기 레이아웃 refresh
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // 레이아웃 완료 후 ScrollTrigger 위치 재계산
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <PopupLayer />
      <div className="visual">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={800}
          pagination={{ clickable: true }}
          navigation
          loop
          className="main-vis-swiper"
          onSlideChange={handleSlideChange}
        >
          {VIS_SLIDES.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className="vis_slide"
                style={{ backgroundImage: `url(${slide.img})` }}
              />
              <div className="vis_text" key={`text-${slideKey}-${i}`}>
                <h2>{slide.title.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}</h2>
                <p>{slide.desc.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className='section_1'>
        <div className='inner'>
            <AnimatedSection className='tit' direction='up' duration={0.7}>
                <h2>연구와 임상을 연결하는<span className='mo_br'></span>회복과 성장의 심리상담</h2>
                <p>교수진 · 전문상담사 · 글로벌 전문가가 함께하는 연구기반 심리상담</p>
            </AnimatedSection>
            <AnimatedSection className='card' direction='up' delay={0.2} duration={0.7} as="ul">
                <li>
                    <h4>교수급 전문위원 및<br />전문가 시스템</h4>
                    <p>
                        학술적 연구 역량과<br />
                        풍부한 임상 경험을 갖춘<br />
                        석·박사 교수진의 책임 상담
                    </p>
                </li>
                <li>
                    <h4>검사-상담<br />통합 시스템</h4>
                    <p>
                        정밀한 심리 평가 데이터로<br />
                        개인과 조직의 빠른 회복까지<br />
                        이끄는 통합 솔루션
                    </p>
                </li>
                <li>
                    <h4>글로벌·다문화 &<br />사역자 상담</h4>
                    <p>
                        경계를 넘어, 사각지대 없는<br />
                        온·오프라인 맞춤형 마음 치유
                    </p>
                </li>
                <li>
                    <h4>교육 아카데미</h4>
                    <p>
                        상담사를 가르치는<br />
                        NO.1 교육 인프라로 함께<br />
                        이루는 전문성 성장
                    </p>
                </li>
            </AnimatedSection>
        </div>
      </section>
      <section className='mapWrap'>
        <div className='inner'>
            <AnimatedSection className='tit' direction='up' duration={0.7}>
                <h2>오시는 길</h2>
            </AnimatedSection>
            <AnimatedSection className='map' direction='up' duration={0.8}>
            <iframe
                src="https://maps.google.com/maps?q=37.5379078,126.9444349&z=17&output=embed"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="헤세드상담코칭연구소 오시는 길"
            />
            </AnimatedSection>
            <AnimatedSection direction='up' delay={0.1} duration={0.6}>
              <p className='addr'>서울특별시 마포구 마포대로 12, 1709호 (한신오피스텔)<span className='mo_br'></span>헤세드상담코칭연구소</p>
            </AnimatedSection>
            <AnimatedSection direction='fade' delay={0.2} duration={0.6}>
            <ul className='partners'>
                <div className='partners_track'>
                    {PARTNERS.map((img, i) => (
                        <li key={i}>
                            <img src={img} alt={`파트너사 로고 ${i + 1}`} />
                        </li>
                    ))}
                    {PARTNERS.map((img, i) => (
                        <li key={`dup-${i}`}>
                            <img src={img} alt={`파트너사 로고 ${i + 1}`} />
                        </li>
                    ))}
                </div>
            </ul>
            </AnimatedSection>
        </div>
      </section>

      <ScrollTopButton />
      <Footer />
    </>
  );
}

export default App;
