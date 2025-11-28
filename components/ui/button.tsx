import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-[#F86504] text-white hover:bg-[#E65A03] shadow-sm',
        secondary: 'bg-[#6086FF] text-white hover:bg-[#5077EE] shadow-sm',
        outline: 'border-2 border-[#F86504] bg-transparent text-[#F86504] hover:bg-[#F86504] hover:text-white',
        ghost: 'hover:bg-gray-100 text-gray-700',
      },
      size: {
        default: 'h-11 py-3 px-6',
        sm: 'h-9 px-4 rounded-lg',
        lg: 'h-13 px-8 rounded-xl text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
