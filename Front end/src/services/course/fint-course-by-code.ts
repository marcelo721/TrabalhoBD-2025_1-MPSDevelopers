import type { Course } from '@/types/course'
import { api } from '../api'

export async function findCourseByCodeService(code: string | number) {
  const { data } = await api.get<Course>(`/courses/${code}`)

  return data
}
