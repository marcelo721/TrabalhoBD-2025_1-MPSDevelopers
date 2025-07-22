import { api } from '@/services/api'
import type { Employee } from '@/types/employee'

export async function findEmployeesByDepartmentCodeService(
  code: number | string,
) {
  const { data } = await api.get<Employee[]>(
    `/employees/department-employees/${code}`,
  )

  return data
}
