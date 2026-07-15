import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import {
  fetchPopupList,
  deletePopup,
  updatePopupUseYn,
  type PopupItem,
} from '@/api/popup'

const PAGE_SIZE = 15

export default function AdminPopupPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<PopupItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [inputKeyword, setInputKeyword] = useState('')
  const [keyword, setKeyword] = useState('')
  const [useYnFilter, setUseYnFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (p: number, kw: string, uy: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchPopupList({ page: p, size: PAGE_SIZE, keyword: kw || undefined, use_yn: uy || undefined })
      setItems(res.items)
      setTotal(res.total)
      setTotalPages(res.total_pages)
      setCheckedIds([])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '목록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(page, keyword, useYnFilter) }, [load, page, keyword, useYnFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setKeyword(inputKeyword)
  }

  const handleReset = () => {
    setInputKeyword('')
    setKeyword('')
    setUseYnFilter('')
    setPage(1)
  }

  const allChecked = items.length > 0 && items.every((item) => checkedIds.includes(item.id))
  const handleCheckAll = () => setCheckedIds(allChecked ? [] : items.map((i) => i.id))
  const handleCheckOne = (id: number) =>
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" 팝업을 삭제하시겠습니까?`)) return
    try {
      await deletePopup(id)
      load(page, keyword, useYnFilter)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.')
    }
  }

  const handleBulkDelete = async () => {
    if (checkedIds.length === 0) return
    if (!confirm(`선택한 ${checkedIds.length}건을 삭제하시겠습니까?`)) return
    try {
      await Promise.all(checkedIds.map((id) => deletePopup(id)))
      load(page, keyword, useYnFilter)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.')
    }
  }

  const handleToggleUse = async (item: PopupItem) => {
    const next = item.use_yn === 'Y' ? 'N' : 'Y'
    try {
      await updatePopupUseYn(item.id, next)
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, use_yn: next } : i)))
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '변경에 실패했습니다.')
    }
  }

  return (
    <div className="adm_wrap">
      <AdminSidebar />
      <div className="adm_content">
        <AdminHeader pageTitle="팝업 관리" />
        <main className="adm_main">
          <section className="adm_section">
            <div className="adm_toolbar">
              <form className="adm_search_form" onSubmit={handleSearch}>
                <div className="adm_search_row">
                  <label className="adm_search_label">사용여부</label>
                  <select
                    className="adm_search_select"
                    value={useYnFilter}
                    onChange={(e) => { setUseYnFilter(e.target.value); setPage(1) }}
                  >
                    <option value="">전체</option>
                    <option value="Y">사용</option>
                    <option value="N">미사용</option>
                  </select>
                  <label className="adm_search_label">제목</label>
                  <input
                    type="text"
                    className="adm_search_keyword"
                    placeholder="팝업 제목 검색"
                    value={inputKeyword}
                    onChange={(e) => setInputKeyword(e.target.value)}
                  />
                  <button type="submit" className="adm_btn adm_btn_sm">검색</button>
                  <button type="button" className="adm_btn adm_btn_sm adm_btn_secondary" onClick={handleReset}>초기화</button>
                </div>
              </form>
            </div>

            <div className="adm_list_header">
              <span className="adm_total">
                총 <strong>{total.toLocaleString()}</strong>건
              </span>
              <div className="adm_list_actions">
                <button type="button" className="adm_btn adm_btn_sm adm_btn_danger" onClick={handleBulkDelete} disabled={checkedIds.length === 0}>
                  선택삭제 ({checkedIds.length})
                </button>
                <button type="button" className="adm_btn adm_btn_sm adm_btn_primary" onClick={() => navigate('/admin/popup/write')}>
                  팝업 등록
                </button>
              </div>
            </div>

            {error && <p className="adm_error">{error}</p>}

            <table className="adm_table">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>
                    <input type="checkbox" checked={allChecked} onChange={handleCheckAll} />
                  </th>
                  <th style={{ width: 60 }}>번호</th>
                  <th>제목</th>
                  <th style={{ width: 120 }}>게시기간</th>
                  <th style={{ width: 80 }}>사용여부</th>
                  <th style={{ width: 80 }}>순서</th>
                  <th style={{ width: 150 }}>등록일</th>
                  <th style={{ width: 150 }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="adm_empty">불러오는 중...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={8} className="adm_empty">등록된 팝업이 없습니다.</td></tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id}>
                      <td>
                        <input type="checkbox" checked={checkedIds.includes(item.id)} onChange={() => handleCheckOne(item.id)} />
                      </td>
                      <td>{total - ((page - 1) * PAGE_SIZE) - idx}</td>
                      <td className="adm_td_title">{item.title}</td>
                      <td>
                        {item.period_start || item.period_end
                          ? `${item.period_start || ''} ~ ${item.period_end || ''}`
                          : '상시'}
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`adm_toggle_btn ${item.use_yn === 'Y' ? 'on' : ''}`}
                          onClick={() => handleToggleUse(item)}
                        >
                          {item.use_yn === 'Y' ? '사용' : '미사용'}
                        </button>
                      </td>
                      <td>{item.sort_order ?? '-'}</td>
                      <td>{item.created_at?.split(' ')[0] ?? '-'}</td>
                      <td className="adm_td_actions">
                        <button type="button" className="adm_btn adm_btn_xs" onClick={() => navigate(`/admin/popup/edit/${item.id}`)}>수정</button>
                        <button type="button" className="adm_btn adm_btn_xs adm_btn_danger" onClick={() => handleDelete(item.id, item.title)}>삭제</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="adm_pagination">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>이전</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} className={p === page ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>다음</button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
