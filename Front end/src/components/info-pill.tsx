import { type IconNode } from 'lucide-react'
import type { ComponentProps, JSX } from 'react'

type InfoPillProps = {
  label: string
  value?: string | number
  icon?: JSX.Element | IconNode
} & ComponentProps<'button'>

export function InfoPill({
  label,
  value,
  icon: Icon,
  ...props
}: InfoPillProps) {
  return (
    <button
      className="text-accent-foreground bg-accent border-border flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-tight uppercase [&>svg]:size-2.5"
      {...props}
    >
      <span>{`${label}: ${value}`}</span>
      {Icon}
    </button>
  )
}
