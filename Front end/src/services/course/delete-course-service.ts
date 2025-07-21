import { api } from '../api'

export async function deleteCourseService(courseId: string) {
  await api.delete(`/courses/${courseId}`)
}
