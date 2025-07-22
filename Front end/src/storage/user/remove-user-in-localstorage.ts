import { USER_STORAGE_KEY } from '@/constants/storage-keys'

export function removeUserInLocalStorage(): void {
  localStorage.removeItem(USER_STORAGE_KEY)
}
