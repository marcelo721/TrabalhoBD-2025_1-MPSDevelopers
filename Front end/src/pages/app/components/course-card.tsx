import type { Course, CourseDepartment } from '@/types/course'
import { Album } from 'lucide-react'
import { Link } from 'react-router'

type CourseCardProps = {
  course: Course | CourseDepartment
  to?: string
  isLinkDisabled?: boolean
}

export function CourseCard({
  course,
  to,
  isLinkDisabled = false,
}: CourseCardProps) {
  return (
    <Link
      to={!isLinkDisabled ? to || `${course.code}` : ''}
      className="bg-accent/50 border-border group hover:bg-accent/70 h-fit w-full cursor-pointer overflow-hidden rounded-md border transition-colors data-[link=disabled]:cursor-default"
      data-link={!isLinkDisabled ? 'enabled' : 'disabled'}
    >
      <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full items-center justify-center transition-colors">
        <Album className="text-accent size-6" />
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-xs">CURSO</span>
        <strong className="text-base first-letter:uppercase">
          {course.name}
        </strong>
      </div>
    </Link>
  )
}
