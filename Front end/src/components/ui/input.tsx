import { cn } from '@/lib/utils'
import { Eye, EyeClosed } from 'lucide-react'
import { useState, type ComponentProps } from 'react'

type InputButtonProps = ComponentProps<'button'>
function InputButton({ children, ...rest }: InputButtonProps) {
  return (
    <button
      type="button"
      className="absolute top-1/2 right-3 -translate-y-1/2"
      {...rest}
    >
      {children}
    </button>
  )
}

type InputProps = ComponentProps<'input'> & {
  error?: string
}

function Input({ className, type, ...props }: InputProps) {
  const [currentType, setCurrentType] = useState(type || 'text')

  return (
    <div className="relative h-fit w-full">
      <input
        type={currentType}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {type === 'password' &&
        (currentType === 'password' ? (
          <InputButton
            onClick={() =>
              setCurrentType(currentType === 'password' ? 'text' : 'password')
            }
          >
            <Eye className="size-4.5" />
          </InputButton>
        ) : (
          <InputButton
            onClick={() =>
              setCurrentType(currentType === 'password' ? 'text' : 'password')
            }
          >
            <EyeClosed className="size-4.5" />
          </InputButton>
        ))}
    </div>
  )
}

export { Input }
