import { api } from '../api'

type CreatePostgraduateStudentServiceRequest = {
  name: string
  address: string
  courseCode: number
  advisorId: number
  phones: {
    number: string
    description: string
  }[]
  admissionYear: string

  password: string
  username: string
}

export async function createPostgraduateStudentService({
  name,
  address,
  courseCode,
  advisorId,
  phones,
  admissionYear,
  password,
  username,
}: CreatePostgraduateStudentServiceRequest) {
  await api.post('/students/postgraduate', {
    name,
    address,
    courseCode,
    advisorId,
    phones,
    admissionYear,
    password,
    login: username,
  })
}
