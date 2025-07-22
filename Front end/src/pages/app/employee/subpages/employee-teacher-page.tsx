import { useQuery } from '@tanstack/react-query'
import { TeacherCard } from '../../components/teacher-card'
import { useUser } from '@/hooks/contexts/use-user'
import { findAllTeachersByDepartmentCodeService } from '@/services/teacher/find-all-teachers-by-department-code'
import { CreateTeacherInDepartmentDialog } from '@/components/dialogs/create-teacher-in-department-dialog'
import { CardSkeleton } from '../../components/card-skeleton'

export function EmployeeTeachersPage() {
  const { employee } = useUser()

  const { data: teachers, isLoading: isLoadingTeachers } = useQuery({
    queryKey: ['employee', 'teachers', employee?.department.code],
    queryFn: () =>
      findAllTeachersByDepartmentCodeService(employee?.department.code || ''),
    enabled: !!employee?.department.code,
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Professores</h1>
        {employee?.department && (
          <CreateTeacherInDepartmentDialog department={employee?.department} />
        )}
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {isLoadingTeachers ? (
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
