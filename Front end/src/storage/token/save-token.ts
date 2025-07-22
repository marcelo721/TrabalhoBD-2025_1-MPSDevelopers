import { TOKEN_STORAGE_KEY } from '@/constants/storage-keys'

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}
