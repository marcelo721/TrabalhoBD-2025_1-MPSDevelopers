import { useCallback, type ComponentProps } from 'react'
import { UserAvatar } from './user-avatar'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { useUser } from '@/hooks/contexts/use-user'
import { useNavigate } from 'react-router'

type UserAccountCardProps = ComponentProps<'div'>

export function UserAccountCard({ className, ...props }: UserAccountCardProps) {
  const navigate = useNavigate()
  const { signOut } = useUser()

  const handleSignOut = useCallback(() => {
    signOut()
    navigate('/entrar')
  }, [signOut, navigate])

  return (
    <div
      className={cn(
        'border-border flex items-center justify-between gap-1 rounded-md border p-1.5',
        className,
      )}
      {...props}
    >
      <UserAvatar />

      <Button variant="ghost" size="icon" onClick={handleSignOut}>
        <LogOut className="text-muted-foreground/80" strokeWidth={3} />
      </Button>
    </div>
  )
}
