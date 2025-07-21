import { api } from '@/services/api'

type CreateEmployeeInDepartmentFormData = {
  name: string
  idDepartment: number
  password: string
  username: string
}

export async function createEmployeeService({
  idDepartment,
  name,
  password,
  username,
}: CreateEmployeeInDepartmentFormData) {
  const { data } = await api.post('/employees', {
    idDepartment,
    name,
    password,
    login: username,
  })

  return data
}
