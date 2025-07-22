import type { AuthUser } from '@/types/user'
import { api } from '../api'

export type SignInServiceRequest = {
  code: string
  password: string
}

export async function signInService({ code, password }: SignInServiceRequest) {
  const { data } = await api.post<AuthUser>(
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
