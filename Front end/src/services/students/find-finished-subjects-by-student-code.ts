import { api } from '../api'

export async function findFinishedSubjectsByStudentCodeService(code: string) {
  const { data } = await api.get(`/students/${code}/enrollments/completed`)
  return data
}
