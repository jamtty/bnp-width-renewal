import apiClient from './axios'

// ─────────────────────────────────────────────────────────────
// 공통 타입
// ─────────────────────────────────────────────────────────────

export interface BoardListParams {
  page?: number
  size?: number
  keyword?: string
  type?: number // 0: 제목, 1: 내용, 그 외: 제목+내용
  date_from?: string
  date_to?: string
  is_pinned?: string // '' | '0' | '1'
}

interface BoardListMeta {
  total: number
  page: number
  per_page: number
  total_pages: number
}

// ─────────────────────────────────────────────────────────────
// 보도자료 (BMT_IDX = 2)
// ─────────────────────────────────────────────────────────────

export interface PressItem {
  id: number
  title: string
  author_name: string
  created_at: string
  view_count: number
  is_pinned: number
  press_name: string | null   // BD_FIELD_1 언론사명
  external_url: string | null // BD_FIELD_2 원문 링크
}

export interface PressDetail extends PressItem {
  content: string
  author_id: string
  updated_at: string | null
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

export interface PressListResponse extends BoardListMeta {
  items: PressItem[]
}

export const fetchPressList = async (
  params: BoardListParams = {},
): Promise<PressListResponse> => {
  const { data } = await apiClient.get('/api/press', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const fetchPressDetail = async (id: number): Promise<PressDetail> => {
  const { data } = await apiClient.get(`/api/press/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export const createPress = async (payload: {
  title: string
  content?: string
  is_pinned?: boolean
  press_name?: string
  external_url?: string
}): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/press', {
    ...payload,
    is_pinned: payload.is_pinned ? '1' : '0',
  })
  if (!data.success) throw new Error(data.message || '저장에 실패했습니다.')
  return data.data
}

export const updatePress = async (
  id: number,
  payload: {
    title: string
    content?: string
    is_pinned?: boolean
    press_name?: string
    external_url?: string
  },
): Promise<void> => {
  const { data } = await apiClient.put(`/api/press/${id}`, {
    ...payload,
    is_pinned: payload.is_pinned ? '1' : '0',
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

export const deletePress = async (id: number): Promise<void> => {
  const { data } = await apiClient.delete(`/api/press/${id}`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}

export const togglePressPin = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/press/${id}/pin`)
  if (!data.success) throw new Error(data.message)
}

/**
 * 외부 URL의 og:image를 백엔드 프록시를 통해 가져옵니다.
 * 이미지가 없으면 null을 반환합니다.
 * 세션 내 중복 요청을 방지하기 위해 결과를 메모리 캐시합니다.
 */
const _ogImageCache = new Map<string, string | null>()
export const fetchOgImage = async (url: string): Promise<string | null> => {
  if (_ogImageCache.has(url)) return _ogImageCache.get(url)!
  try {
    const { data } = await apiClient.get('/api/og-image', { params: { url } })
    const result = data?.data?.image_url ?? null
    _ogImageCache.set(url, result)
    return result
  } catch {
    _ogImageCache.set(url, null)
    return null
  }
}

// ─────────────────────────────────────────────────────────────
// 채용정보 (BMT_IDX = 5)
// ─────────────────────────────────────────────────────────────

export interface RecruitItem {
  id: number
  title: string
  author_name: string
  created_at: string
  view_count: number
  is_pinned: number
  period_start: string | null // BD_FIELD_2 접수시작일
  period_end: string | null   // BD_FIELD_3 접수종료일
}

export interface RecruitDetail extends RecruitItem {
  content: string
  author_id: string
  updated_at: string | null
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

export interface RecruitListResponse extends BoardListMeta {
  items: RecruitItem[]
}

export const fetchRecruitList = async (
  params: BoardListParams = {},
): Promise<RecruitListResponse> => {
  const { data } = await apiClient.get('/api/recruit', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const fetchRecruitDetail = async (id: number): Promise<RecruitDetail> => {
  const { data } = await apiClient.get(`/api/recruit/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export const createRecruit = async (payload: {
  title: string
  content?: string
  is_pinned?: boolean
  period_start?: string
  period_end?: string
}): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/recruit', {
    ...payload,
    is_pinned: payload.is_pinned ? '1' : '0',
  })
  if (!data.success) throw new Error(data.message || '저장에 실패했습니다.')
  return data.data
}

export const updateRecruit = async (
  id: number,
  payload: {
    title: string
    content?: string
    is_pinned?: boolean
    period_start?: string
    period_end?: string
  },
): Promise<void> => {
  const { data } = await apiClient.put(`/api/recruit/${id}`, {
    ...payload,
    is_pinned: payload.is_pinned ? '1' : '0',
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

export const deleteRecruit = async (id: number): Promise<void> => {
  const { data } = await apiClient.delete(`/api/recruit/${id}`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}

export const toggleRecruitPin = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/recruit/${id}/pin`)
  if (!data.success) throw new Error(data.message)
}

// ─────────────────────────────────────────────────────────────
// 건강정보 (BMT_IDX = 6)
// ─────────────────────────────────────────────────────────────

export interface HealthInfoItem {
  id: number
  title: string
  author_name: string
  created_at: string
  view_count: number
  is_pinned: number
  content: string | null
  thumbnail: string | null
}

export interface HealthInfoDetail extends HealthInfoItem {
  author_id: string
  updated_at: string | null
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

export interface HealthInfoListResponse extends BoardListMeta {
  items: HealthInfoItem[]
}

export const fetchHealthInfoList = async (
  params: BoardListParams = {},
): Promise<HealthInfoListResponse> => {
  const { data } = await apiClient.get('/api/health-info', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const fetchHealthInfoDetail = async (id: number): Promise<HealthInfoDetail> => {
  const { data } = await apiClient.get(`/api/health-info/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export const createHealthInfo = async (payload: {
  title: string
  content?: string
  is_pinned?: boolean
}): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/health-info', {
    ...payload,
    is_pinned: payload.is_pinned ? '1' : '0',
  })
  if (!data.success) throw new Error(data.message || '저장에 실패했습니다.')
  return data.data
}

export const updateHealthInfo = async (
  id: number,
  payload: {
    title: string
    content?: string
    is_pinned?: boolean
  },
): Promise<void> => {
  const { data } = await apiClient.put(`/api/health-info/${id}`, {
    ...payload,
    is_pinned: payload.is_pinned ? '1' : '0',
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

export const deleteHealthInfo = async (id: number): Promise<void> => {
  const { data } = await apiClient.delete(`/api/health-info/${id}`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}

export const toggleHealthInfoPin = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/health-info/${id}/pin`)
  if (!data.success) throw new Error(data.message)
}

// ─────────────────────────────────────────────────────────────
// 메디TV (BMT_IDX = 8)
// ─────────────────────────────────────────────────────────────

export interface MediTvItem {
  id: number
  title: string
  author_name: string
  created_at: string
  view_count: number
  is_pinned: number
  content: string | null
  youtube_url: string | null
  thumbnail: string | null
}

export interface MediTvDetail extends MediTvItem {
  author_id: string
  updated_at: string | null
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

export interface MediTvListResponse extends BoardListMeta {
  items: MediTvItem[]
}

export const fetchMediTvList = async (
  params: BoardListParams = {},
): Promise<MediTvListResponse> => {
  const { data } = await apiClient.get('/api/medi-tv', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

export const fetchMediTvDetail = async (id: number): Promise<MediTvDetail> => {
  const { data } = await apiClient.get(`/api/medi-tv/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export const createMediTv = async (payload: {
  title: string
  content?: string
  is_pinned?: boolean
  youtube_url: string
}): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/medi-tv', {
    ...payload,
    is_pinned: payload.is_pinned ? '1' : '0',
  })
  if (!data.success) throw new Error(data.message || '저장에 실패했습니다.')
  return data.data
}

export const updateMediTv = async (
  id: number,
  payload: {
    title: string
    content?: string
    is_pinned?: boolean
    youtube_url: string
  },
): Promise<void> => {
  const { data } = await apiClient.put(`/api/medi-tv/${id}`, {
    ...payload,
    is_pinned: payload.is_pinned ? '1' : '0',
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

export const deleteMediTv = async (id: number): Promise<void> => {
  const { data } = await apiClient.delete(`/api/medi-tv/${id}`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}

export const toggleMediTvPin = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/medi-tv/${id}/pin`)
  if (!data.success) throw new Error(data.message)
}
