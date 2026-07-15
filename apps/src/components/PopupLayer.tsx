import { useState, useEffect } from 'react'
import { fetchActivePopups, type PopupItem } from '@/api/popup'

const STORAGE_KEY = 'popup_closed'

function getClosedIds(): number[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    const parsed = JSON.parse(data)
    const now = Date.now()
    // 24시간 지난 항목 제거
    const valid = Object.entries(parsed)
      .filter(([, ts]) => (now - (ts as number)) < 24 * 60 * 60 * 1000)
      .reduce((acc, [id]) => { acc.push(Number(id)); return acc }, [] as number[])
    return valid
  } catch {
    return []
  }
}

function addClosedId(id: number) {
  const data = localStorage.getItem(STORAGE_KEY)
  const parsed = data ? JSON.parse(data) : {}
  parsed[id] = Date.now()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
}

export default function PopupLayer() {
  const [popups, setPopups] = useState<PopupItem[]>([])
  const [visibleIdx, setVisibleIdx] = useState(0)
  const [dontShowToday, setDontShowToday] = useState(false)

  useEffect(() => {
    fetchActivePopups()
      .then((items) => {
        const closed = getClosedIds()
        const filtered = items.filter((p) => !closed.includes(p.id))
        setPopups(filtered)
      })
      .catch(() => { /* 팝업 없음 */ })
  }, [])

  if (popups.length === 0) return null

  const current = popups[visibleIdx]
  if (!current) return null

  const handleClose = () => {
    if (dontShowToday) {
      addClosedId(current.id)
    }
    if (visibleIdx < popups.length - 1) {
      setVisibleIdx((prev) => prev + 1)
      setDontShowToday(false)
    } else {
      setPopups([])
    }
  }

  const handlePopupClick = () => {
    if (current.url) {
      window.open(current.url, current.link_target || '_self')
    }
  }

  return (
    <div className="popup_layer">
      <div className="popup_overlay" />
      <div className="popup_box" style={{
        width: current.img_width ? `${current.img_width}px` : 'auto',
        height: current.img_height ? `${current.img_height}px` : 'auto',
      }}>
        <div className="popup_content" onClick={handlePopupClick} style={{ cursor: current.url ? 'pointer' : 'default' }}>
          {current.img_url_full ? (
            <img src={current.img_url_full} alt={current.title} style={{ maxWidth: '100%', display: 'block' }} />
          ) : (
            <div className="popup_text">{current.title}</div>
          )}
        </div>
        <div className="popup_footer">
          <label className="popup_check">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
            />
            오늘 하루 동안 열지 않기
          </label>
          <div className="popup_actions">
            {popups.length > 1 && (
              <span className="popup_count">{visibleIdx + 1} / {popups.length}</span>
            )}
            <button type="button" className="popup_close_btn" onClick={handleClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  )
}
