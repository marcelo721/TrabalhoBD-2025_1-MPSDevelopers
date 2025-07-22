import { useQuery } from '@tanstack/react-query'
import { Copy, Info } from 'lucide-react'
import { useParams } from 'react-router'
import { useClipboard } from '@/hooks/use-clipboard'
import { findTeacherByCodeService } from '@/services/teacher/find-teacher-by-code-service'
import { TeacherInformationDialog } from '@/components/dialogs/teacher-information-dialog'
import { CardSkeleton } from '../../components/card-skeleton'
import { StudentCard } from '../../components/student-card'
import { SubjectCard } from '../../components/subject-card'

export function EmployeeTeacherDetailsPage() {
  const { copyToClipboard } = useClipboard()
  const { teacherId } = useParams<{ teacherId: string }>()

  const { data: teacher, isPending: isTeacherPending } = useQuery({
    queryKey: ['employee', 'teacher', teacherId],
    queryFn: () => findTeacherByCodeService(teacherId!),
    enabled: !!teacherId,
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs uppercase">Professor:</span>
          <h1 className="font-heading text-3xl font-bold">{teacher?.name}</h1>
          <div className="flex gap-1">
            {teacher?.id && (
              <>
                <button
                  className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase"
                  onClick={() => copyToClipboard(teacher.id.toString())}
                >
                  <span>Código: {teacher?.id}</span>

                  <Copy className="size-2.5" />
                </button>
                <TeacherInformationDialog teacher={teacher}>
                  <button className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase">
                    <span>+ info</span>

                    <Info className="size-2.5" />
                  </button>
                </TeacherInformationDialog>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Pós-graduandos</h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isTeacherPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : teacher && teacher?.advisees && teacher.advisees.length > 0 ? (
            teacher?.advisees.map((student) => (
              <StudentCard
                key={student.code}
                student={student}
                isLinkDisabled
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum pós-graduando encontrado.
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Disciplinas</h2>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isTeacherPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : teacher && teacher?.subjects && teacher.subjects.length > 0 ? (
            teacher?.subjects.map((subject) => (
              <SubjectCard
                key={subject.code}
                subject={subject}
                isLinkDisabled
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhuma disciplina encontrada.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
