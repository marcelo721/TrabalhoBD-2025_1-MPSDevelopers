import { useQuery } from '@tanstack/react-query'
import { findAllEmployeesService } from '@/services/employee/find-all-employees-service'
import { CreateEmployeeDialog } from '@/components/dialogs/create-employee-dialog'
import { EmployeeCard } from '../../components/employee-card'
import { CardSkeleton } from '../../components/card-skeleton'

export function AdminEmployeesPage() {
  const { data: employees, isPending: isEmployeesPending } = useQuery({
    queryKey: ['employees'],
    queryFn: () => findAllEmployeesService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Empregado</h1>

        <CreateEmployeeDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {isEmployeesPending ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : employees && employees.length > 0 ? (
          employees?.map((employee) => (
            <EmployeeCard key={employee.name} employee={employee} />
          ))
        ) : (
          <div className="text-muted-foreground w-full">
            Nenhum empregado encontrado.
          </div>
        )}
      </div>
    </>
  )
}
