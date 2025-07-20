import { api } from '@/services/api'

export async function deleteDepartmentService(id: string) {
  await api.delete(`/departments/${id}`)
}
