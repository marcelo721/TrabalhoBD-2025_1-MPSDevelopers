import type { Subject } from '@/types/subjects'
import { api } from '../api'

export async function findSubjectByCodeService(code: string) {
  const { data } = await api.get<Subject>(`/subjects/${code}`)

  return data
}
