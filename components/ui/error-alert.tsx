import { cn } from '@/lib/utils'

interface ErrorAlertProps {
  message: string
  className?: string
}

/**
 * Standardized error alert component for consistent error display
 */
export function ErrorAlert({ message, className }: ErrorAlertProps) {
  return (
    <div className={cn('bg-red-50 border-2 border-red-200 rounded-xl p-4', className)}>
      <p className="text-red-700 text-sm">{message}</p>
    </div>
  )
}

interface FieldErrorProps {
  message?: string
}

/**
 * Inline field error text
 */
export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null
  return <p className="text-sm text-red-600">{message}</p>
}
