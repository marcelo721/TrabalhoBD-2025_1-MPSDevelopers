import { api } from '@/services/api'
import type { Employee } from '@/types/employee'

export async function findAllEmployeesService() {
  const { data } = await api.get<Employee[]>('/employees')

  return data
}
