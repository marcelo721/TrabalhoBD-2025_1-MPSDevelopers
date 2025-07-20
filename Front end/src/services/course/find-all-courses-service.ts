import { api } from '@/services/api'
import type { Course } from '@/types/course'

export async function findAllCoursesService() {
  const { data } = await api.get<Course[]>('/courses')

  return data
}
