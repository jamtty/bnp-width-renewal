import apiClient from './axios'

const UPLOAD_BASE = (import.meta.env.VITE_UPLOAD_BASE_URL || '').replace(/\/$/, '')

function toAbsUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return UPLOAD_BASE + (url.startsWith('/') ? url : '/' + url)
}

function normalizeItem(item: PopupItem): PopupItem {
  return {
    ...item,
    img_url_full: toAbsUrl(item.img_url_full || item.img_url || ''),
  }
}

export interface PopupItem {
  id: number
  title: string
  url: string
  link_target: string
  period_start: string | null
  period_end: string | null
  use_yn: string
  sort_order: number | null
  img_ori_name: string
  img_save_name: string
  img_url: string
  img_url_full: string
  img_width: number
  img_height: number
  img_pos_left: number
  img_pos_top: number
  created_by?: string
  created_at?: string
  updated_at?: string
}

export interface PopupListResponse {
  items: PopupItem[]
  total: number
  total_pages: number
  page: number
  size: number
}

// 활성 팝업 목록 (use_yn = Y, 기간 내)
export const fetchActivePopups = async (): Promise<PopupItem[]> => {
  const { data } = await apiClient.get('/api/popup/active')
  if (!data.success) throw new Error(data.message || '팝업을 불러오지 못했습니다.')
  return (data.data as PopupItem[]).map(normalizeItem)
}

// 팝업 목록 조회
export const fetchPopupList = async (params: {
  page?: number
  size?: number
  keyword?: string
  use_yn?: string
}): Promise<PopupListResponse> => {
  const { data } = await apiClient.get('/api/popup', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  data.data.items = data.data.items.map(normalizeItem)
  return data.data as PopupListResponse
}

// 팝업 상세
export const fetchPopupDetail = async (id: number): Promise<PopupItem> => {
  const { data } = await apiClient.get(`/api/popup/${id}`)
  if (!data.success) throw new Error(data.message || '팝업을 불러오지 못했습니다.')
  return normalizeItem(data.data as PopupItem)
}

// 팝업 등록
export const createPopup = async (formData: FormData): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/popup', formData)
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data as { id: number }
}

// 팝업 수정
export const updatePopup = async (id: number, formData: FormData): Promise<void> => {
  const { data } = await apiClient.post(`/api/popup/${id}`, formData)
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

// 팝업 사용 여부 변경
export const updatePopupUseYn = async (id: number, use_yn: string): Promise<void> => {
  const { data } = await apiClient.post(`/api/popup/${id}/display`, { use_yn })
  if (!data.success) throw new Error(data.message || '변경에 실패했습니다.')
}

// 팝업 삭제
export const deletePopup = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/popup/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}
