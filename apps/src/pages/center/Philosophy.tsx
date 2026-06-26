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
                <div className="img">
                    {/* <div className='txt1'>
                        <p className='fs_blue'>WITHONE<br />PHILOSOPHY Insight</p>
                        <p className='fs_bold'>증상에는 이유가 있습니다</p>
                        <p className='fs_basic'>불안, 우울, 관계갈등, 번아웃은 제거해야 할 문제가아니라 삶이 보내는 신호일 수 있습니다.</p>
                    </div>
                    <div className='txt2'>
                        <p className='fs_blue'>Healing</p>
                        <p className='fs_bold'>삶이 다시 움직이도록 돕습니다</p>
                        <p className='fs_basic'>회복은 단순히 아프지 않은 상태가 아니라 자신답게 살아갈 힘을 회복하는 과정입니다.</p>
                    </div>
                    <div className='txt3'>
                        <p className='fs_blue'>Growth</p>
                        <p className='fs_bold'>회복을 넘어 성장을 함께 합니다</p>
                        <p className='fs_basic'>자신을 이해하고 관계를 회복하며 삶의 방향을 다시 세워갑니다.</p>
                    </div> */}
                    <img src={con1Img} alt="증상을 넘어, 나를 이해하고 삶을 회복하는 공간" />
                </div>
            </div>
        </section>
    </div>
  );
};
export default CenterPhilosophy;
