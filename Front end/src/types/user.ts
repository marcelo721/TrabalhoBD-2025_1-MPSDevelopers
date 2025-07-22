export type Role = 'TEACHER' | 'EMPLOYEE' | 'STUDENT' | 'ADMIN'

export type AuthUser = {
  token: string
  username: string
  role: Role
  code: number
  name: string
}

// export type User = Omit<AuthUser, 'token'>

export type RoleStudent = {
  id: number
  login: string
  password: string
  role: 'STUDENT'
  enabled: boolean
  authorities: { authority: string }[]
  username: string
  accountNonExpired: boolean
  credentialsNonExpired: boolean
  accountNonLocked: boolean
}

export type RoleTeacher = {
  id: number
  name: string
  birthDate: string
  hireDate: string
  cpf: string
  emails: string[]
  telephones: string[]
}

export type RoleEmployee = {
  code: number
  name: string
}

export type RoleUser = {
  id: number
  login: string
  password: string
  role: Role
  enabled: boolean
  authorities: { authority: string }[]
  credentialsNonExpired: boolean
  accountNonExpired: boolean
  accountNonLocked: boolean
  username: string
}

export type RoleData = {
  id: number
  name: string
  address: string
  user: RoleUser
}

export type User = {
  code: string
  role: Role
  roleData?: RoleData
}
