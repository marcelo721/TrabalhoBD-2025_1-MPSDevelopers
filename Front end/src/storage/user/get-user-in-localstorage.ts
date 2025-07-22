import { USER_STORAGE_KEY } from '@/constants/storage-keys'
import type { AuthUser } from '@/types/user'

export function getUserInLocalStorage(): AuthUser | null {
  const user = localStorage.getItem(USER_STORAGE_KEY)
  return user ? (JSON.parse(user) as AuthUser) : null
}
