import type { Teacher } from '@/types/teacher'
import { api } from '../api'

export async function findAllTeachersService() {
  const { data } = await api.get<Teacher[]>('/teachers')

  return data
}
