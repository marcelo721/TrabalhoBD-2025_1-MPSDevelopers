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
import { useCallback, useState, type ComponentProps } from 'react'

import NumberInput from '../number-input'
import { toast } from 'sonner'
import { updateEnrollmentService } from '@/services/enrollment/update-enrollment-service'
import type { Enrollment } from '@/types/enrollment'
import { queryClient } from '@/lib/query-client'

const updateEnrollmentSchema = z.object({
  finalGrade: z
    .number()
    .min(0, 'Nota final deve ser maior ou igual a 0')
    .max(10, 'Nota final deve ser menor ou igual a 10'),
  attendance: z
    .number()
    .min(0, 'Frequência deve ser maior ou igual a 0')
    .max(100, 'Frequência deve ser menor ou igual a 100'),
})

type UpdateEnrollmentFormData = z.infer<typeof updateEnrollmentSchema>

type UpdateEnrollmentDialogProps = {
  enrollment: Enrollment
} & ComponentProps<typeof Dialog>

export function UpdateEnrollmentDialog({
  enrollment,
  children,
  ...props
}: UpdateEnrollmentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<UpdateEnrollmentFormData>({
    resolver: zodResolver(updateEnrollmentSchema),
    defaultValues: {
      finalGrade: 0,
      attendance: 0,
    },
  })

  const handleUpdateEnrollment = useCallback(
    async ({ finalGrade, attendance }: UpdateEnrollmentFormData) => {
      try {
        await updateEnrollmentService({
          enrollmentId: enrollment.code,
          finalGrade,
          attendance,
        })

        await queryClient.invalidateQueries({
          queryKey: ['teacher', 'enrollments', enrollment.subject.code],
        })

        toast.success('Matrícula atualizada com sucesso.')

        setIsOpen(false)
        form.reset()
      } catch (error) {
        toast.error('Não foi possível atualizar matrícula.')
        console.error('Erro ao atualizar matrícula:', error)
      }
    },
    [form, enrollment.code, enrollment.subject.code],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar Matrícula</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da matrícula.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleUpdateEnrollment)}
            >
              <FormField
                control={form.control}
                name="finalGrade"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Nota Final (0 a 10)</FormLabel>
                    <FormControl>
                      <NumberInput
                        onChange={onChange}
                        value={value}
                        maxValue={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendance"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Frequência (0 a 100 [%])</FormLabel>
                    <FormControl>
                      <NumberInput
                        onChange={onChange}
                        value={value}
                        maxValue={100}
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
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
