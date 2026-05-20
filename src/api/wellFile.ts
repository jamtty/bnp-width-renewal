import apiClient from './axios'

export interface WellFileItem {
  id: number
  menu_key: string
  label: string
  ori_name: string
  save_name: string
  file_path: string
  file_size: number
  file_ext: string
  file_url: string
  use_yn: string
  created_by?: string
  created_at?: string
  updated_by?: string
  updated_at?: string
}

/** 공개용: 메뉴 키로 파일 정보 조회 */
export const fetchWellFileByKey = async (menuKey: string): Promise<WellFileItem | null> => {
  try {
    const { data } = await apiClient.get(`/api/well-file/by-key/${menuKey}`)
    if (!data.success) return null
    return data.data
  } catch {
    return null
  }
}

/** 관리자용: 전체 목록 */
export const fetchWellFileList = async (): Promise<WellFileItem[]> => {
  const { data } = await apiClient.get('/api/well-file')
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

/** 관리자용: 단건 조회 */
export const fetchWellFileDetail = async (id: number): Promise<WellFileItem> => {
  const { data } = await apiClient.get(`/api/well-file/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

/** 관리자용: 수정 (label, use_yn, 파일 교체) */
export const updateWellFile = async (id: number, formData: FormData): Promise<void> => {
  const { data } = await apiClient.post(`/api/well-file/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

/** 관리자용: 첨부 파일 삭제 */
export const clearWellFile = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/well-file/${id}/clear`)
  if (!data.success) throw new Error(data.message || '파일 삭제에 실패했습니다.')
}
