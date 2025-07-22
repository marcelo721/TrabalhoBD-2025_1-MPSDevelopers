import { CreateUndergraduateStudentDialog } from '@/components/dialogs/create-undergraduate-student-dialog'
import { findAllStudentsService } from '@/services/students/find-all-students-service'
import { useQuery } from '@tanstack/react-query'
import { CreatePostgraduateStudentDialog } from '@/components/dialogs/create-postgraduate-student-dialog.'
import { CardSkeleton } from '../../components/card-skeleton'
import { StudentCard } from '../../components/student-card'

export function AdminStudentsPage() {
  const { data: students, isPending: isStudentsPending } = useQuery({
    queryKey: ['students'],
    queryFn: () => findAllStudentsService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Estudantes</h1>

        <div className="flex items-center gap-2">
          <CreateUndergraduateStudentDialog />
          <CreatePostgraduateStudentDialog />
        </div>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {isStudentsPending ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : students && students.length > 0 ? (
          students?.map((student) => (
            <StudentCard key={student.code} student={student} />
          ))
        ) : (
          <div className="text-muted-foreground w-full">
            Nenhum estudante encontrado.
          </div>
        )}
      </div>
    </>
  )
}
