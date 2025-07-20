import { api } from '@/services/api'
import type { Teacher } from '@/types/teacher'

type FindTeacherByCodeResquest = {
  code: number
}

export async function findTeacherByCode({ code }: FindTeacherByCodeResquest) {
  const { data } = await api.get<Teacher>(`/teachers/${code}`)

  return data
}
