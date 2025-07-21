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

import { formatDate } from '@/utils/format-date'
import { InfoCard } from '../info-card'
import type { Student } from '@/types/students'

type StudentInformationDialogProps = {
  student: Student
} & ComponentProps<typeof Dialog>

export function StudentInformationDialog({
  student,
  children,
  ...props
}: StudentInformationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Informações do Estudante</DialogTitle>
          </DialogHeader>

          <div className="flex w-full flex-col gap-1">
            <div className="bg-accent/30 flex flex-col rounded-sm">
              <InfoCard title="Nome Completo" value={student.name} />
            </div>

            <InfoCard
              title="Data de Admissão"
              value={formatDate(student.admissionYear)}
            />

            <InfoCard title="Endereço" value={student.address} />

            <InfoCard title="Curso" value={student.courseName} />
            <div className="flex w-full gap-1">
              {student.advisorName && (
                <InfoCard title="Orientador" value={student.advisorName} />
              )}
              {student.advisorId && (
                <InfoCard
                  title="Código do Orientador"
                  value={String(student.advisorId)}
                />
              )}
            </div>

            <InfoCard
              title="Telefones"
              value={student.phones.map((phone) => phone.number)}
            />
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
