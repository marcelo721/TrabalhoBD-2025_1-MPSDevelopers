import { api } from '@/services/api'

type CreateCourseServiceRequest = {
  name: string
  minCredits: number
  departmentId: number
}

export async function createCourseService({
  name,
  minCredits,
  departmentId,
}: CreateCourseServiceRequest) {
  const { data } = await api.post('/courses', {
    name,
    minCredits,
    departmentId,
  })

  return data
}
