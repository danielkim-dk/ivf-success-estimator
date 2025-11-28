import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UserInputs } from '@/app/types/ivf'
import { VALIDATION_CONSTRAINTS } from '@/app/utils/validationConfig'

interface HeightWeightStepProps {
  values: Partial<UserInputs>
  onChange: <K extends keyof UserInputs>(field: K, value: UserInputs[K]) => void
}

/**
 * Combined height and weight input step
 * Displays height (feet/inches) and weight (lbs) inputs with inline validation
 */
export function HeightWeightStep({ values, onChange }: HeightWeightStepProps) {
  const handleNumberChange = (field: keyof UserInputs, value: string) => {
    const numValue = value === '' ? undefined : parseInt(value)
    onChange(field, numValue as UserInputs[typeof field])
  }

  const { height_feet, height_inches, weight_lbs } = VALIDATION_CONSTRAINTS

  const heightFeetError =
    values.height_feet !== undefined &&
    (values.height_feet < height_feet.min || values.height_feet > height_feet.max)
      ? height_feet.errorMessage
      : undefined

  const heightInchesError =
    values.height_inches !== undefined &&
    (values.height_inches < height_inches.min || values.height_inches > height_inches.max)
      ? height_inches.errorMessage
      : undefined

  const weightError =
    values.weight_lbs !== undefined &&
    (values.weight_lbs < weight_lbs.min || values.weight_lbs > weight_lbs.max)
      ? weight_lbs.errorMessage
      : undefined

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>What is your height?</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Input
              type="number"
              min={height_feet.min}
              max={height_feet.max}
              value={values.height_feet ?? ''}
              onChange={(e) => handleNumberChange('height_feet', e.target.value)}
              placeholder="Feet"
              className={heightFeetError ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {heightFeetError && (
              <p className="text-sm text-red-600">{heightFeetError}</p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              type="number"
              min={height_inches.min}
              max={height_inches.max}
              value={values.height_inches ?? ''}
              onChange={(e) => handleNumberChange('height_inches', e.target.value)}
              placeholder="Inches"
              className={heightInchesError ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {heightInchesError && (
              <p className="text-sm text-red-600">{heightInchesError}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">What is your weight? (lbs)</Label>
        <Input
          id="weight"
          type="number"
          min={weight_lbs.min}
          max={weight_lbs.max}
          value={values.weight_lbs ?? ''}
          onChange={(e) => handleNumberChange('weight_lbs', e.target.value)}
          placeholder={`Enter weight (${weight_lbs.min}-${weight_lbs.max} lbs)`}
          className={weightError ? 'border-red-500 focus-visible:ring-red-500' : ''}
        />
        {weightError ? (
          <p className="text-sm text-red-600">{weightError}</p>
        ) : (
          <p className="text-sm text-gray-500">{weight_lbs.errorMessage}</p>
        )}
      </div>
    </div>
  )
}
