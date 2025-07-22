import type { Subject, SubjectCourse } from '@/types/subjects'
import { Blocks } from 'lucide-react'
import type { ComponentProps } from 'react'

type SubjectCardProps = {
  subject: Subject | SubjectCourse
} & ComponentProps<'button'>

export function SubjectStudentCard({ subject, ...rest }: SubjectCardProps) {
  return (
    <button
      className="bg-accent/50 border-border group hover:bg-accent/70 h-fit w-full cursor-pointer overflow-hidden rounded-md border transition-colors data-[link=disabled]:cursor-default"
      {...rest}
    >
      <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full items-center justify-center transition-colors">
        <Blocks className="text-accent size-6" />
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-xs uppercase">Disciplina</span>
        <strong className="text-base first-letter:uppercase">
          {subject.name}
        </strong>
      </div>
    </button>
  )
}
