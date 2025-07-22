import { api } from '@/services/api'

export async function addTokenToApi(token: string): Promise<void> {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
