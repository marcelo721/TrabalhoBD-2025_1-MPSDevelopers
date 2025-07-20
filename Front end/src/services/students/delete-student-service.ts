import { api } from '../api'

export async function deleteStudentService(code: string) {
  await api.delete(`/students/${code}`)
}
