import type { DepartmentCourse } from './department'
import type { StudentCourse } from './students'
import type { SubjectCourse } from './subjects'

export type Teacher = {
  id: number
  name: string
  birthDate: string
  hireDate: string
  cpf: string
  emails: string[]
  telephones: string[]
  advisees: StudentCourse[]
  subjects: SubjectCourse[]
  department: DepartmentCourse
}

export type TeacherDepartment = Pick<Teacher, 'id' | 'name' | 'hireDate'>
