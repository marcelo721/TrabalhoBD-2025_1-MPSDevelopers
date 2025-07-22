import type { Enrollment } from '@/types/enrollment'
import { api } from '../api'

type FindAllEnrollmentsBySubjectIdAndTeacherIdServiceProps = {
  subjectId: number
  teacherId: number
}

export async function findAllEnrollmentsBySubjectIdAndTeacherIdService({
  subjectId,
  teacherId,
}: FindAllEnrollmentsBySubjectIdAndTeacherIdServiceProps) {
  const { data } = await api.get<Enrollment[]>(
    `/enrollments/teachers-enrollments/${teacherId}/${subjectId}`,
  )

  return data
}
