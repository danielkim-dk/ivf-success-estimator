import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UserInputs } from '@/app/types/ivf'

interface NumberStepProps {
  field?: keyof UserInputs
  fields?: Array<keyof UserInputs>
  values: Partial<UserInputs>
  min?: number
  max?: number
  placeholder?: string
  helpText?: string
  onChange: <K extends keyof UserInputs>(field: K, value: UserInputs[K]) => void
}

/**
 * Number input step component for numeric values like age
 * Supports single field or multiple fields mode
 */
export function NumberStep({
  field,
  fields,
  values,
  min,
  max,
  placeholder,
  helpText,
  onChange,
}: NumberStepProps) {
  const handleNumberChange = (field: keyof UserInputs, value: string) => {
    const numValue = value === '' ? undefined : parseInt(value)
    onChange(field, numValue as UserInputs[typeof field])
  }

  const getValidationError = (f: keyof UserInputs): string | undefined => {
    if (f === 'prior_live_births' && values.prior_pregnancies !== undefined && values.prior_live_births !== undefined) {
      if (values.prior_live_births > values.prior_pregnancies) {
        return 'Live births cannot exceed prior pregnancies'
      }
    }
    return undefined
  }

  if (fields && fields.length > 1) {
    return (
      <div className="space-y-4">
        {fields.map((f) => {
          const fieldLabels: Record<string, string> = {
            prior_pregnancies: 'How many prior pregnancies have you had?',
            prior_live_births: 'How many prior live births have you had?',
          }

          const error = getValidationError(f)

          return (
            <div key={f} className="space-y-2">
              <Label htmlFor={f}>{fieldLabels[f] || f}</Label>
              <Input
                id={f}
                type="number"
                min={0}
                value={(values[f] as number) ?? ''}
                onChange={(e) => handleNumberChange(f, e.target.value)}
                placeholder="0"
                className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  if (!field) return null

  const value = values[field] as number | undefined
  const error =
    value !== undefined && min !== undefined && max !== undefined && (value < min || value > max)
      ? `Value must be between ${min} and ${max}`
      : undefined

  return (
    <div className="space-y-2">
      <Label htmlFor={field}>What is your {field}?</Label>
      <Input
        id={field}
        type="number"
        min={min}
        max={max}
        value={value ?? ''}
        onChange={(e) => handleNumberChange(field, e.target.value)}
        placeholder={placeholder}
        className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
      />
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        helpText && <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  )
}
