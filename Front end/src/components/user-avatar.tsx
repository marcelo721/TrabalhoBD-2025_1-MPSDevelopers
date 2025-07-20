import { useUser } from '@/hooks/contexts/use-user'
import { getRoleNameInPortuguese } from '@/utils/get-role-name-in-portuguese'
import { useMemo } from 'react'

export function UserAvatar() {
  const { user } = useUser()

  console.log('Usuário logado:', user)

  const firstLetter = useMemo(
    () => (user ? user.username.charAt(0).toUpperCase() : ''),
    [user],
  )

  const rolename = useMemo(
    () => (user ? getRoleNameInPortuguese(user?.role) : ''),
    [user],
  )

  return (
    <div className="flex items-center justify-start gap-2">
      <div className="bg-primary/40 font-heading text-foreground flex size-10 items-center justify-center rounded-full text-2xl leading-tight font-semibold">
        {firstLetter}
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="text-base leading-tight font-semibold first-letter:uppercase">
          {user?.username}
        </span>
        <span className="text-muted-foreground text-sm font-medium">
          {rolename}
        </span>
      </div>
    </div>
  )
}
