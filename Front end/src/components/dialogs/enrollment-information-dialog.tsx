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

import { InfoCard } from '../info-card'
import type { Enrollment } from '@/types/enrollment'
import { getEnrollmentStatusName } from '@/utils/get-enrollment-status-name'

type EnrollmentInformationDialogProps = {
  enrollment: Enrollment
} & ComponentProps<typeof Dialog>

export function EnrollmentInformationDialog({
  enrollment,
  children,
  ...props
}: EnrollmentInformationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Informações da Matrícula</DialogTitle>
          </DialogHeader>

          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full gap-1">
              <InfoCard
                title="Nota Final"
                value={
                  enrollment.finalGrade
                    ? String(enrollment.finalGrade)
                    : 'Não informada'
                }
              />

              <InfoCard
                title="Frequência"
                value={
                  enrollment.attendance
                    ? `${String(enrollment.attendance)}%`
                    : 'Não informada'
                }
              />
            </div>
            <InfoCard
              title="Status"
              value={
                enrollment.statusEnrollment
                  ? getEnrollmentStatusName(enrollment.statusEnrollment)
                  : 'Não informada'
              }
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
