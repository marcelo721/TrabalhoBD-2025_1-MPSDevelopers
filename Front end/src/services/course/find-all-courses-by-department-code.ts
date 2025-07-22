import { api } from '../api'
import type { Course } from '@/types/course'

export async function findAllCoursesByDepartmentCodeService(
  code: string | number,
) {
  const { data } = await api.get<Course[]>(
    `/departments/department-courses/${code}`,
  )
  return data
}
