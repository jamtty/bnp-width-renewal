import apiClient from './axios'

export interface MainBannerItem {
  id: number
  url: string
  link_target: string
  use_yn: string
  sort_order: number
  img_ori_name?: string
  img_save_name?: string
  img_url?: string
  created_by?: string
  created_at?: string
  updated_by?: string
  updated_at?: string
}

export interface MainBannerListResponse {
  items: MainBannerItem[]
  total: number
  total_pages: number
  page: number
  size: number
}

// 공개용 (활성 배너만)
export const fetchActiveBanners = async (): Promise<MainBannerItem[]> => {
  const { data } = await apiClient.get('/api/main-banner/active')
  if (!data.success) throw new Error(data.message || '배너를 불러오지 못했습니다.')
  return data.data
}

// 관리자용 목록
export const fetchMainBannerList = async (params: {
  page?: number
  size?: number
  keyword?: string
  use_yn?: string
}): Promise<MainBannerListResponse> => {
  const { data } = await apiClient.get('/api/main-banner', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const fetchMainBannerDetail = async (id: number): Promise<MainBannerItem> => {
  const { data } = await apiClient.get(`/api/main-banner/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export const createMainBanner = async (formData: FormData): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/main-banner', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data
}

export const updateMainBanner = async (id: number, formData: FormData): Promise<void> => {
  const { data } = await apiClient.post(`/api/main-banner/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

export const updateMainBannerUseYn = async (id: number, use_yn: 'Y' | 'N'): Promise<void> => {
  const { data } = await apiClient.post(`/api/main-banner/${id}/use`, { use_yn })
  if (!data.success) throw new Error(data.message || '변경에 실패했습니다.')
}

export const updateMainBannerSortOrder = async (id: number, sort_order: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/main-banner/${id}/sort`, { sort_order })
  if (!data.success) throw new Error(data.message || '순서 변경에 실패했습니다.')
}

export const deleteMainBanner = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/main-banner/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}
