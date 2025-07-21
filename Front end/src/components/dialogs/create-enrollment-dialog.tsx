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

import { toast } from 'sonner'
import { createEnrollmentService } from '@/services/enrollment/create-enrollment-service'

const createEnrollmentSchema = z.object({
  studentId: z.coerce
    .number({
      invalid_type_error: 'ID do aluno deve ser um número',
    })
    .min(1, 'ID do aluno é obrigatório'),
  subjectId: z.coerce
    .number({
      invalid_type_error: 'ID da disciplina deve ser um número',
    })
    .min(1, 'ID da disciplina é obrigatório'),
})

type CreateEnrollmentFormData = z.infer<typeof createEnrollmentSchema>

export function CreateEnrollmentDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateEnrollmentFormData>({
    resolver: zodResolver(createEnrollmentSchema),
    defaultValues: {
      studentId: 0,
      subjectId: 0,
    },
  })

  const handleCreateEnrollment = useCallback(
    async ({ studentId, subjectId }: CreateEnrollmentFormData) => {
      try {
        await createEnrollmentService({
          studentId,
          subjectId,
        })

        await queryClient.invalidateQueries({
          queryKey: ['enrollment', studentId],
        })

        toast.success('Matrícula criada com sucesso.')

        setIsOpen(false)
        form.reset()
      } catch (error) {
        toast.error('Não foi possível criar matrícula.')
        console.error('Erro ao criar matrícula:', error)
      }
    },
    [form],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Criar Matrícula</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Matrícula</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da nova matrícula.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleCreateEnrollment)}
            >
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID do Aluno </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subjectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID da Disciplina</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 123456" {...field} />
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
