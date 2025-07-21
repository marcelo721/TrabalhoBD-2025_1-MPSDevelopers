import { api } from '../api'

type CreateEnrollmentServiceProps = {
  studentId: number
  subjectId: number
}

export async function createEnrollmentService({
  studentId,
  subjectId,
}: CreateEnrollmentServiceProps) {
  await api.post('/enrollments', {
    studentId,
    subjectId,
  })
}
