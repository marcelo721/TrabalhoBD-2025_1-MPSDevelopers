import { useCallback } from 'react'
import { toast } from 'sonner'

export const useClipboard = () => {
  const copyToClipboard = useCallback(
    async (text: string | number, message?: string) => {
      try {
        await navigator.clipboard.writeText(text.toString())
        toast.success(message || 'Texto copiado para a área de transferência!')
        return true
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        toast.error('Não foi possível copiar para a área de transferência.')
        return false
      }
    },
    [],
  )

  return {
    copyToClipboard,
  }
}
