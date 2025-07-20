import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState, type ComponentProps } from 'react'

import type { Teacher } from '@/types/teacher'
import { formatDate } from '@/utils/format-date'
import { InfoCard } from '../info-card'

type TeacherInformationDialogProps = {
  teacher: Teacher
} & ComponentProps<typeof Dialog>

export function TeacherInformationDialog({
  teacher,
  children,
  ...props
}: TeacherInformationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Informações do Professor</DialogTitle>
          </DialogHeader>

          <div className="flex w-full flex-col gap-1">
            <div className="bg-accent/30 flex flex-col rounded-sm">
              <InfoCard title="Nome Completo" value={teacher.name} />
            </div>
            <div className="flex w-full gap-1">
              <InfoCard
                title="Data de Nascimento"
                value={formatDate(teacher.birthDate)}
              />

              <InfoCard
                title="Data de Contratação"
                value={formatDate(teacher.hireDate)}
              />
            </div>

            <InfoCard title="CPF" value={teacher.cpf} />
            <InfoCard title="Emails" value={teacher.emails} />
            <InfoCard title="Telefones" value={teacher.telephones} />
            <InfoCard title="Departamento" value={teacher.department.name} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Voltar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
