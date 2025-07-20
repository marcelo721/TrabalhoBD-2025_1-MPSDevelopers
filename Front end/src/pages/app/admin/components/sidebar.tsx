import { Logo } from '@/assets/logo'
import { NavItem, type NavItemType } from '@/components/nav-items'
import { ModeToggle } from '@/components/theme-toggle'
import { UserAccountCard } from '@/components/user-account-card'
import {
  Album,
  Blocks,
  Building2,
  Contact,
  GraduationCap,
  User,
} from 'lucide-react'

const items: NavItemType[] = [
  {
    label: 'Departamento',
    href: '/admin/departments',
    icon: <Building2 />,
  },
  {
    label: 'Estudantes',
    href: '/admin/students',
    icon: <User />,
  },
  {
    label: 'Professores',
    href: '/admin/teachers',
    icon: <GraduationCap />,
  },
  {
    label: 'Empregados',
    href: '/admin/employees',
    icon: <Contact />,
  },
  {
    label: 'Cursos',
    href: '/admin/courses',
    icon: <Album />,
  },
  {
    label: 'Disciplinas',
    href: '/admin/subjects',
    icon: <Blocks />,
  },
]

export function Sidebar() {
  return (
    <aside className="border-border flex h-full w-56 shrink-0 flex-col items-start border-r px-4 py-4">
      <Logo className="h-10" />

      <ul className="mt-6 flex w-full flex-col gap-1">
        {items.map((item) => (
          <li key={item.href} className="h-fit w-full">
            <NavItem label={item.label} href={item.href} icon={item.icon} />
          </li>
        ))}
      </ul>
      <div className="mt-auto flex w-full flex-col gap-2">
        <ModeToggle />
        <UserAccountCard className="w-full" />
      </div>
    </aside>
  )
}
