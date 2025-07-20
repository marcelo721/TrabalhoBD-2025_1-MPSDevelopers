import type { Phone } from './phone'

export type Student = {
  code: number
  name: string
  address: string
  admissionYear: string
  previousCourses: string[] | null
  advisorId: number | null
  advisorName: string | null
  courseName: string
  subjectsName: string[]
  phones: Phone[]
}

export type StudentCourse = Pick<Student, 'code' | 'name'>
