import type { DepartmentCourse } from './department'
import type { StudentCourse } from './students'
import type { SubjectCourse } from './subjects'

export type Course = {
  name: string
  code: number
  minCredits: number
  students: StudentCourse[]
  subjects: SubjectCourse[]
  department: DepartmentCourse
}

export type CourseDepartment = Pick<Course, 'name' | 'code'>
