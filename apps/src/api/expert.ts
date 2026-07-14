import apiClient from './axios'

const UPLOAD_BASE = (import.meta.env.VITE_UPLOAD_BASE_URL || '').replace(/\/$/, '')

function toAbsUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return UPLOAD_BASE + (url.startsWith('/') ? url : '/' + url)
}

function normalizeItem(item: ExpertItem): ExpertItem {
  return {
    ...item,
    expert_img_url: toAbsUrl(item.expert_img_url),
  }
}

export interface ExpertItem {
  expert_id: number
  expert_type: 'advisor' | 'coach'
  expert_name: string
  expert_tags: string
  expert_desc: string
  expert_career: string[]
  expert_img: string
  expert_img_org: string
  expert_img_url: string
  sort_order: number
  use_yn: 'Y' | 'N'
  del_yn: 'Y' | 'N'
  created_at: string
  updated_at: string
}

export interface ExpertListResponse {
  items: ExpertItem[]
  total: number
  total_pages: number
  page: number
  size: number
}

/** 공개용 목록 (use_yn=Y, del_yn=N) */
export const fetchExpertList = async (params: {
  page?: number
  size?: number
  type?: 'advisor' | 'coach' | ''
  keyword?: string
}): Promise<ExpertListResponse> => {
  const { data } = await apiClient.get('/api/expert', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  const res = data.data as ExpertListResponse
  return { ...res, items: res.items.map(normalizeItem) }
}

/** 관리자용 목록 (전체 조회) */
export const fetchExpertListAdmin = async (params: {
  page?: number
  size?: number
  type?: 'advisor' | 'coach' | ''
  keyword?: string
}): Promise<ExpertListResponse> => {
  const { data } = await apiClient.get('/api/expert', { params: { ...params, admin: '1' } })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  const res = data.data as ExpertListResponse
  return { ...res, items: res.items.map(normalizeItem) }
}

/** 상세 조회 */
export const fetchExpertDetail = async (id: number): Promise<ExpertItem> => {
  const { data } = await apiClient.get(`/api/expert/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return normalizeItem(data.data as ExpertItem)
}

/** 등록 */
export const createExpert = async (formData: FormData): Promise<{ expert_id: number }> => {
  const { data } = await apiClient.post('/api/expert', formData)
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data
}

/** 수정 */
export const updateExpert = async (id: number, formData: FormData): Promise<void> => {
  const { data } = await apiClient.post(`/api/expert/${id}`, formData)
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

/** 삭제 */
export const deleteExpert = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/expert/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}
