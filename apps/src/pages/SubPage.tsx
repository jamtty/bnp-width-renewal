import Header from '../components/Header';
import Footer from '../components/Footer';

interface SubPageProps {
  title: string;
}

const SubPage = ({ title }: SubPageProps) => {
  return (
    <div className="wrap sub">
      <Header />
      <div id="container">
        <div id="contents">
          <div className="cont_w_area">
            <h2 className="page-title">{title}</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubPage;
