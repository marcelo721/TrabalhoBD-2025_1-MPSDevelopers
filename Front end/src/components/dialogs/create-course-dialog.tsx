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
import NumberInput from '../number-input'
import { toast } from 'sonner'

const createCourseSchema = z.object({
  code: z.coerce
    .number({
      invalid_type_error: 'Código deve ser um número',
    })
    .min(1, 'Código é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  minCredits: z.number().min(1, 'Créditos mínimos são obrigatórios'),
})

type CreateCourseFormData = z.infer<typeof createCourseSchema>

export function CreateCourseDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateCourseFormData>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: '',
      minCredits: 0,
    },
  })

  const handleCreateCourse = useCallback(
    async ({ name, minCredits, code }: CreateCourseFormData) => {
      try {
        await createCourseService({
          name,
          minCredits,
          departmentId: code,
        })

        await queryClient.invalidateQueries({
          queryKey: ['department', code],
        })

        toast.success('Curso criado com sucesso.')

        setIsOpen(false)
        form.reset()
      } catch (error) {
        toast.error('Não foi possível criar curso.')
        console.error('Erro ao criar curso:', error)
      }
    },
    [form],
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
              Preencha os detalhes do novo curso.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleCreateCourse)}
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código do Departamento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
