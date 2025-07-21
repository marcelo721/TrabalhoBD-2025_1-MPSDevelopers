import type { Department } from '@/types/department'
import { Building2 } from 'lucide-react'
import { Link } from 'react-router'

type DepartmentCardProps = {
  department: Department
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link
      to={`${department.code}`}
      className="bg-accent/50 border-border group hover:bg-accent/70 w-full cursor-pointer overflow-hidden rounded-md border transition-colors"
    >
      <div className="bg-primary group-hover:bg-primary/90 flex h-12 w-full items-center justify-center transition-colors">
        <Building2 className="text-accent size-6" />
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-xs">DEPARTAMENTO</span>
        <strong className="text-base first-letter:uppercase">
          {department.name}
        </strong>
      </div>
    </Link>
  )
}
