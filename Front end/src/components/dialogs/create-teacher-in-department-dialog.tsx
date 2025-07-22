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
import { DatePicker } from '../date-picker'

import { withMask } from 'use-mask-input'
import type { Department, DepartmentCourse } from '@/types/department'
import { TagInput } from '../tag-input'
import type { Tag } from 'emblor'
import { createTeacherService } from '@/services/teacher/create-teacher-service'

const createTeacherSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
  birthDate: z.string({
    required_error: 'Data de nascimento é obrigatória',
  }),
  hireDate: z.string({
    required_error: 'Data de contratação é obrigatória',
  }),
  cpf: z
    .string({
      required_error: 'CPF é obrigatório',
      invalid_type_error: 'CPF deve ser uma string',
    })
    .min(1, 'CPF é obrigatório')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
})

type CreateTeacherFormData = z.infer<typeof createTeacherSchema>

type CreateTeacherInDepartmentDialogProps = {
  department: Department | DepartmentCourse
}

export function CreateTeacherInDepartmentDialog({
  department,
}: CreateTeacherInDepartmentDialogProps) {
  const [emails, setEmails] = useState<Tag[]>([])
  const [phones, setPhones] = useState<Tag[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateTeacherFormData>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleCreateTeacher = useCallback(
    async ({
      name,
      birthDate,
      cpf,
      hireDate,
      password,
      username,
    }: CreateTeacherFormData) => {
      try {
        await createTeacherService({
          name,
          birthDate,
          cpf,
          hireDate,
          password,
          username,
          departmentId: department.code,
          phones: phones.map((tag) => tag.text),
          emails: emails.map((tag) => tag.text),
        })

        queryClient.invalidateQueries({
          queryKey: ['department', department.code],
        })

        queryClient.invalidateQueries({
          queryKey: ['employee', 'teachers', department.code],
        })

        setIsOpen(false)
        form.reset()
      } catch (error) {
        console.error('Não foi possível criar o professor :(', error)
      }
    },
    [form, department, emails, phones],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="default" size="sm">
            Criar Professor
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Professor</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do novo professor no departamento{' '}
              {department.name}.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleCreateTeacher)}
            >
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nome de Usuário</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João da Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João da Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormItem>
                <FormLabel>Emails</FormLabel>
                <FormControl>
                  <TagInput
                    tags={emails}
                    onTagsChange={setEmails}
                    placeholder="Adicione um email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Ex: João da Silva"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem className="w-full">
                      <FormLabel>Data de Nascimento</FormLabel>
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
                  name="hireDate"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem className="w-full">
                      <FormLabel>Data da Contratação</FormLabel>
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
              </div>
              <FormField
                control={form.control}
                name="cpf"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        ref={withMask('999.999.999-99')}
                        placeholder="Ex: 123.456.789-00"
                        value={value}
                        onChange={onChange}
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
