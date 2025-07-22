import { findDepartmentByCode } from '@/services/departments/find-department-by-code'
import { useQuery } from '@tanstack/react-query'
import { Copy } from 'lucide-react'
import { CreateTeacherInDepartmentDialog } from '@/components/dialogs/create-teacher-in-department-dialog'
import { CreateCourseInDepartmentDialog } from '@/components/dialogs/create-course-in-department'
import { CardSkeleton } from '../../components/card-skeleton'
import { useClipboard } from '@/hooks/use-clipboard'
import { TeacherCard } from '../../components/teacher-card'
import { CourseCard } from '../../components/course-card'
import { useUser } from '@/hooks/contexts/use-user'

export function EmployeeDepartmentPage() {
  const { copyToClipboard } = useClipboard()
  const { employee } = useUser()

  const { data: department, isPending: isDepartmentPending } = useQuery({
    queryKey: ['department', employee?.department.code],
    queryFn: () =>
      findDepartmentByCode({ code: Number(employee?.department.code) }),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <span className="text-xs uppercase">Departamento:</span>
          <h1 className="font-heading text-3xl font-bold">
            {department?.name}
          </h1>
          {department?.code && (
            <button
              className="text-accent-foreground bg-accent border-border flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase"
              onClick={() => copyToClipboard(department.code.toString())}
            >
              <span>Código: {department?.code}</span>

              <Copy className="size-2.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Professores</h2>
          {department && (
            <CreateTeacherInDepartmentDialog department={department} />
          )}
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isDepartmentPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : department &&
            department?.teachers &&
            department.teachers.length > 0 ? (
            department?.teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} isLinkDisabled />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum professor encontrado.
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Cursos</h2>
          {department && (
            <CreateCourseInDepartmentDialog department={department} />
          )}
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isDepartmentPending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : department &&
            department?.courses &&
            department.courses.length > 0 ? (
            department?.courses.map((course) => (
              <CourseCard key={course.code} course={course} isLinkDisabled />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum curso encontrado.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
