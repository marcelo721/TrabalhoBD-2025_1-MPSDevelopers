import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useCallback, useState } from 'react'

import { queryClient } from '@/lib/query-client'
import type { Department } from '@/types/department'
import { createEmployeeService } from '@/services/employee/create-employee-service'
import { toast } from 'sonner'

const createEmployeeInDepartmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type CreateEmployeeInDepartmentFormData = z.infer<
  typeof createEmployeeInDepartmentSchema
>

type CreateEmployeeInDepartmentDialogProps = {
  department: Department
}

export function CreateEmployeeInDepartmentDialog({
  department,
}: CreateEmployeeInDepartmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateEmployeeInDepartmentFormData>({
    resolver: zodResolver(createEmployeeInDepartmentSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  })

  const handleCreateEmployeeInDepartment = useCallback(
    async ({
      name,
      username,
      password,
    }: CreateEmployeeInDepartmentFormData) => {
      try {
        await createEmployeeService({
          name,
          username,
          password,
          idDepartment: department.code,
        })

        await queryClient.refetchQueries({
          queryKey: ['department', department.code, 'employee'],
        })

        toast.success('Empregado criado com sucesso.')

        setIsOpen(false)
        form.reset()
      } catch (error) {
        toast.error('Não foi possível criar empregado.')
        console.error('Erro ao criar empregado:', error)
      }
    },
    [form, department.code],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Criar Empregado</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Empregado</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo empregado no departamento{' '}
              {department.name}.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleCreateEmployeeInDepartment)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Empregado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Francisco da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: f.silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Ex: ********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              type="submit"
              form="create-department-form"
              isLoading={form.formState.isSubmitting}
            >
              Criar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
