import type { Teacher, TeacherDepartment } from '@/types/teacher'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router'

type TeacherCardProps = {
  teacher: Teacher | TeacherDepartment
  to?: string
}

export function TeacherCard({ teacher, to }: TeacherCardProps) {
  return (
    <Link
      to={to || `${teacher.id}`}
      className="bg-accent/50 border-border group hover:bg-accent/70 h-fit w-full cursor-pointer overflow-hidden rounded-md border transition-colors"
    >
      <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full items-center justify-center transition-colors">
        <GraduationCap className="text-accent size-6" />
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-xs">PROFESSOR</span>
        <strong className="text-base first-letter:uppercase">
          {teacher.name}
        </strong>
      </div>
    </Link>
  )
}
