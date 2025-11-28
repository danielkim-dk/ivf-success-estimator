import { Input } from './input'
import { Label } from './label'

interface FormFieldProps {
  id: string
  label: string
  type?: 'text' | 'number'
  value: string | number | undefined
  onChange: (value: string) => void
  error?: string
  min?: number
  max?: number
  required?: boolean
  className?: string
}

export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  min,
  max,
  required = false,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        min={min}
        max={max}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
        required={required}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
