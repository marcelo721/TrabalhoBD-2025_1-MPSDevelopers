import { CreateUndergraduateStudentDialog } from '@/components/dialogs/create-undergraduate-student-dialog'
import { findAllStudentsService } from '@/services/students/find-all-students-service'
import { useQuery } from '@tanstack/react-query'
import { StudentCard } from '../components/student-card'
import { CreatePostgraduateStudentDialog } from '@/components/dialogs/create-postgraduate-student-dialog.'

export function AdminStudentsPage() {
  const { data: students } = useQuery({
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
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
        {students?.map((student) => (
          <StudentCard key={student.code} student={student} />
        ))}
      </div>
    </>
  )
}
