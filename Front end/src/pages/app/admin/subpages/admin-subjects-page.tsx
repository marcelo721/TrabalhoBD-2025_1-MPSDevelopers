import { findAllSubjectsService } from '@/services/subjects/fint-all-subjects-service'
import { useQuery } from '@tanstack/react-query'
import { SubjectCard } from '../components/subject-card'
import { CreateSubjectDialog } from '@/components/dialogs/create-subject-dialog'

export function AdminSubjectPage() {
  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => findAllSubjectsService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Disciplinas</h1>

        <CreateSubjectDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
        {subjects?.map((subject) => (
          <SubjectCard key={subject.code} subject={subject} />
        ))}
      </div>
    </>
  )
}
