import { useUser } from '@/hooks/contexts/use-user'
import { findAllEnrollmentsBySubjectIdAndTeacherIdService } from '@/services/enrollment/find-all-enrollments-by-subject-id-and-teacher-id'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { CardSkeleton } from '../components/card-skeleton'
import { EnrollmentCard } from '../components/enrollment-card'
import { InfoPill } from '@/components/info-pill'
import { Copy } from 'lucide-react'
import { getSubjectTypeName } from '@/lib/get-subject-type-name'
import { useClipboard } from '@/hooks/use-clipboard'

export function TeacherSubjectDetailsPage() {
  const { copyToClipboard } = useClipboard()
  const { teacher } = useUser()

  const { subjectId } = useParams<{ subjectId: string }>()

  const subject = useMemo(
    () => teacher?.subjects.find((sub) => sub.code === Number(subjectId)),
    [teacher, subjectId],
  )

  const { data: enrollments, isPending: isEnrollmentsLoading } = useQuery({
    queryKey: ['teacher', 'enrollments', subjectId],
    queryFn: () =>
      findAllEnrollmentsBySubjectIdAndTeacherIdService({
        subjectId: subject!.code,
        teacherId: teacher!.id,
      }),
  })

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-xs uppercase">Disciplina:</span>
          <h2 className="font-heading text-3xl font-semibold">
            {subject && subject.name}
          </h2>
          <div className="flex gap-1">
            {subject?.code && (
              <InfoPill
                label="Código"
                value={subject.code}
                icon={<Copy />}
                onClick={() =>
                  copyToClipboard(
                    String(subject.code),
                    'Código da disciplina copiado!',
                  )
                }
              />
            )}

            {subject?.credits && (
              <InfoPill label="Créditos" value={subject.credits} />
            )}

            {subject?.typeSubject && (
              <InfoPill
                label="Tipo"
                value={getSubjectTypeName(subject.typeSubject)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-4">
        <h3 className="font-heading text-xl font-semibold">Matrículas</h3>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isEnrollmentsLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : enrollments && enrollments.length > 0 ? (
            enrollments.map((enrollment) => (
              <EnrollmentCard enrollment={enrollment} />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhuma matrícula encontrada.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
