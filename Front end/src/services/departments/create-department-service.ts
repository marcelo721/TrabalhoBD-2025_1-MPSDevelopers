import { api } from '@/services/api'

type CreateDepartmentServiceRequest = {
  name: string
}

export async function createDepartmentService({
  name,
}: CreateDepartmentServiceRequest) {
  await api.post('/departments', { name })
}
