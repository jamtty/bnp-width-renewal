import apiClient from './axios'

export const VOICE_CATEGORY_MAP: Record<string, string> = {
  VC01000000: '칭찬 및 감사',
  VC02000000: '불편',
  VC03000000: '제안 및 건의',
  VC04000000: '기타',
}

export interface VoiceListParams {
  page?: number
  size?: number
  keyword?: string
  type?: string
  date_from?: string
  date_to?: string
}

export interface VoiceItem {
  id: number
  category: string
  title: string
  name: string
  view_count: number
  status: string
  date: string
}

export interface VoiceFile {
  id: number
  ori_name: string
  save_name: string
  file_url: string
  file_size: number
  file_ext: string
}

export interface VoiceDetail extends VoiceItem {
  content: string
  phone: string
  reply: string | null
  reply_name: string | null
  reply_date: string | null
  files: VoiceFile[]
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

export interface VoiceListResponse {
  items: VoiceItem[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export const fetchVoiceList = async (params: VoiceListParams = {}): Promise<VoiceListResponse> => {
  const { data } = await apiClient.get('/api/voice', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const fetchVoiceDetail = async (id: number): Promise<VoiceDetail> => {
  const { data } = await apiClient.get(`/api/voice/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export const deleteVoice = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/voice/${id}/delete`)
  if (!data.success) throw new Error(data.message)
}

export const userDeleteVoice = async (id: number, password: string): Promise<void> => {
  const { data } = await apiClient.post(`/api/voice/${id}/user-delete`, { password })
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}

export const updateVoice = async (
  id: number,
  payload: {
    password: string
    category: string
    title: string
    content: string
    name: string
    phone: string
    files?: File[]
  }
): Promise<void> => {
  const form = new FormData()
  form.append('password', payload.password)
  form.append('category', payload.category)
  form.append('title', payload.title)
  form.append('content', payload.content)
  form.append('name', payload.name)
  form.append('phone', payload.phone)
  if (payload.files) {
    payload.files.forEach((f) => form.append('files[]', f))
  }
  const { data } = await apiClient.post(`/api/voice/${id}/update`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

export const deleteVoiceFile = async (fileId: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/voice/file/${fileId}/delete`)
  if (!data.success) throw new Error(data.message)
}

export const replyVoice = async (id: number, content: string): Promise<void> => {
  const { data } = await apiClient.post(`/api/voice/${id}/reply`, { content })
  if (!data.success) throw new Error(data.message)
}

export interface VoiceCreatePayload {
  category: string
  title: string
  content: string
  name: string
  phone: string
  password: string
  files?: File[]
}

export const createVoice = async (payload: VoiceCreatePayload): Promise<{ id: number }> => {
  const form = new FormData()
  form.append('category', payload.category)
  form.append('title',    payload.title)
  form.append('content',  payload.content)
  form.append('name',     payload.name)
  form.append('phone',    payload.phone)
  form.append('password', payload.password)
  payload.files?.forEach((f) => form.append('files[]', f))

  const { data } = await apiClient.post('/api/voice', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data
}

export interface VoiceMyListParams {
  page?: number
  size?: number
  keyword?: string
  type?: string
}

export const fetchVoiceMyList = async (
  name: string,
  password: string,
  params: VoiceMyListParams = {},
): Promise<VoiceListResponse> => {
  const { data } = await apiClient.post('/api/voice/my-list', { name, password }, { params })
  if (!data.success) throw new Error(data.message || '조회에 실패했습니다.')
  return data.data
}
