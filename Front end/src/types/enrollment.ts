import type { StudentCourse } from './students'
import type { SubjectCourse } from './subjects'

export type EnrollmentType = 'IN_PROGRESS' | 'FINISHED'

export type Enrollment = {
  code: number
  student: StudentCourse
  subject: SubjectCourse
  finalGrade: number | null
  attendance: number | null
  statusEnrollment: EnrollmentType
}
