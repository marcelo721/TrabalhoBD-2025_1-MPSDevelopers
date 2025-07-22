import { TOKEN_STORAGE_KEY } from '@/constants/storage-keys'

export function removeToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}
