import { useQuery } from '@tanstack/react-query'
import { findAllTeachersService } from '@/services/teacher/find-all-teacher-service'
import { CreateTeacherDialog } from '@/components/dialogs/create-teacher-dialog'
import { TeacherCard } from '../../components/teacher-card'
import { CardSkeleton } from '../../components/card-skeleton'

export function AdminTeacherPage() {
  const { data: teachers, isPending: isTeachersPending } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => findAllTeachersService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Professores</h1>

        <CreateTeacherDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {isTeachersPending ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : teachers && teachers.length > 0 ? (
          teachers?.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))
        ) : (
          <div className="text-muted-foreground w-full">
            Nenhum professor encontrado.
          </div>
        )}
      </div>
    </>
  )
}
