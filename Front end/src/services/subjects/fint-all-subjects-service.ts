import type { Subject } from '@/types/subjects'
import { api } from '../api'

export async function findAllSubjectsService() {
  const { data } = await api.get<Subject[]>('/subjects')
  return data
}
