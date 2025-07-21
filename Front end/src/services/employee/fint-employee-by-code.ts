import type { Employee } from '@/types/employee'
import { api } from '../api'

export async function findEmployeeByCodeService({ code }: { code: number }) {
  const { data } = await api.get<Employee>(`/employees/${code}`)

  return data
}
