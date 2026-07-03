import img_counseling from '../../assets/images/img_coaching_features.png';

const SpecializedFeatures = () => {
  return (
    <div className="page_cont page_sub child">
        <div className="page_tit">
            <h2>특장점</h2>
        </div>
        <section className="con_1">
            <div className='tit_img'>
                <img src={img_counseling} alt="특장점" />
            </div>
            <div className='tit'>
                <h3>이해를 넘어, 행동이 바뀌는 코칭</h3>
                <p>
                    목표를 세우는 것보다 중요한 것은 실행이 지속되는 구조를 만드는 것입니다.<br />
                    WithOne은 ICF 인증 코치와 상담학 전문가가 함께하여<span className='mobile_br'></span>
                    심리와 행동을 연결하는 코칭을 제공합니다.
                </p>
            </div>
        </section>
    </div>
  );
};
export default SpecializedFeatures;
