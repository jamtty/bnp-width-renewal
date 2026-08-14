import FooterLogo from '../assets/images/ico_footer_logo.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className='inner'>
        <div className="logo"><img src={FooterLogo} alt="푸터 로고"/></div>
        <p className="addr">
            대표자 : 임국진<span className='line'></span>사업자번호 : 668-06-01224<span className='mo_br mb-10'></span><br />
            서울특별시 마포구 마포대로 12, 1709호 (한신오피스텔)<span className='mo_br'></span><span className='line hidden'></span>T. (마포)02-704-5822 / (당산)02-2632-7755
        </p>
        <p className="copyright">COPYRIGHT 2019 ALL RIGHT RESERVED.</p>
      </div>
    </div>
  );
};

export default Footer;
