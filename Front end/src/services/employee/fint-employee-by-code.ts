import type { Employee } from '@/types/employee'
import { api } from '../api'

export async function findEmployeeByCodeService(
  code: string | number,
): Promise<Employee> {
  const { data } = await api.get<Employee>(`/employees/${code}`)

  return data
}
