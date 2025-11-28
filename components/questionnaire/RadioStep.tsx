import { ButtonGroup } from '../ui/button-group'
import { UserInputs } from '@/app/types/ivf'

interface RadioStepProps {
  field: keyof UserInputs
  value: string | boolean | number | null | undefined
  options: Array<{ value: string | boolean | number; label: string }>
  onChange: <K extends keyof UserInputs>(field: K, value: UserInputs[K]) => void
}

/**
 * Radio button step component for single-choice questions
 */
export function RadioStep({ field, value, options, onChange }: RadioStepProps) {
  return (
    <div className="space-y-4">
      <ButtonGroup
        value={value}
        onValueChange={(val) => onChange(field, val as UserInputs[typeof field])}
        options={options}
      />
    </div>
  )
}
