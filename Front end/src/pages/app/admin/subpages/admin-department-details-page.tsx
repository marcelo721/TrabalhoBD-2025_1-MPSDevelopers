import { Button } from '@/components/ui/button'
import { findDepartmentByCode } from '@/services/departments/find-department-by-code'
import { useQuery } from '@tanstack/react-query'
import { Copy, Trash } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { CreateTeacherInDepartmentDialog } from '@/components/dialogs/create-teacher-in-department-dialog'
import AlertDialog from '@/components/alert-dialog'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { deleteDepartmentService } from '@/services/departments/delete-department-service'
import { CreateCourseInDepartmentDialog } from '@/components/dialogs/create-course-in-department'
import { CardSkeleton } from '../../components/card-skeleton'
import { CreateEmployeeInDepartmentDialog } from '@/components/dialogs/create-employee-in-department'
import { findEmployeesByDepartmentCodeService } from '@/services/employee/get-employee-by-department-code'
import { useClipboard } from '@/hooks/use-clipboard'
import { TeacherCard } from '../../components/teacher-card'
import { CourseCard } from '../../components/course-card'
import { EmployeeCard } from '../../components/employee-card'

export function AdminDepartmentDetailsPage() {
  const navigate = useNavigate()
  const { copyToClipboard } = useClipboard()
  const { departmentId } = useParams<{ departmentId: string }>()

  const { data: department, isPending: isDepartmentPending } = useQuery({
    queryKey: ['department', departmentId],
    queryFn: () => findDepartmentByCode({ code: Number(departmentId) }),
  })

  const { data: employees, isPending: isEmployeePending } = useQuery({
    queryKey: ['department', departmentId, 'employee'],
    queryFn: () => findEmployeesByDepartmentCodeService(departmentId!),
    enabled: !!departmentId,
  })

  const handleDeleteDepartment = useCallback(async () => {
    try {
      await deleteDepartmentService(departmentId!)

      navigate('/admin/departments')

      toast.success('Departamento excluído com sucesso.')
    } catch (error) {
      toast.error('Erro ao excluir o departamento.')
      console.error('Error deleting department:', error)
    }
  }, [departmentId, navigate])

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
        <div className="flex items-center gap-2">
          <AlertDialog
            actionText="Excluir"
            cancelText="Cancelar"
            title="Excluir departamento"
            description="Você tem certeza que deseja excluir este departamento? Todos os professores e disciplinas associadas a ele serão removidos."
            onAction={handleDeleteDepartment}
          >
            <Button variant="outline">
              <Trash className="text-destructive size-4" />
            </Button>
          </AlertDialog>
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
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                to={`/admin/teachers/${teacher.id}`}
              />
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
              <CourseCard
                key={course.code}
                course={course}
                to={`/admin/courses/${course.code}`}
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum curso encontrado.
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Empregados</h2>
          {department && (
            <CreateEmployeeInDepartmentDialog department={department} />
          )}
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {isEmployeePending ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : employees && employees.length > 0 ? (
            employees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))
          ) : (
            <div className="text-muted-foreground w-full">
              Nenhum empregado encontrado.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
