import { api } from '@/services/api'
import type { Teacher } from '@/types/teacher'

export async function findTeacherByCodeService(code: string | number) {
  const { data } = await api.get<Teacher>(`/teachers/${code}`)

  return data
}
