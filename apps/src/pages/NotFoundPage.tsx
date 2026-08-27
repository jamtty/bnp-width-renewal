import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

/**
 * 404 에러 페이지 (헤더/푸터 제외 독립형)
 * 존재하지 않는 URL 접근 시 흰 화면 대신 에러 안내를 표시한다.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error_page_wrap">
      <AnimatedSection className="error_page" direction="up" duration={0.7}>
        <p className="error_code">404</p>
        <h2 className="error_title">페이지를 찾을 수 없습니다</h2>
        <p className="error_desc">
          요청하신 페이지가 존재하지 않거나 주소가 변경되었을 수 있습니다.
          <br />
          입력하신 주소를 다시 한번 확인해 주세요.
        </p>
        <div className="error_btns">
          <button type="button" className="btn_error" onClick={() => navigate('/')}>
            홈으로 가기
          </button>
          <button type="button" className="btn_error ghost" onClick={() => navigate(-1)}>
            이전 페이지
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default NotFoundPage;
