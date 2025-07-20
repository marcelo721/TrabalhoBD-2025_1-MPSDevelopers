import type { CourseDepartment } from './course'
import type { TeacherDepartment } from './teacher'

export type SubjectType = 'OBLIGATORY' | 'OPTIONAL'

export type SubjectBasic = {
  code: number
  name: string
  credits: number
  syllabus: string
  course: CourseDepartment
  typeSubject: SubjectType
  teachers: TeacherDepartment[]
}

export type SubjectCourse = Pick<
  SubjectBasic,
  'code' | 'name' | 'credits' | 'typeSubject'
>

export type Subject = SubjectBasic & {
  prerequisites: SubjectCourse[]
  dependentSubjects: SubjectCourse[]
}
