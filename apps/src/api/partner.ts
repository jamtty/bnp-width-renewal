import apiClient from './axios'

const UPLOAD_BASE = (import.meta.env.VITE_UPLOAD_BASE_URL || '').replace(/\/$/, '')

function toAbsUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return UPLOAD_BASE + (url.startsWith('/') ? url : '/' + url)
}

function normalizeItem(item: PartnerItem): PartnerItem {
  return {
    ...item,
    img_url_full: toAbsUrl(item.img_url_full || item.img_url || ''),
  }
}

export interface PartnerItem {
  id: number
  company_name: string
  img_ori_name: string
  img_save_name: string
  img_url: string
  img_url_full: string
  sort_order: number | null
  display_yn: string
  created_at?: string
  updated_at?: string
}

export interface PartnerListResponse {
  items: PartnerItem[]
  total: number
  total_pages: number
  page: number
  size: number
}

// 활성 파트너 목록 (프론트 노출용)
export const fetchActivePartners = async (): Promise<PartnerItem[]> => {
  const { data } = await apiClient.get('/api/partner/active')
  if (!data.success) throw new Error(data.message || '파트너 목록을 불러오지 못했습니다.')
  return (data.data as PartnerItem[]).map(normalizeItem)
}

// 파트너 목록 조회 (관리자)
export const fetchPartnerList = async (params: {
  page?: number
  size?: number
  keyword?: string
  display_yn?: string
}): Promise<PartnerListResponse> => {
  const { data } = await apiClient.get('/api/partner', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  data.data.items = data.data.items.map(normalizeItem)
  return data.data as PartnerListResponse
}

// 파트너 상세
export const fetchPartnerDetail = async (id: number): Promise<PartnerItem> => {
  const { data } = await apiClient.get(`/api/partner/${id}`)
  if (!data.success) throw new Error(data.message || '파트너 정보를 불러오지 못했습니다.')
  return normalizeItem(data.data as PartnerItem)
}

// 파트너 등록
export const createPartner = async (formData: FormData): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/partner', formData)
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data as { id: number }
}

// 파트너 수정
export const updatePartner = async (id: number, formData: FormData): Promise<void> => {
  const { data } = await apiClient.post(`/api/partner/${id}`, formData)
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

// 파트너 노출 여부 변경
export const updatePartnerDisplayYn = async (id: number, display_yn: string): Promise<void> => {
  const { data } = await apiClient.post(`/api/partner/${id}/display`, { display_yn })
  if (!data.success) throw new Error(data.message || '변경에 실패했습니다.')
}

// 파트너 삭제
export const deletePartner = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/partner/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}
