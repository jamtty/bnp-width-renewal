import apiClient from './axios'

export interface CertDocItem {
  id: number
  title: string
  ori_name: string
  save_name: string
  file_path?: string
  file_size: number
  file_ext: string
  file_url: string
  sort_order: number
  use_yn: string
  created_by?: string
  created_at?: string
  updated_by?: string
  updated_at?: string
}

/** 공개용: 활성 파일 목록 */
export const fetchCertDocList = async (): Promise<CertDocItem[]> => {
  try {
    const { data } = await apiClient.get('/api/cert-doc')
    if (!data.success) return []
    return data.data
  } catch {
    return []
  }
}

/** 관리자용: 전체 목록 */
export const fetchCertDocAdminList = async (): Promise<CertDocItem[]> => {
  const { data } = await apiClient.get('/api/cert-doc/admin')
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

/** 관리자용: 단건 조회 */
export const fetchCertDocDetail = async (id: number): Promise<CertDocItem> => {
  const { data } = await apiClient.get(`/api/cert-doc/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

/** 관리자용: 생성 */
export const createCertDoc = async (formData: FormData): Promise<number> => {
  const { data } = await apiClient.post('/api/cert-doc', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  })
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data.id
}

/** 관리자용: 수정 */
export const updateCertDoc = async (id: number, formData: FormData): Promise<void> => {
  const { data } = await apiClient.post(`/api/cert-doc/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

/** 관리자용: 삭제 */
export const deleteCertDoc = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/cert-doc/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}

/** 관리자용: 첨부 파일만 삭제 */
export const clearCertDocFile = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/cert-doc/${id}/clear`)
  if (!data.success) throw new Error(data.message || '파일 삭제에 실패했습니다.')
}
