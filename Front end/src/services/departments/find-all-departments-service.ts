import { api } from '@/services/api'
import type { Department } from '@/types/department'

export async function findAllDepartmentsService() {
  const { data } = await api.get<Department[]>('/departments')

  return data
}
