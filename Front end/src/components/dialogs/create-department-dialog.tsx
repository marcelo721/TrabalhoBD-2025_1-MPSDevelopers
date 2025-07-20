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
import { createDepartmentService } from '@/services/departments/create-department-service'
import { queryClient } from '@/lib/query-client'

const createDepartmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
})

type CreateDepartmentFormData = z.infer<typeof createDepartmentSchema>

export function CreateDepartmentDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateDepartmentFormData>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleCreateDepartment = useCallback(
    async ({ name }: CreateDepartmentFormData) => {
      try {
        await createDepartmentService({
          name,
        })

        queryClient.invalidateQueries({
          queryKey: ['departments'],
        })

        setIsOpen(false)
        form.reset()
      } catch (error) {
        console.error('Erro ao criar departamento:', error)
      }
    },
    [form],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Criar Departamento</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Departamento</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo departamento e clique em criar.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleCreateDepartment)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Departamento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Recursos Humanos" {...field} />
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
