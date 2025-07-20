import { api } from '@/services/api'

type CreateTeacherServiceRequest = {
  name: string
  username: string
  emails: string[]
  password: string
  birthDate: string
  hireDate: string
  cpf: string
  phones: string[]
  departmentId: number
}

export async function createTeacherService({
  name,
  emails,
  birthDate,
  hireDate,
  cpf,
  phones,
  departmentId,
  password,
  username,
}: CreateTeacherServiceRequest) {
  const phonesNumbers = phones.map((phone) => ({
    number: phone,
  }))

  const { data } = await api.post('/teachers', {
    name,
    emails,
    birthDate,
    hireDate,
    cpf,
    phones: phonesNumbers,
    password,
    login: username,
    departmentId,
  })

  return data
}
