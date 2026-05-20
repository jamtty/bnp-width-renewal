import apiClient from './axios'

export const POPUP_SITE_MAP: Record<string, string> = {
  MAIN: '메인',
  FUNE: '장례식장',
  WELL: '건강증진센터',
}

export interface PopupBannerItem {
  id: number
  site: string
  admin_title: string
  url: string
  link_target: string
  period_start: string | null
  period_end: string | null
  author: string
  use_yn: string
  img_width: number
  img_height: number
  img_pos_left: number
  img_pos_top: number
  sort_order: number
  img_ori_name: string
  img_save_name: string
  img_url: string
  created_by: string
  created_at: string
  updated_by?: string
  updated_at?: string
}

export interface PopupBannerListResponse {
  items: PopupBannerItem[]
  total: number
  total_pages: number
  page: number
  size: number
}

export const fetchPopupBannerList = async (params: {
  page?: number
  size?: number
  site?: string
  keyword?: string
  date_from?: string
  date_to?: string
}): Promise<PopupBannerListResponse> => {
  const { data } = await apiClient.get('/api/popup-banner', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const fetchPopupBannerDetail = async (id: number): Promise<PopupBannerItem> => {
  const { data } = await apiClient.get(`/api/popup-banner/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export const createPopupBanner = async (formData: FormData): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/popup-banner', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data
}

export const updatePopupBanner = async (id: number, formData: FormData): Promise<void> => {
  const { data } = await apiClient.post(`/api/popup-banner/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

export const updatePopupBannerUseYn = async (id: number, use_yn: 'Y' | 'N'): Promise<void> => {
  const { data } = await apiClient.post(`/api/popup-banner/${id}/use`, { use_yn })
  if (!data.success) throw new Error(data.message || '변경에 실패했습니다.')
}

export const updatePopupBannerSortOrder = async (id: number, sort_order: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/popup-banner/${id}/sort`, { sort_order })
  if (!data.success) throw new Error(data.message || '순서 변경에 실패했습니다.')
}

export const deletePopupBanner = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/popup-banner/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}
