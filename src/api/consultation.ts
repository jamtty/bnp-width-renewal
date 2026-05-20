import apiClient from './axios'

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface ConsultationListParams {
  page?: number
  size?: number
  keyword?: string
  type?: string  // '' | 'A.AD_TITLE' | 'A.AD_CONT' | 'A.AD_NAME'
  date_from?: string
  date_to?: string
}

export interface ConsultationItem {
  id: number
  jb_cd: string | null
  title: string
  name: string
  is_secret: 'Y' | 'N'
  view_count: number
  status: '답변완료' | '답변대기'
  date: string
}

export interface ConsultationFile {
  id: number
  ori_name: string
  save_name: string
  file_url: string
  file_size: number
  file_ext: string
}

export interface ConsultationDetail extends ConsultationItem {
  content: string
  phone: string
  email: string | null
  reply: string | null
  reply_name: string | null
  reply_date: string | null
  files: ConsultationFile[]
  locked?: boolean
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

export interface ConsultationListResponse {
  items: ConsultationItem[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// ─────────────────────────────────────────────────────────────
// API Functions
// ─────────────────────────────────────────────────────────────

export const fetchConsultationList = async (
  params: ConsultationListParams = {},
): Promise<ConsultationListResponse> => {
  const { data } = await apiClient.get('/api/consultation', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const fetchConsultationDetail = async (
  id: number,
  password?: string,
): Promise<ConsultationDetail> => {
  const params = password ? { password } : {}
  const { data } = await apiClient.get(`/api/consultation/${id}`, { params })
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export interface ConsultationCreatePayload {
  jb_cd: string
  title: string
  content: string
  name: string
  phone: string
  email?: string
  password?: string
  is_secret: 'Y' | 'N'
  files?: File[]
}

export const createConsultation = async (
  payload: ConsultationCreatePayload,
): Promise<{ id: number }> => {
  const form = new FormData()
  form.append('jb_cd',     payload.jb_cd)
  form.append('title',     payload.title)
  form.append('content',   payload.content)
  form.append('name',      payload.name)
  form.append('phone',     payload.phone)
  form.append('email',     payload.email ?? '')
  form.append('password',  payload.password ?? '')
  form.append('is_secret', payload.is_secret)
  payload.files?.forEach((f) => form.append('files[]', f))

  const { data } = await apiClient.post('/api/consultation', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data
}

export const verifyConsultationPassword = async (
  id: number,
  password: string,
): Promise<boolean> => {
  try {
    const { data } = await apiClient.post(`/api/consultation/${id}/verify`, { password })
    return data.success && data.data?.verified === true
  } catch {
    return false
  }
}

export const deleteConsultation = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/consultation/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}

export const deleteConsultationFile = async (fileId: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/consultation/file/${fileId}/delete`)
  if (!data.success) throw new Error(data.message || '파일 삭제에 실패했습니다.')
}

export const replyConsultation = async (id: number, content: string): Promise<void> => {
  const { data } = await apiClient.post(`/api/consultation/${id}/reply`, { content })
  if (!data.success) throw new Error(data.message || '답변 등록에 실패했습니다.')
}
