import type { Role } from '@/types/user'
import { api } from '../api'

type Authority = {
  authority: string
}

type RoleData = {
  id: number
  login: string
  role: Role
  enabled: boolean
  authorities: Authority[]
}

type GetUserDataResponse = {
  code: number
  role: Role
  roleData: RoleData
  accountNonLocked: boolean
  accountNonExpired: boolean
  credentialsNonExpired: boolean
}

export async function getUserData() {
  const { data } = await api.get<GetUserDataResponse>('/users/me')

  return data
}
