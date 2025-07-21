import { api } from '../api'

export type CreateSubjectServiceRequest = {
  name: string
  credits: number
  syllabus: string
  typeSubject: string
  courseId: number
  prerequisitesId: number[]
  teacherId: number[]
}

export async function createSubjectService({
  name,
  credits,
  syllabus,
  typeSubject,
  courseId,
  prerequisitesId,
  teacherId,
}: CreateSubjectServiceRequest) {
  await api.post('/subjects', {
    name,
    credits,
    syllabus,
    typeSubject,
    CourseId: courseId,
    prerequisitesId,
    TeacherId: teacherId,
  })
}
