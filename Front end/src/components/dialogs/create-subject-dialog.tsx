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

import NumberInput from '../number-input'
import { toast } from 'sonner'
import { Textarea } from '../ui/textarea'
import { createSubjectService } from '@/services/subjects/create-subject-service'
import type { Tag } from 'emblor'
import { TagInput } from '../tag-input'
import { FormSelect, type Options } from '../form-select'

const typeSubjectOptions: Options[] = [
  {
    value: 'OBLIGATORY',
    label: 'Obrigatória',
  },
  {
    value: 'OPTIONAL',
    label: 'Optativa',
  },
]

const createSubjectSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  credits: z.coerce
    .number({
      invalid_type_error: 'Créditos devem ser um número',
    })
    .min(1, 'Créditos são obrigatórios'),
  syllabus: z.string().min(1, 'Ementa é obrigatória'),
  typeSubject: z.enum(['OBLIGATORY', 'OPTIONAL'], {
    required_error: 'Tipo de disciplina é obrigatório',
  }),
  courseId: z.coerce
    .number({
      invalid_type_error: 'Curso deve ser um número',
    })
    .min(1, 'Curso é obrigatório'),
})

type CreateSubjectFormData = z.infer<typeof createSubjectSchema>

export function CreateSubjectDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const [prerequisitesId, setPrerequisitesId] = useState<Tag[]>([])
  const [teacherId, setTeacherId] = useState<Tag[]>([])

  const form = useForm<CreateSubjectFormData>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: '',
      credits: 0,
      syllabus: '',
      typeSubject: 'OBLIGATORY',
      courseId: 0,
    },
  })

  const handleCreateSubject = useCallback(
    async ({
      name,
      credits,
      syllabus,
      typeSubject,
      courseId,
    }: CreateSubjectFormData) => {
      try {
        const parsedPrerequisitesId = prerequisitesId.map((tag) =>
          Number(tag.text),
        )
        const parsedTeacherId = teacherId.map((tag) => Number(tag.text))

        await createSubjectService({
          name,
          credits,
          syllabus,
          typeSubject,
          courseId,
          prerequisitesId: parsedPrerequisitesId,
          teacherId: parsedTeacherId,
        })

        await queryClient.invalidateQueries({
          queryKey: ['subjects'],
        })

        toast.success('Curso criado com sucesso.')

        setIsOpen(false)
        form.reset()
      } catch (error) {
        toast.error('Não foi possível criar curso.')
        console.error('Erro ao criar curso:', error)
      }
    },
    [form, prerequisitesId, teacherId],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>Criar Disciplina</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Disciplina</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da nova disciplina.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              id="create-department-form"
              onSubmit={form.handleSubmit(handleCreateSubject)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Disciplina</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Matemática" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full gap-1">
                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Código do Curso</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="credits"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="w-full">
                      <FormLabel>Créditos Mínimos</FormLabel>
                      <FormControl>
                        <NumberInput onChange={onChange} value={value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="syllabus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ementa</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Ementa da disciplina"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typeSubject"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Tipo de Disciplina</FormLabel>
                    <FormControl>
                      <FormSelect
                        options={typeSubjectOptions}
                        onValueChange={onChange}
                        value={value}
                        placeholder="Selecione o tipo de disciplina"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Códigos de Pré-requisitos</FormLabel>
                <FormControl>
                  <TagInput
                    tags={prerequisitesId}
                    onTagsChange={setPrerequisitesId}
                    placeholder="Adicione o código deum pré-requisito"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Códigos de Professores</FormLabel>
                <FormControl>
                  <TagInput
                    tags={teacherId}
                    onTagsChange={setTeacherId}
                    placeholder="Adicione o código de um professor"
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
