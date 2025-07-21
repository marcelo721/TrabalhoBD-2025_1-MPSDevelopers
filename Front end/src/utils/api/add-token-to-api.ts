import { api } from '@/services/api'

export function addTokenToApi(token: string): void {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
