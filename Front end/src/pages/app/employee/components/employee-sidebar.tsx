import { Logo } from '@/assets/logo'
import { NavItem, type NavItemType } from '@/components/nav-items'
import { ModeToggle } from '@/components/theme-toggle'
import { UserAccountCard } from '@/components/user-account-card'
import { Album, Building2, GraduationCap } from 'lucide-react'

const items: NavItemType[] = [
  {
    label: 'Departamento',
    href: '/employee/department',
    icon: <Building2 />,
  },
  // Pode ver todos os professores e criar professor (apenas do seu departamento)
  {
    label: 'Professores',
    href: '/employee/teachers',
    icon: <GraduationCap />,
  },
  // Pode ver todos os cursos e criar curso (apenas do seu departamento)
  {
    label: 'Cursos',
    href: '/employee/courses',
    icon: <Album />,
  },
]

export function EmployeeSidebar() {
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
