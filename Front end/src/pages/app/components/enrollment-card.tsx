import { EnrollmentInformationDialog } from '@/components/dialogs/enrollment-information-dialog'
import { UpdateEnrollmentDialog } from '@/components/dialogs/update-enrollment-dialog'
import type { Enrollment } from '@/types/enrollment'
import { Pencil, User } from 'lucide-react'
import type { ComponentProps } from 'react'

type EnrollmentCardProps = {
  enrollment: Enrollment
} & ComponentProps<'div'>

export function EnrollmentCard({ enrollment, ...props }: EnrollmentCardProps) {
  return (
    <div
      className="bg-accent/50 border-border group hover:bg-accent/70 relative h-fit w-full cursor-pointer overflow-hidden rounded-md border transition-colors data-[link=disabled]:cursor-default"
      {...props}
    >
      <UpdateEnrollmentDialog enrollment={enrollment}>
        <button
          className="bg-accent/80 hover:bg-accent/95 absolute top-2 right-2 rounded-full p-1"
          type="button"
        >
          <Pencil className="text-accent-foreground size-3.5" />
        </button>
      </UpdateEnrollmentDialog>
      <EnrollmentInformationDialog enrollment={enrollment}>
        <button className="h-full w-full">
          <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full items-center justify-center transition-colors">
            <User className="text-accent size-6" />
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <span className="text-xs uppercase">Estudante</span>
            <strong className="text-base first-letter:uppercase">
              {enrollment.student.name}
            </strong>
          </div>
        </button>
      </EnrollmentInformationDialog>
    </div>
  )
}
