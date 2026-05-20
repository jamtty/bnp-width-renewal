import apiClient from './axios'

// ── 진료과 그룹 구조 ────────────────────────────────────────────
// 진료과소개 / 클리닉소개 / 특수센터소개 하위 과목 전체
export const DEPT_GROUPS: Record<string, Array<{ code: string; name: string }>> = {
  '진료과소개': [
    { code: 'internal',             name: '내과' },
    { code: 'cardiology',           name: '심장내과' },
    { code: 'respiratory',          name: '호흡기내과' },
    { code: 'gastroenterology',     name: '소화기내과' },
    { code: 'nephrology',           name: '신장내과' },
    { code: 'rheumatology',         name: '류마티스내과' },
    { code: 'neurology',            name: '신경과' },
    { code: 'surgery',              name: '외과' },
    { code: 'obstetrics',           name: '산부인과' },
    { code: 'orthopedics',          name: '정형외과' },
    { code: 'urology',              name: '비뇨의학과' },
    { code: 'anesthesiology',       name: '마취통증의학과' },
    { code: 'labmedicine',          name: '진단검사의학과' },
    { code: 'radiology',            name: '영상의학과' },
    { code: 'emergency',            name: '응급의학과' },
    { code: 'criticalcare',         name: '중환자의학과' },
    { code: 'painclinic',           name: '신경통증클리닉' },
    { code: 'spine-center',         name: '척추센터' },
    { code: 'arthroplasty-center',  name: '인공관절센터' },
    { code: 'hpcenter',             name: '건강증진센터' },
  ],
  '클리닉소개': [
    { code: 'painclinic',    name: '신경통증클리닉' },
  ],
  '특수센터소개': [
    { code: 'spine-center',        name: '척추센터' },
    { code: 'arthroplasty-center', name: '인공관절센터' },
    { code: 'hpcenter',             name: '건강증진센터' },
  ],
}

// 코드 → 이름 플랫 맵
export const DEPT_CODE_MAP: Record<string, string> = Object.fromEntries(
  Object.values(DEPT_GROUPS).flatMap((depts) => depts.map(({ code, name }) => [code, name]))
)

export type ScheduleRow = {
  mon: string; tue: string; wed: string; thu: string; fri: string
  sat1: string; sat2: string; sat3: string; sat4: string; sat5: string
}

export interface ScheduleJson {
  am: ScheduleRow
  pm: ScheduleRow
}

export interface DoctorItem {
  id: number
  dept_code: string
  dept_codes: string[]
  doc_name: string
  doc_title: string | null
  doc_major: string | null
  doc_specialty: string | null
  doc_career: string | null
  career_label: string | null
  schedule_json: string | null   // JSON 문자열
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

export interface DoctorListResponse {
  items: DoctorItem[]
  total: number
  total_pages: number
  page: number
  size: number
}

// 관리자용 목록
export const fetchDoctorList = async (params: {
  page?: number
  size?: number
  dept_code?: string
  keyword?: string
  use_yn?: string
}): Promise<DoctorListResponse> => {
  const { data } = await apiClient.get('/api/doctor', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

// 진료과별 공개 목록 (일반 사용자용)
export const fetchDoctorsByDept = async (deptCode: string): Promise<DoctorItem[]> => {
  const { data } = await apiClient.get(`/api/doctor/by-dept/${deptCode}`)
  if (!data.success) throw new Error(data.message || '의료진 정보를 불러오지 못했습니다.')
  return data.data
}

export const fetchDoctorDetail = async (id: number): Promise<DoctorItem> => {
  const { data } = await apiClient.get(`/api/doctor/${id}`)
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

export const createDoctor = async (formData: FormData): Promise<{ id: number }> => {
  const { data } = await apiClient.post('/api/doctor', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '등록에 실패했습니다.')
  return data.data
}

export const updateDoctor = async (id: number, formData: FormData): Promise<void> => {
  const { data } = await apiClient.post(`/api/doctor/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

export const updateDoctorUseYn = async (id: number, useYn: 'Y' | 'N'): Promise<void> => {
  const formData = new FormData()
  formData.append('use_yn', useYn)
  const { data } = await apiClient.post(`/api/doctor/${id}/use`, formData)
  if (!data.success) throw new Error(data.message || '변경에 실패했습니다.')
}

export const updateDoctorSortOrder = async (id: number, sortOrder: number): Promise<void> => {
  const formData = new FormData()
  formData.append('sort_order', String(sortOrder))
  const { data } = await apiClient.post(`/api/doctor/${id}/sort`, formData)
  if (!data.success) throw new Error(data.message || '순서 변경에 실패했습니다.')
}

export const deleteDoctor = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/doctor/${id}/delete`)
  if (!data.success) throw new Error(data.message || '삭제에 실패했습니다.')
}

// 공개 의료진 전체 목록 (일반 사용자용, 활성 상태만)
export const fetchPublicDoctors = async (deptCode?: string): Promise<DoctorItem[]> => {
  // 백엔드 최대 허용 size=100. 전체 로드 및 진료과별 모두 100으로 요청해 누락 방지.
  const params: Record<string, string | number> = { use_yn: 'Y', size: 100 }
  if (deptCode) params.dept_code = deptCode
  const { data } = await apiClient.get('/api/doctor', { params })
  if (!data.success) throw new Error(data.message || '의료진 정보를 불러오지 못했습니다.')
  return (data.data as DoctorListResponse).items
}

// schedule_json 파싱 헬퍼
export const parseSchedule = (json: string | null | undefined): ScheduleJson | null => {
  if (!json) return null
  try {
    const parsed = JSON.parse(json) as Record<string, Record<string, string>>
    // 구버전(sat13, sat24) → 신버전(sat1~sat4) 마이그레이션
    const migrate = (row: Record<string, string>): ScheduleRow => ({
      mon:  row.mon  ?? '',
      tue:  row.tue  ?? '',
      wed:  row.wed  ?? '',
      thu:  row.thu  ?? '',
      fri:  row.fri  ?? '',
      sat1: row.sat1 ?? row.sat13 ?? '',
      sat2: row.sat2 ?? row.sat24 ?? '',
      sat3: row.sat3 ?? row.sat13 ?? '',
      sat4: row.sat4 ?? row.sat24 ?? '',
      sat5: row.sat5 ?? '',
    })
    return { am: migrate(parsed.am ?? {}), pm: migrate(parsed.pm ?? {}) }
  }
  catch { return null }
}

export const emptySchedule = (): ScheduleJson => ({
  am: { mon: '', tue: '', wed: '', thu: '', fri: '', sat1: '', sat2: '', sat3: '', sat4: '', sat5: '' },
  pm: { mon: '', tue: '', wed: '', thu: '', fri: '', sat1: '', sat2: '', sat3: '', sat4: '', sat5: '' },
})
