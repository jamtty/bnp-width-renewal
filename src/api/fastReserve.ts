import apiClient from './axios'

export interface FastReserveItem {
  id: number
  name: string
  phone: string
  pri_yn: string
  succ_yn: string | null
  created_at: string
}

export interface FastReserveListResponse {
  items: FastReserveItem[]
  total: number
  total_pages: number
  page: number
  size: number
}

export const createFastReserve = async (payload: {
  name: string
  phone: string
  pri_yn: 'Y' | 'N'
}): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/fast-reserve', payload)
  if (!data.success) throw new Error(data.message || '신청에 실패했습니다.')
  return data.data
}

export const fetchFastReserveList = async (params: {
  page?: number
  size?: number
  keyword?: string
  search_type?: string
  date_from?: string
  date_to?: string
}): Promise<FastReserveListResponse> => {
  const { data } = await apiClient.get('/api/fast-reserve', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const updateFastReserveSucc = async (id: number, succ_yn: 'Y' | 'N'): Promise<void> => {
  const { data } = await apiClient.post(`/api/fast-reserve/${id}/succ`, { succ_yn })
  if (!data.success) throw new Error(data.message || '처리 변경에 실패했습니다.')
}

export const deleteFastReserve = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/fast-reserve/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}
