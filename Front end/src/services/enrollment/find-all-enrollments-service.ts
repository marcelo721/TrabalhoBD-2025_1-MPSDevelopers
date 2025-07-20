import type { Enrollment } from '@/types/enrollment'
import { api } from '../api'

export async function findAllEnrollmentService() {
  const { data } = await api.get<Enrollment[]>('/enrollments')

  return data
}
