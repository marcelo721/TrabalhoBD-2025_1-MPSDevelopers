import type { Enrollment } from '@/types/enrollment'
import { api } from '../api'

export async function findEnrollmentsByStudentCodeService(code: number) {
  const { data } = await api.get<Enrollment[]>(
    `/enrollments/students-enrollments/${code}`,
  )
  return data
}
