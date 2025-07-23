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
import { createUndergraduateStudentService } from '@/services/students/create-undergraduate-student-service'
import type { Tag } from 'emblor'
import { DatePicker } from '../date-picker'
import { TagInput } from '../tag-input'

const createUndergraduateStudentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  courseCode: z.coerce
    .number({
      invalid_type_error: 'Código do curso deve ser um número',
    })
    .min(1, 'Código do curso é obrigatório'),
  admissionYear: z.string().min(1, 'Ano de admissão é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
})

type CreateUndergraduateStudentFormData = z.infer<
  typeof createUndergraduateStudentSchema
>

export function CreateUndergraduateStudentDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [phones, setPhones] = useState<Tag[]>([])

  const form = useForm<CreateUndergraduateStudentFormData>({
    resolver: zodResolver(createUndergraduateStudentSchema),
    defaultValues: {
      name: '',
      address: '',
      courseCode: 0,
      admissionYear: '',
      password: '',
      username: '',
    },
  })

  const handleCreateUndergraduateStudent = useCallback(
    async ({
      name,
      address,
      courseCode,
      admissionYear,
      password,
      username,
    }: CreateUndergraduateStudentFormData) => {
      try {
        const parsedPhones = phones.map((phone) => ({
          number: phone.text,
          description: `Número ${phone.id}`,
        }))

        await createUndergraduateStudentService({
          name,
          address,
          courseCode,
          admissionYear,
          password,
          username,
          phones: parsedPhones,
        })

        await queryClient.invalidateQueries({
          queryKey: ['students'],
        })

        toast.success('Estudante criado com sucesso.')

        setIsOpen(false)
        form.reset()
      } catch (error) {
        toast.error('Não foi possível criar estudante.')
        console.error('Erro ao criar estudante:', error)
      }
    },
    [form, phones],
  )

  console.log(form.formState.errors)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Criar Estudante de Graduação</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Estudante de Graduação</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo estudante.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-undergraduate-student-form"
              onSubmit={form.handleSubmit(handleCreateUndergraduateStudent)}
            >
              <FormField
                control={form.control}
                name="courseCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código do Curso</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Aluno</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João da Silva" {...field} />
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
                        <Input placeholder="Ex: joaodasilva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-1">
                <FormField
                  control={form.control}
                  name="admissionYear"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem className="w-full">
                      <FormLabel>Ano de Admissão</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={value}
                          onDateChange={onChange}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Rua A, 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormItem>
                <FormLabel>Telefones</FormLabel>
                <FormControl>
                  <TagInput
                    tags={phones}
                    onTagsChange={setPhones}
                    placeholder="Adicione um telefone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: ********"
                        type="password"
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
              form="create-undergraduate-student-form"
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
