import { api } from '../api'

type CreateUndergraduateStudentServiceRequest = {
  name: string
  address: string
  courseCode: number
  phones: {
    number: string
    description: string
  }[]
  admissionYear: string
  password: string
  username: string
}

export async function createUndergraduateStudentService({
  name,
  address,
  courseCode,
  phones,
  admissionYear,
  password,
  username,
}: CreateUndergraduateStudentServiceRequest) {
  await api.post('/students/undergraduate', {
    name,
    address,
    courseCode,
    phones,
    admissionYear,
    password,
    login: username,
  })
}
