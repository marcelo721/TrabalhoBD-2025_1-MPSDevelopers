import AlertDialog from '@/components/alert-dialog'
import { queryClient } from '@/lib/query-client'
import { deleteEmployeeService } from '@/services/employee/delete-employee-service'
import type { Employee } from '@/types/employee'
import { useMutation } from '@tanstack/react-query'
import { Building2, Contact, Trash } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'sonner'

type EmployeeCardProps = {
  employee: Employee
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { mutateAsync: deleteEmployee, isPending } = useMutation({
    mutationFn: deleteEmployeeService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      toast.success('Empregado excluído com sucesso.')
    },
    onError: () => {
      toast.error('Não foi possível excluir o empregado.')
    },
  })

  const handleDeleteEmployee = useCallback(async () => {
    await deleteEmployee(employee.id)
  }, [deleteEmployee, employee.id])

  return (
    <div className="bg-accent/50 border-border group hover:bg-accent/70 relative w-full cursor-pointer overflow-hidden rounded-md border transition-colors">
      <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full items-center justify-center transition-colors">
        <Contact className="text-accent size-6" />
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-xs uppercase">Empregado</span>
        <strong className="text-base first-letter:uppercase">
          {employee.name}
        </strong>
        <span className="bg-accent border-border text-muted-foreground mt-2 flex gap-1 rounded-full border px-1.5 py-0.5 text-xs uppercase">
          <Building2 className="size-3" />
          {employee.department.name}
        </span>
      </div>

      <AlertDialog
        title="Excluir empregado"
        description="Você tem certeza que deseja excluir este empregado? Esta ação não pode ser desfeita."
        actionText="Excluir"
        cancelText="Cancelar"
        onAction={handleDeleteEmployee}
      >
        <button
          className="bg-accent/80 hover:bg-accent/95 absolute top-2 right-2 rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100"
          disabled={isPending}
          type="button"
        >
          <Trash className="text-destructive size-3.5" />
        </button>
      </AlertDialog>
    </div>
  )
}
