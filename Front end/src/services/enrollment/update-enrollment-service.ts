import { api } from '../api'

type UpdateEnrollmentServiceRequest = {
  enrollmentId: number
  finalGrade: number
  attendance: number
}

export async function updateEnrollmentService({
  enrollmentId,
  finalGrade,
  attendance,
}: UpdateEnrollmentServiceRequest) {
  await api.put(`/enrollments/update-enrollment/${enrollmentId}`, {
    finalGrade,
    attendance,
  })
}
