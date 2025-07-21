import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ComponentProps } from 'react'

export type Options = {
  value: string
  label: string
}

type FormSelectProps = ComponentProps<typeof Select> & {
  placeholder?: string
  options: Options[]
}

export function FormSelect({
  placeholder,
  options,
  ...props
}: FormSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
