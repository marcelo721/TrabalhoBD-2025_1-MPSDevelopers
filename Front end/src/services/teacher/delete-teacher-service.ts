import { api } from '@/services/api'

export async function deleteTeacherService(id: string) {
  await api.delete(`/teachers/${id}`)
}
