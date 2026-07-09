import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNoticeList, type NoticeItem } from '../api/notice';

const PAGE_SIZE = 10;

const NoticePage = () => {
  const navigate = useNavigate();
  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<NoticeItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchNoticeList({ page: currentPage, size: PAGE_SIZE, keyword: keyword || undefined, type: keyword ? 0 : undefined })
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
        <h2>공지사항</h2>
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
        <caption>공지사항 리스트</caption>
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
            <th scope="col">조회수</th>
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
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/notice/${item.id}`); }}>
                    {item.title}
                  </a>
                </td>
                <td>{item.created_at?.slice(0, 10)}</td>
                <td>{item.view_count}</td>
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

export default NoticePage;
