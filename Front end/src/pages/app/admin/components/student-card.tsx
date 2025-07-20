import type { Student, StudentCourse } from '@/types/students'
import { User } from 'lucide-react'
import { Link } from 'react-router'

type StudentCardProps = {
  student: Student | StudentCourse
  to?: string
}

export function StudentCard({ student, to }: StudentCardProps) {
  return (
    <Link
      to={to || `${student.code}`}
      className="bg-accent/50 border-border group hover:bg-accent/70 h-fit w-full cursor-pointer overflow-hidden rounded-md border transition-colors"
    >
      <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full items-center justify-center transition-colors">
        <User className="text-accent size-6" />
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-xs uppercase">Estudante</span>
        <strong className="text-base first-letter:uppercase">
          {student.name}
        </strong>
      </div>
    </Link>
  )
}
