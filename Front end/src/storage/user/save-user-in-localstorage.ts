import { USER_STORAGE_KEY } from '@/constants/storage-keys'
import type { AuthUser } from '@/types/user'

export function saveUserInLocalStorage(user: AuthUser): void {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}
