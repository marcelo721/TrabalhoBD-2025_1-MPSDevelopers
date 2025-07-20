import { TOKEN_STORAGE_KEY } from '@/components/constants/token-storage-key'

export function removeToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}
