import { CreateDepartmentDialog } from '@/components/dialogs/create-department-dialog'
import { findAllDepartmentsService } from '@/services/departments/find-all-departments-service'
import { useQuery } from '@tanstack/react-query'
import { DepartmentCard } from '../components/department-card'

export function AdminDepartmentsPage() {
  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: () => findAllDepartmentsService(),
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Departamentos</h1>

        <CreateDepartmentDialog />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
        {departments?.map((department) => (
          <DepartmentCard key={department.code} department={department} />
        ))}
      </div>
    </>
  )
}
