import type { Role } from '@/types/user'
import { api } from '../api'

export type SignInServiceRequest = {
  code: string
  password: string
}

export type SignInServiceResponse = {
  token: string
  username: string
  role: Role
}

export async function signInService({ code, password }: SignInServiceRequest) {
  const { data } = await api.post<SignInServiceResponse>(
    '/login',
    {
      code,
      password,
    },
    {
      headers: {
        Authorization: null,
      },
    },
  )
  return data
}
