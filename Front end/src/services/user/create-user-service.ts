import { api } from '../api'

type CreateUserServiceRequest = {
  login: string
  password: string
  typeUser: string
}

export async function createUserService({
  login,
  password,
  typeUser,
}: CreateUserServiceRequest) {
  const response = await api.post('/users', {
    login,
    password,
    typeUser,
  })
  return response.data
}
