import { api } from '../api'

export async function deleteEmployeeService(employeeId: number) {
  await api.delete(`/employees/${employeeId}`)
}
