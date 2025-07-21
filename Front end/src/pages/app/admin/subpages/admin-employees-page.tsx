import { useQuery } from '@tanstack/react-query'
import { EmployeeCard } from '../components/employee-card'
import { findAllEmployeesService } from '@/services/employee/find-all-employees-service'
import { CreateEmployeeDialog } from '@/components/dialogs/create-employee-dialog'

export function AdminEmployeesPage() {
  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => findAllEmployeesService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Empregado</h1>

        <CreateEmployeeDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
        {employees?.map((employee) => (
          <EmployeeCard key={employee.name} employee={employee} />
        ))}
      </div>
    </>
  )
}
