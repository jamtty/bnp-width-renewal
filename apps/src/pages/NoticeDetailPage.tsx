import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoticeDetail, type NoticeDetail, type NoticeFile } from '../api/notice';
import { toAbsUrl, resolveContentUrls } from '../utils/uploadUrl';
import icoPrint from '../assets/images/ico_board_print.svg';
import icoShare from '../assets/images/ico_board_share.svg';

const NoticeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<NoticeDetail | null>(null);
  const [files, setFiles] = useState<NoticeFile[]>([]);
  const [prev, setPrev] = useState<{ id: number; title: string } | null>(null);
  const [next, setNext] = useState<{ id: number; title: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    fetchNoticeDetail(Number(id))
      .then((res) => {
        setItem(res.item);
        setFiles(res.files);
        setPrev(res.prev);
        setNext(res.next);
      })
      .catch((e) => setError(e.message || '데이터를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: item?.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('현재 페이지 주소가 복사되었습니다.');
      }
    } catch {
      // 사용자 취소 등은 무시
    }
  };

  const handlePrint = () => {
    if (!item) return;
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) { window.print(); return; }
    const content = resolveContentUrls(item.content ?? '');
    const title = item.title;
    const date = item.created_at?.slice(0, 10).replace(/-/g, '.');
    const author = item.author_name;
    printWindow.document.write(`<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>${title}</title>
<style>
  @page { margin:1.5cm; }
  body { font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif; padding:0; margin:0; color:#222; line-height:1.8; }
  h1 { font-size:2rem; margin:0 0 0.8rem; page-break-after:avoid; }
  .meta { font-size:1.3rem; color:#888; margin:0 0 2rem; padding:0 0 1.5rem; border-bottom:1px solid #ddd; page-break-after:avoid; }
  .content { font-size:1.5rem; }
  .content img { max-width:100%; height:auto; display:block; }
</style></head>
<body>
  <h1>${title}</h1>
  <div class="meta">${date} | ${author} | 공지사항</div>
  <div class="content">${content}</div>
</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };

  return (
    <div className="board_list">
      <div className="page_tit">
        <h2>공지사항</h2>
      </div>
      
      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>불러오는 중...</div>
      ) : error ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <p>{error}</p>
          <button className="btn" onClick={() => navigate('/notice')} style={{ marginTop: '20px' }}>목록으로</button>
        </div>
      ) : !item ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <p>해당 공지사항을 찾을 수 없습니다.</p>
          <button className="btn" onClick={() => navigate('/notice')} style={{ marginTop: '20px' }}>
            목록으로
          </button>
        </div>
      ) : (
        <>
          {/* view start */}
          <div className="box_view">
            <div className="obj_head">
              <div className="tit_row">
                <strong>{item.title}</strong>
              </div>
              <div className="meta_row">
                <ul>
                  <li>{item.created_at?.slice(0, 10).replace(/-/g, '.')}</li>
                  <li>{item.author_name}</li>
                  <li>공지사항</li>
                  {files.length > 0 && (
                    <li>
                      첨부파일{' '}
                      {files.map((f) => (
                        <a
                          key={f.id}
                          href={toAbsUrl(f.file_url)}
                          className="file indent"
                          download={f.ori_name}
                          data-tooltip-text={f.ori_name}
                        >
                          {f.ori_name}
                        </a>
                      ))}
                    </li>
                  )}
                </ul>
                <ul className="share_btns">
                  <li>
                    <button type="button" aria-label="인쇄" onClick={handlePrint}>
                      <img src={icoPrint} alt="인쇄" />
                    </button>
                  </li>
                  <li>
                    <button type="button" aria-label="공유" onClick={handleShare}>
                      <img src={icoShare} alt="공유" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="obj_cont"
              dangerouslySetInnerHTML={{ __html: resolveContentUrls(item.content ?? '') }}
            />
          </div>
          {/* view end */}

          {/* prev/next start */}
          <table className="tbl_prevnext" style={{ marginTop: '10px' }}>
            <caption>이전글 / 다음글</caption>
            <colgroup>
              <col style={{ width: '13.5rem' }} />
              <col />
            </colgroup>
            <tbody>
              {prev && (
                <tr>
                  <th scope="row">이전글</th>
                  <td className="td_l">
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); navigate(`/notice/${prev.id}`); }}
                    >
                      {prev.title}
                    </a>
                  </td>
                </tr>
              )}
              {next && (
                <tr>
                  <th scope="row">다음글</th>
                  <td className="td_l">
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); navigate(`/notice/${next.id}`); }}
                    >
                      {next.title}
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* prev/next end */}

          {/* btn start */}
          <div className="btn_area">
            <div className="right">
              <button className="btn" onClick={() => navigate('/notice')}>목록</button>
            </div>
          </div>
          {/* btn end */}
        </>
      )}
    </div>
  );
};

export default NoticeDetailPage;
