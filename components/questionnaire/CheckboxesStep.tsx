import { Label } from '../ui/label'
import { UserInputs } from '@/app/types/ivf'

interface CheckboxesStepProps {
  options: Array<{ key: keyof UserInputs; label: string }>
  values: Partial<UserInputs>
  onChange: <K extends keyof UserInputs>(field: K, value: UserInputs[K]) => void
}

/** Keys for specific infertility reasons (excludes unexplained) */
const infertilityReasonKeys: Array<keyof UserInputs> = [
  'tubal_factor',
  'male_factor_infertility',
  'endometriosis',
  'ovulatory_disorder',
  'diminished_ovarian_reserve',
  'uterine_factor',
  'other_reason',
]

/**
 * Checkbox step component for selecting multiple infertility reasons
 * Handles mutual exclusivity between "unexplained" and specific reasons
 */
export function CheckboxesStep({ options, values, onChange }: CheckboxesStepProps) {
  /** Handle checkbox changes with mutual exclusivity logic */
  const handleCheckboxChange = (key: keyof UserInputs, checked: boolean) => {
    if (key === 'unexplained_infertility' && checked) {
      infertilityReasonKeys.forEach((reasonKey) => {
        onChange(reasonKey, false)
      })
      onChange('unexplained_infertility', true)
    } else if (key === 'unexplained_infertility' && !checked) {
      onChange('unexplained_infertility', false)
    } else {
      if (checked) {
        onChange('unexplained_infertility', false)
      }
      onChange(key, checked)
    }
  }

  return (
    <div className="space-y-3">
      {options.map(({ key, label }) => (
        <div key={key} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={key}
            checked={(values[key] as boolean) ?? false}
            onChange={(e) => handleCheckboxChange(key, e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor={key} className="font-normal">
            {label}
            {key === 'unexplained_infertility' && (
              <span className="text-xs text-gray-500 ml-1">(none of the above)</span>
            )}
          </Label>
        </div>
      ))}
    </div>
  )
}
