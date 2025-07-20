import { useQuery } from '@tanstack/react-query'
import { findAllTeachersService } from '@/services/teacher/find-all-teacher-service'
import { TeacherCard } from '../components/teacher-card'
import { CreateTeacherDialog } from '@/components/dialogs/create-teacher-dialog'

export function AdminTeacherPage() {
  const { data: teachers } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => findAllTeachersService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Professores</h1>

        <CreateTeacherDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
        {teachers?.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </>
  )
}
