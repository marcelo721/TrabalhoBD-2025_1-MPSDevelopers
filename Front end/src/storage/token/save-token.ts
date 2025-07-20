import { TOKEN_STORAGE_KEY } from '@/components/constants/token-storage-key'

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}
