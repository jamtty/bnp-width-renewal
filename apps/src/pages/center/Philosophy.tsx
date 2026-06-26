import con1Img from '../../assets/images/pg_philosophy_con1.png';

const CenterPhilosophy = () => {
  return (
    <div className="page_cont philosophy">
        <div className="page_tit">
            <h2>증상을 넘어, 나를 이해하고 삶을 회복하는 공간</h2>
            <p>상담 · 코칭 · 심리검사 · 특화상담· 글로벌 상담 ·교육</p>
        </div>
        <section className="con_1">
            <div className="bg">
                <div className="img"><img src={con1Img} alt="증상을 넘어, 나를 이해하고 삶을 회복하는 공간" /></div>
            </div>
        </section>
    </div>
  );
};
export default CenterPhilosophy;
