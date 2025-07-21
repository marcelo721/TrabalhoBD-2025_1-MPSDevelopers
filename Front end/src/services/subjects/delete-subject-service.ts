import { api } from '../api'

export async function deleteSubjectService(code: string) {
  await api.delete(`/subjects/${code}`)
}
