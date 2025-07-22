import type { Teacher } from '@/types/teacher'
import { api } from '../api'

export async function findAllTeachersByDepartmentCodeService(
  code: string | number,
) {
  const { data } = await api.get<Teacher[]>(
    `/teachers/department-teachers/${code}`,
  )
  return data
}
