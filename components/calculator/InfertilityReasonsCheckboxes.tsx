import { Label } from '@/components/ui/label'
import { UserInputs } from '@/app/types/ivf'
import { INFERTILITY_REASON_OPTIONS, InfertilityReasonKey } from '@/app/utils/formConfig'

interface InfertilityReasonsCheckboxesProps {
  formData: Partial<UserInputs>
  onChange: (key: keyof UserInputs, checked: boolean) => void
  error?: string
}

export function InfertilityReasonsCheckboxes({
  formData,
  onChange,
  error,
}: InfertilityReasonsCheckboxesProps) {
  const isChecked = (key: InfertilityReasonKey): boolean => {
    return formData[key] === true
  }

  return (
    <div className="space-y-3">
      <Label>Infertility Reasons (select all that apply)</Label>
      <div className="space-y-2">
        {INFERTILITY_REASON_OPTIONS.map(({ key, label, helpText }) => (
          <div key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={key}
              checked={isChecked(key)}
              onChange={(e) => onChange(key, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
              aria-describedby={`${key}-help`}
              title={helpText}
            />
            <Label htmlFor={key} className="font-normal">
              {label}
              {key === 'unexplained_infertility' && (
                <span id={`${key}-help`} className="text-xs text-gray-500 ml-1">
                  (none of the above)
                </span>
              )}
            </Label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
