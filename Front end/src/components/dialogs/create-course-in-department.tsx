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
import { createCourseService } from '@/services/course/create-course-service'
import type { Department } from '@/types/department'
import NumberInput from '../number-input'

const createCourseInDepartmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  minCredits: z.number().min(1, 'Créditos mínimos são obrigatórios'),
})

type CreateCourseInDepartmentFormData = z.infer<
  typeof createCourseInDepartmentSchema
>

type CreateCourseInDepartmentDialogProps = {
  department: Department
}

export function CreateCourseInDepartmentDialog({
  department,
}: CreateCourseInDepartmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateCourseInDepartmentFormData>({
    resolver: zodResolver(createCourseInDepartmentSchema),
    defaultValues: {
      name: '',
      minCredits: 0,
    },
  })

  const handleCreateCourseInDepartment = useCallback(
    async ({ name, minCredits }: CreateCourseInDepartmentFormData) => {
      try {
        await createCourseService({
          name,
          minCredits,
          departmentId: department.code,
        })

        queryClient.invalidateQueries({
          queryKey: ['department', department.code],
        })

        setIsOpen(false)
        form.reset()
      } catch (error) {
        console.error('Erro ao criar departamento:', error)
      }
    },
    [form, department.code],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Criar Curso</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Curso</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo curso no departamento{' '}
              {department.name}.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleCreateCourseInDepartment)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Curso</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Introdução ao Direito"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minCredits"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Créditos Mínimos</FormLabel>
                    <FormControl>
                      <NumberInput onChange={onChange} value={value} />
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
