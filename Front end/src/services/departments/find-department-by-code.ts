import { api } from '@/services/api'
import type { Department } from '@/types/department'

type FindDepartmentByCodeResquest = {
  code: number
}

export async function findDepartmentByCode({
  code,
}: FindDepartmentByCodeResquest) {
  const { data } = await api.get<Department>(`/departments/${code}`)

  return data
}
