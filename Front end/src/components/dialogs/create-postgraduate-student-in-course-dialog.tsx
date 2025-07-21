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
import type { Tag } from 'emblor'

import { DatePicker } from '../date-picker'

import { TagInput } from '../tag-input'
import { createPostgraduateStudentService } from '@/services/students/create-postgraduate-student-service'

const createPostgraduateStudentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  advisorId: z.coerce
    .number({
      invalid_type_error: 'Código do orientador deve ser um número',
    })
    .min(1, 'Código do orientador é obrigatório'),

  admissionYear: z.string().min(1, 'Ano de admissão é obrigatório'),

  password: z.string().min(4, 'Senha deve ter pelo menos 4 caracteres'),
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
})

type CreatePostgraduateStudentFormData = z.infer<
  typeof createPostgraduateStudentSchema
>

type CreatePostgraduateStudentInCourseDialogProps = {
  courseCode: number
}

export function CreatePostgraduateStudentInCourseDialog({
  courseCode,
}: CreatePostgraduateStudentInCourseDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [phones, setPhones] = useState<Tag[]>([])
  const [previousCourses, setPreviousCourses] = useState<Tag[]>([])

  const form = useForm<CreatePostgraduateStudentFormData>({
    resolver: zodResolver(createPostgraduateStudentSchema),
    defaultValues: {
      name: '',
      address: '',
      advisorId: 0,
      admissionYear: '',
      password: '',
      username: '',
    },
  })

  const handleCreatePostgraduateStudent = useCallback(
    async ({
      name,
      address,
      advisorId,
      admissionYear,
      password,
      username,
    }: CreatePostgraduateStudentFormData) => {
      try {
        const parsedPhones = phones.map((phone) => ({
          number: phone.text,
          description: `Número ${phone.id}`,
        }))

        await createPostgraduateStudentService({
          name,
          address,
          courseCode,
          advisorId,
          admissionYear,
          password,
          username,
          phones: parsedPhones,
        })

        await queryClient.invalidateQueries({
          queryKey: ['course', courseCode],
        })

        toast.success('Curso criado com sucesso.')

        setIsOpen(false)
        form.reset()
      } catch (error) {
        toast.error('Não foi possível criar curso.')
        console.error('Erro ao criar curso:', error)
      }
    },
    [form, phones, courseCode],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Criar Estudante de Pós-Graduação</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Estudante de Pós-Graduação</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo estudante.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleCreatePostgraduateStudent)}
            >
              <FormField
                control={form.control}
                name="advisorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código do Orientador</FormLabel>
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
              <FormItem>
                <FormLabel>Cursos Anteriores</FormLabel>
                <FormControl>
                  <TagInput
                    tags={previousCourses}
                    onTagsChange={setPreviousCourses}
                    placeholder="Adicione um curso"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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
