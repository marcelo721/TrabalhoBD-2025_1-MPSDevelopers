import { Logo } from '@/assets/logo'
import { UserAvatar } from '@/components/user-avatar'

export function StudentPage() {
  return (
    <article className="flex w-full items-start justify-center pt-12">
      <header className="flex w-full max-w-3xl items-center justify-between">
        <Logo className="h-10" />

        <UserAvatar />
      </header>
    </article>
  )
}
