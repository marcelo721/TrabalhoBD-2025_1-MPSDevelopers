import { findAllSubjectsService } from '@/services/subjects/fint-all-subjects-service'
import { useQuery } from '@tanstack/react-query'
import { CreateSubjectDialog } from '@/components/dialogs/create-subject-dialog'
import { SubjectCard } from '../../components/subject-card'
import { CardSkeleton } from '../../components/card-skeleton'

export function AdminSubjectPage() {
  const { data: subjects, isPending: isSubjectsPending } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => findAllSubjectsService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Disciplinas</h1>

        <CreateSubjectDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {isSubjectsPending ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : subjects && subjects.length > 0 ? (
          subjects?.map((subject) => (
            <SubjectCard key={subject.code} subject={subject} />
          ))
        ) : (
          <div className="text-muted-foreground w-full">
            Nenhuma disciplina encontrada.
          </div>
        )}
      </div>
    </>
  )
}
