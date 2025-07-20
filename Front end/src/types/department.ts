import type { CourseDepartment } from './course'
import type { TeacherDepartment } from './teacher'

export type Department = {
  name: string
  code: number
  teachers: TeacherDepartment[]
  courses: CourseDepartment[]
}

export type DepartmentCourse = Pick<Department, 'name' | 'code'>
