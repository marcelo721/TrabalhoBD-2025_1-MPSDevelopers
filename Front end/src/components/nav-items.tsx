import type { ReactNode } from 'react'
import { useLocation } from 'react-router'

export type NavItemType = {
  label: string
  href: string
  icon?: ReactNode
}

export function NavItem({ label, href, icon }: NavItemType) {
  const { pathname } = useLocation()

  return (
    <a
      href={href}
      data-state={pathname.includes(href) ? 'active' : 'inactive'}
      className="hover:bg-accent/50 [&>svg]:text-muted-foreground hover:text-foreground bg-accent/10 data-[state=active]:bg-accent data-[state=active]:text-foreground data-[state=active]:hover:bg-accent/50 data-[state=active]:hover:text-foreground flex w-full items-center gap-2 rounded-md px-2 py-3 transition-colors [&>svg]:size-5 [&>svg]:shrink-0"
    >
      {icon}
      <span className="text-base font-medium">{label}</span>
    </a>
  )
}
