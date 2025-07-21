import { api } from '@/services/api'

export function removeTokenFromApi(): void {
  delete api.defaults.headers.common['Authorization']
}
