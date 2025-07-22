import { TOKEN_STORAGE_KEY } from '@/constants/storage-keys'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}
