import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReportList, type ReportItem } from '../api/report';

const PAGE_SIZE = 10;

const DataPage = () => {
  const navigate = useNavigate();
  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<ReportItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchReportList({ page: currentPage, size: PAGE_SIZE, keyword: keyword || undefined, type: keyword ? 0 : undefined })
      .then((res) => {
        setItems(res.items);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      })
      .catch((e) => setError(e.message || '목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [currentPage, keyword]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setKeyword(inputKeyword);
  };

  const PAGE_GROUP_SIZE = 10;
  const groupStart = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNumbers = Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i);

  const handlePageMove = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className="board_list">
      <div className="page_tit">
        <h2>자료실</h2>
      </div>

      {/* search start */}
      <div className="board_search">
        <form id="search_form" name="search_form" onSubmit={handleSearch}>
          <label htmlFor="search_keyword" className="blind">검색어 입력</label>
          <input
            type="text"
            id="search_keyword"
            name="search_keyword"
            placeholder="검색어를 입력하세요."
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
          <button type="submit" aria-label="검색">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <line x1="15.7" y1="15.7" x2="20" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      </div>
      {/* search end */}

      <p className="board_total">총 <strong>{totalCount}</strong>건이 검색되었습니다.</p>

      {/* list start */}
      <table className="tbl_type01">
        <caption>자료실 리스트</caption>
        <colgroup>
          <col style={{ width: '9.2rem' }} />
          <col />
          <col style={{ width: '24rem' }} />
          <col style={{ width: '18.7rem' }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">등록일</th>
            <th scope="col">파일</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={4}>불러오는 중...</td></tr>
          ) : error ? (
            <tr><td colSpan={4}>{error}</td></tr>
          ) : items.length === 0 ? (
            <tr><td colSpan={4}>게시물이 없습니다.</td></tr>
          ) : (
            items.map((item, index) => (
              <tr key={item.id}>
                <td>{totalCount - (currentPage - 1) * PAGE_SIZE - index}</td>
                <td className="td_l">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/data/${item.id}`); }}>
                    {item.title}
                  </a>
                </td>
                <td>{item.created_at?.slice(0, 10)}</td>
                <td>{item.file_count > 0 ? (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'2.2rem', height:'2.2rem', display:'block', margin:'0 auto' }}>
                    <path d="M21.44 11.05L12.25 20.24C10.69 21.8 8.15 21.8 6.59 20.24C5.03 18.68 5.03 16.14 6.59 14.58L14.12 7.05C15.17 6 16.86 6 17.91 7.05C18.96 8.1 18.96 9.79 17.91 10.84L11.29 17.46C10.81 17.94 10.03 17.94 9.55 17.46C9.07 16.98 9.07 16.2 9.55 15.72L14.83 10.44" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'2.2rem', height:'2.2rem', display:'block', margin:'0 auto' }}>
                    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                )}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* list end */}

      {/* paging start */}
      {totalPages > 1 && (
        <div className="pagination">
          <h4 className="blind">paging</h4>
          <button
            type="button"
            className="page_btn first"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          ></button>
          <button
            type="button"
            className="page_btn prev"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          ></button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              className={`page_num ${currentPage === page ? 'on' : ''}`}
              onClick={(e) => handlePageMove(e, page)}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="page_btn next"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          ></button>
          <button
            type="button"
            className="page_btn last"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          ></button>
        </div>
      )}
      {/* paging end */}
    </div>
  );
};

export default DataPage;
