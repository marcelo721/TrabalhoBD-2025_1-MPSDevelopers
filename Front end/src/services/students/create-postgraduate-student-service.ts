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
  password: string
  username: string
}

export async function createPostgraduateStudentService({
  name,
  address,
  courseCode,
  advisorId,
  phones,
  password,
  username,
}: CreatePostgraduateStudentServiceRequest) {
  await api.post('/students/postgraduate', {
    name,
    address,
    courseCode,
    advisorId,
    phones,
    password,
    login: username,
  })
}
