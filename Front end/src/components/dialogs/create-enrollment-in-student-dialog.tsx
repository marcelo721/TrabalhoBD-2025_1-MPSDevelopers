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

const createEnrollmentInStudentSchema = z.object({
  subjectId: z.coerce
    .number({
      invalid_type_error: 'ID da disciplina deve ser um número',
    })
    .min(1, 'ID da disciplina é obrigatório'),
})

type CreateEnrollmentInStudentFormData = z.infer<
  typeof createEnrollmentInStudentSchema
>

type CreateEnrollmentInStudentDialogProps = {
  studentId: number
}

export function CreateEnrollmentInStudentDialog({
  studentId,
}: CreateEnrollmentInStudentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateEnrollmentInStudentFormData>({
    resolver: zodResolver(createEnrollmentInStudentSchema),
    defaultValues: {
      subjectId: 0,
    },
  })

  const handleCreateEnrollmentInStudent = useCallback(
    async ({ subjectId }: CreateEnrollmentInStudentFormData) => {
      try {
        await createEnrollmentService({
          studentId,
          subjectId,
        })

        await queryClient.invalidateQueries({
          queryKey: ['student', studentId],
        })

        toast.success('Matrícula criada com sucesso.')

        setIsOpen(false)
        form.reset()
      } catch (error) {
        toast.error('Não foi possível criar matrícula.')
        console.error('Erro ao criar matrícula:', error)
      }
    },
    [form, studentId],
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
              onSubmit={form.handleSubmit(handleCreateEnrollmentInStudent)}
            >
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
