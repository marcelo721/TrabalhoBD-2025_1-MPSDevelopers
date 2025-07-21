import { api } from '@/services/api'
import type { Employee } from '@/types/employee'

type FindEmployeesByDepartmentCodeServiceRequest = {
  code: number
}

export async function findEmployeesByDepartmentCodeService({
  code,
}: FindEmployeesByDepartmentCodeServiceRequest) {
  const { data } = await api.get<Employee[]>(
    `/employees/department-employees/${code}`,
  )

  return data
}
