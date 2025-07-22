import type { Student } from '@/types/students'
import { api } from '../api'

export async function findStudentByCodeService(code: number | string) {
  const { data } = await api.get<Student>(`/students/${code}`)

  return data
}
