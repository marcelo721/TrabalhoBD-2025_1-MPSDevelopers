import { Logo } from '@/assets/logo'
import { InfoPill } from '@/components/info-pill'
import { ModeToggle } from '@/components/theme-toggle'
import { UserAccountCard } from '@/components/user-account-card'
import { useUser } from '@/hooks/contexts/use-user'
import { findEnrollmentsByStudentCodeService } from '@/services/enrollment/find-enrollments-by-student-code-service'
import { findStudentByCodeService } from '@/services/students/find-student-by-code-service'
import { useQuery } from '@tanstack/react-query'
import { Copy, Info } from 'lucide-react'
import { CardSkeleton } from '../components/card-skeleton'
import { StudentInformationDialog } from '@/components/dialogs/student-information-dialog'
import { useClipboard } from '@/hooks/use-clipboard'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { SubjectStudentCard } from '../components/subject-student-card'
import { EnrollmentInformationDialog } from '@/components/dialogs/enrollment-information-dialog'

export function StudentPage() {
  const navigate = useNavigate()
  const { copyToClipboard } = useClipboard()
  const {
    verifyStudentUser,
    isStudentLoading,
    user,
    student: authStudent,
  } = useUser()

  const { data: student } = useQuery({
    queryKey: ['student', user?.code],
    queryFn: () => findStudentByCodeService(user!.code),
    enabled: !!user?.code,
    refetchOnWindowFocus: false,
  })

  const { data: enrollments, isPending: isEnrollmentsPending } = useQuery({
    queryKey: ['student', 'enrollments', user?.code],
    queryFn: () => findEnrollmentsByStudentCodeService(user!.code),
    enabled: !!user?.code,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    verifyStudentUser()
  }, [verifyStudentUser])

  useEffect(() => {
    if (!isStudentLoading && !authStudent) {
      navigate('/entrar')
    }
  }, [isStudentLoading, authStudent, navigate])

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
            {student && (
              <StudentInformationDialog student={student}>
                <button className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase">
                  <span>+ info</span>

                  <Info className="size-2.5" />
                </button>
              </StudentInformationDialog>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <h2 className="font-heading text-xl font-semibold">Disciplinas</h2>
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
            {isEnrollmentsPending ? (
              Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : enrollments && enrollments.length > 0 ? (
              enrollments.map((enrollment) => (
                <EnrollmentInformationDialog
                  enrollment={enrollment}
                  key={enrollment.subject.code}
                >
                  <SubjectStudentCard subject={enrollment.subject} />
                </EnrollmentInformationDialog>
              ))
            ) : (
              <div className="text-muted-foreground w-full">
                Nenhuma disciplina encontrada.
              </div>
            )}
          </div>
        </div>
      </section>
    </article>
  )
}
