export type Role = 'TEACHER' | 'EMPLOYEE' | 'STUDENT' | 'ADMIN'

export type AuthUser = {
  token: string
  username: string
  role: Role
}

export type User = Omit<AuthUser, 'token'>
