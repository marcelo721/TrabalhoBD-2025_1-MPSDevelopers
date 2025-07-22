import { Logo } from '@/assets/logo'
import { InfoPill } from '@/components/info-pill'
import { ModeToggle } from '@/components/theme-toggle'
import { UserAccountCard } from '@/components/user-account-card'
import { useUser } from '@/hooks/contexts/use-user'
import { Copy, Info } from 'lucide-react'
import { useClipboard } from '@/hooks/use-clipboard'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { TeacherInformationDialog } from '@/components/dialogs/teacher-information-dialog'

export function TeacherPage() {
  const navigate = useNavigate()
  const { copyToClipboard } = useClipboard()
  const { verifyTeacherUser, isTeacherLoading, teacher, user } = useUser()

  useEffect(() => {
    verifyTeacherUser()
  }, [verifyTeacherUser])

  useEffect(() => {
    if (!isTeacherLoading && !teacher) {
      navigate('/entrar')
    }
  }, [isTeacherLoading, teacher, navigate])

  return (
    <article className="flex w-full max-w-5xl flex-col items-center justify-start pt-12">
      <header className="flex w-full items-center justify-between">
        <Logo className="h-12" />

        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserAccountCard />
        </div>
      </header>
      <section className="mt-6 flex w-full flex-col gap-8">
        <div className="flex w-fit flex-col items-start gap-2">
          <h1 className="font-heading text-4xl font-bold">Olá! {user?.name}</h1>

          <div className="flex w-fit items-center gap-1">
            {user?.code && (
              <InfoPill
                label="Código"
                value={user?.code}
                icon={<Copy />}
                onClick={() =>
                  copyToClipboard(user?.code, 'Código do usuário  copiado!')
                }
              />
            )}
            {teacher && (
              <TeacherInformationDialog teacher={teacher}>
                <button className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase">
                  <span>+ info</span>

                  <Info className="size-2.5" />
                </button>
              </TeacherInformationDialog>
            )}
          </div>
        </div>

        <Outlet />
      </section>
    </article>
  )
}
