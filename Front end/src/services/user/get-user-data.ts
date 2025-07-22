import type { User } from '@/types/user'
import { api } from '../api'

export async function getUserData() {
  const { data } = await api.get<User>('/users/me')

  return data
}
