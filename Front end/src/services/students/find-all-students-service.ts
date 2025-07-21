import { api } from '@/services/api'
import type { Student } from '@/types/students'

export async function findAllStudentsService() {
  const { data } = await api.get<Student[]>('/students')

  return data
}
