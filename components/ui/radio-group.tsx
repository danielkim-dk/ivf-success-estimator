import * as React from 'react'
import { cn } from '@/lib/utils'

interface RadioGroupProps {
  value?: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onValueChange, children, className }, ref) => {
    return (
      <div ref={ref} className={cn('grid gap-2', className)} role="radiogroup">
        {React.Children.map(children, (child) => {
          if (React.isValidElement<RadioGroupItemProps>(child)) {
            return React.cloneElement(child, {
              checked: child.props.value === value,
              onCheckedChange: () => onValueChange(child.props.value),
            })
          }
          return child
        })}
      </div>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

interface RadioGroupItemProps {
  value: string
  id: string
  checked?: boolean
  onCheckedChange?: () => void
  className?: string
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ checked, onCheckedChange, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        onClick={onCheckedChange}
        className={cn(
          'aspect-square h-5 w-5 rounded-full border-2 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F86504] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-all',
          checked ? 'border-[#F86504] bg-[#F86504]' : 'border-gray-300 bg-white',
          className
        )}
      >
        {checked && (
          <div className="h-2 w-2 rounded-full bg-white" />
        )}
      </button>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
