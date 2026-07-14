import React, { useState, useEffect, useCallback } from 'react';
import { fetchExpertList, type ExpertItem } from '../../api/expert';

const PAGE_SIZE = 4;

const CenterExperts = () => {
  const [activeTab, setActiveTab] = useState(0);  // 0: advisor, 1: coach
  const [currentPage, setCurrentPage] = useState(1);
  const [advisorList, setAdvisorList] = useState<ExpertItem[]>([]);
  const [coachList, setCoachList] = useState<ExpertItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [advisorRes, coachRes] = await Promise.all([
        fetchExpertList({ type: 'advisor', size: 100 }),
        fetchExpertList({ type: 'coach', size: 100 }),
      ]);
      setAdvisorList(advisorRes.items);
      setCoachList(coachRes.items);
    } catch {
      // silently fail - show empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const list = activeTab === 0 ? advisorList : coachList;
  const totalPages = Math.ceil(list.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageList = list.slice(startIdx, startIdx + PAGE_SIZE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 탭 변경 시 페이지 리셋
  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  if (loading) {
    return (
      <div className="page_cont page_sub experts">
        <div className="page_tit">
          <h2>상담의 기준과 깊이를 지키는 전문가 그룹</h2>
          <p>자문위원 및 슈퍼바이저와 전문상담사 전문 코치</p>
        </div>
        <section className="con_1" style={{ textAlign: 'center', padding: '4rem 0' }}>
          불러오는 중...
        </section>
      </div>
    );
  }

  return (
    <div className="page_cont page_sub experts">
        <div className="page_tit">
            <h2>상담의 기준과 깊이를 지키는 전문가 그룹</h2>
            <p>자문위원 및 슈퍼바이저와 전문상담사 전문 코치</p>
        </div>
        <section className="con_1">
            <div className="tab_wrap">
                <span className="tab_bar" style={{ left: activeTab === 0 ? '0' : '50%' }} />
                <button
                    type="button"
                    className={`tab_btn ${activeTab === 0 ? 'on' : ''}`}
                    onClick={() => handleTabChange(0)}
                >자문위원 및 슈퍼바이저</button>
                <button
                    type="button"
                    className={`tab_btn ${activeTab === 1 ? 'on' : ''}`}
                    onClick={() => handleTabChange(1)}
                >전문상담사 전문 코치</button>
            </div>
            <ul className="card_list">
                {pageList.map((item) => (
                    <li key={item.expert_id}>
                        <div className="thumbnail">
                            {item.expert_img_url ? (
                                <img src={item.expert_img_url} alt={item.expert_name} />
                            ) : (
                                <div className="no_image">No Image</div>
                            )}
                        </div>
                        <div className="txt">
                            <div className="tit">
                                <h3>{item.expert_name}<span>{item.expert_tags}</span></h3>
                            </div>
                            <div className="info">
                                <strong>{item.expert_desc}</strong>
                                <p>{item.expert_career.map((c, idx) => (<React.Fragment key={idx}>{idx > 0 && <br />}{c}</React.Fragment>))}</p>
                            </div>
                        </div>
                    </li>
                ))}
                {pageList.length === 0 && (
                    <li style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 0', color: '#999', fontSize: '1.6rem' }}>
                        등록된 전문가가 없습니다.
                    </li>
                )}
            </ul>
            {totalPages > 1 && (
            <div className="pagination">
                <button type="button" className="page_btn first" onClick={() => handlePageChange(1)} disabled={currentPage === 1}></button>
                <button type="button" className="page_btn prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}></button>
                {getPageNumbers().map(p => (
                    <button key={p} type="button" className={`page_num ${p === currentPage ? 'on' : ''}`} onClick={() => handlePageChange(p)}>{p}</button>
                ))}
                <button type="button" className="page_btn next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}></button>
                <button type="button" className="page_btn last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}></button>
            </div>
            )}
        </section>
    </div>
  );
};
export default CenterExperts;
