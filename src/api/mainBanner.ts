import apiClient from './axios'

export interface MainBannerItem {
  id: number
  title: string
  img_web: string        // 저장 파일명 (web)
  img_mobile: string     // 저장 파일명 (mobile)
  img_url_web: string    // 절대 URL (web) - 서버에서 조합
  img_url_mobile: string // 절대 URL (mobile) - 없으면 web URL 폴백
  img_web_ori?: string   // 원본 파일명 (web)
  img_mobile_ori?: string // 원본 파일명 (mobile)
  display_yn: string     // Y/N
  sort_order: number | null
  created_by?: string
  created_at?: string
  updated_at?: string
}

export interface MainBannerListResponse {
  items: MainBannerItem[]
  total: number
  total_pages: number
  page: number
  size: number
}

// 공개용 (display_yn = Y 인 배너만)
export const fetchActiveBanners = async (): Promise<MainBannerItem[]> => {
  const { data } = await apiClient.get('/api/main-banner/active')
  if (!data.success) throw new Error(data.message || '배너를 불러오지 못했습니다.')
  return data.data
}

// 관리자 목록
export const fetchMainBannerList = async (params: {
  page?: number
  size?: number
  keyword?: string
  display_yn?: string
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

export const updateMainBannerDisplayYn = async (id: number, display_yn: 'Y' | 'N'): Promise<void> => {
  const { data } = await apiClient.post(`/api/main-banner/${id}/display`, { display_yn })
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
