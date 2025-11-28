'use client'

// External dependencies
import { useState, useMemo } from 'react'

// UI components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { FormField } from '@/components/ui/form-field'
import { Label } from '@/components/ui/label'
import { BackButton } from '@/components/ui/back-button'
import { ResultDisplay } from '@/components/ResultDisplay'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { InfertilityReasonsCheckboxes } from '@/components/calculator/InfertilityReasonsCheckboxes'
import { ValidationSummary } from '@/components/calculator/ValidationSummary'
import { LoadingCalculation } from '@/components/LoadingCalculation'

// Hooks
import { useIvfCalculator } from '@/hooks/useIvfCalculator'
import { useFormValidation } from '@/hooks/useFormValidation'

// Types and utilities
import { UserInputs, PriorCount } from '@/app/types/ivf'
import { formatErrorForUser } from '@/app/utils/errorMessages'
import {
  EGG_SOURCE_OPTIONS,
  PREVIOUS_IVF_OPTIONS,
  INFERTILITY_DIAGNOSIS_OPTIONS,
  PRIOR_COUNT_OPTIONS,
  getInfertilityReasonUpdates,
} from '@/app/utils/formConfig'

export default function CalculatorPage() {
  const { mutate, data, isPending, isError, error } = useIvfCalculator()
  const { errors: validationErrors, validate, clearError, hasErrors } = useFormValidation()
  const [showValidationSummary, setShowValidationSummary] = useState(false)

  const userFriendlyError = useMemo(() => {
    if (error) {
      return formatErrorForUser(error)
    }
    return null
  }, [error])

  const [formData, setFormData] = useState<Partial<UserInputs>>({
    tubal_factor: false,
    male_factor_infertility: false,
    endometriosis: false,
    ovulatory_disorder: false,
    diminished_ovarian_reserve: false,
    uterine_factor: false,
    other_reason: false,
    unexplained_infertility: false,
    prior_pregnancies: 0,
    prior_live_births: 0,
  })

  const updateField = <FieldKey extends keyof UserInputs>(
    key: FieldKey,
    value: UserInputs[FieldKey]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    clearError(key as string)
    // Hide validation summary when user starts fixing errors
    if (showValidationSummary) {
      setShowValidationSummary(false)
    }
  }

  const handleNumberChange = (
    key: 'age' | 'weight_lbs' | 'height_feet' | 'height_inches',
    value: string
  ) => {
    const numValue = value === '' ? undefined : parseInt(value)
    if (numValue !== undefined) {
      updateField(key, numValue)
    } else {
      updateField(key, numValue as never)
    }
  }

  const handleInfertilityReasonChange = (key: keyof UserInputs, checked: boolean) => {
    const updates = getInfertilityReasonUpdates(key, checked, formData)
    setFormData((prev) => ({ ...prev, ...updates }))
    clearError('infertility_reasons')
  }

  const scrollToFirstError = (errors: Record<string, string>) => {
    // Find the first field with an error in validation order
    const fieldOrder = [
      'age',
      'height_feet',
      'height_inches',
      'weight_lbs',
      'using_own_eggs',
      'attempted_ivf_previously',
      'is_reason_for_infertility_known',
      'infertility_reasons',
      'prior_pregnancies',
      'prior_live_births',
    ]

    for (const fieldName of fieldOrder) {
      if (errors[fieldName]) {
        // Try to find the field by various selectors
        const selectors = [
          `#${fieldName}`,
          `[name="${fieldName}"]`,
          `[data-field="${fieldName}"]`,
        ]

        for (const selector of selectors) {
          const element = document.querySelector(selector)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // Focus the element if it's focusable
            if (element instanceof HTMLElement && element.tabIndex >= 0) {
              setTimeout(() => element.focus(), 300)
            }
            return
          }
        }
      }
    }

    // Fallback: scroll to top if no field found
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validate(formData)
    if (errors) {
      setShowValidationSummary(true)
      // Scroll to first field with error
      setTimeout(() => scrollToFirstError(errors), 100)
      return
    }

    setShowValidationSummary(false)
    mutate(formData as UserInputs)
  }

  if (isPending) {
    return <LoadingCalculation />
  }

  if (data?.result) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <BackButton />
          <ResultDisplay result={data.result} />
          <Button onClick={() => window.location.reload()} className="w-full">
            New Calculation
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto">
        <BackButton />

        <Card>
          <CardHeader>
            <CardTitle>IVF Success Calculator</CardTitle>
            <CardDescription>
              Fill out all fields to calculate your success rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <ValidationSummary
                errors={validationErrors}
                show={showValidationSummary && hasErrors()}
              />

              {/* ============ AGE, HEIGHT, WEIGHT ============ */}

              <FormField
                id="age"
                label="Age (20-50)"
                type="number"
                min={20}
                max={50}
                value={formData.age}
                onChange={(val) => handleNumberChange('age', val)}
                error={validationErrors.age}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id="height-feet"
                  label="Height (feet)"
                  type="number"
                  min={4}
                  max={7}
                  value={formData.height_feet}
                  onChange={(val) => handleNumberChange('height_feet', val)}
                  error={validationErrors.height_feet}
                  required
                />
                <FormField
                  id="height-inches"
                  label="Height (inches)"
                  type="number"
                  min={0}
                  max={11}
                  value={formData.height_inches}
                  onChange={(val) => handleNumberChange('height_inches', val)}
                  error={validationErrors.height_inches}
                  required
                />
              </div>

              <FormField
                id="weight"
                label="Weight (lbs, 80-300)"
                type="number"
                min={80}
                max={300}
                value={formData.weight_lbs}
                onChange={(val) => handleNumberChange('weight_lbs', val)}
                error={validationErrors.weight_lbs}
                required
              />

              {/* ============ EGG & IVF HISTORY ============ */}

              <div id="using_own_eggs" className="space-y-3">
                <Label>Are you using your own eggs?</Label>
                <ButtonGroup
                  value={formData.using_own_eggs}
                  onValueChange={(val) => {
                    updateField('using_own_eggs', val as boolean)
                    // Clear attempted_ivf_previously when switching to donor eggs
                    if (val === false) {
                      updateField('attempted_ivf_previously', null)
                    }
                  }}
                  options={EGG_SOURCE_OPTIONS}
                  ariaLabel="Egg source selection"
                  error={validationErrors.using_own_eggs}
                />
              </div>

              {/* Previous IVF */}
              {formData.using_own_eggs && (
                <div id="attempted_ivf_previously" className="space-y-3">
                  <Label>Have you attempted IVF previously?</Label>
                  <ButtonGroup
                    value={formData.attempted_ivf_previously}
                    onValueChange={(val) => updateField('attempted_ivf_previously', val as boolean)}
                    options={PREVIOUS_IVF_OPTIONS}
                    error={validationErrors.attempted_ivf_previously}
                  />
                </div>
              )}

              {/* ============ INFERTILITY DIAGNOSIS ============ */}

              <div id="is_reason_for_infertility_known" className="space-y-3">
                <Label>Do you know the reason for infertility?</Label>
                <ButtonGroup
                  value={formData.is_reason_for_infertility_known}
                  onValueChange={(val) => updateField('is_reason_for_infertility_known', val as boolean)}
                  options={INFERTILITY_DIAGNOSIS_OPTIONS}
                  error={validationErrors.is_reason_for_infertility_known}
                />
              </div>

              {/* ============ INFERTILITY REASONS ============ */}

              {formData.is_reason_for_infertility_known && (
                <div id="infertility_reasons">
                  <InfertilityReasonsCheckboxes
                    formData={formData}
                    onChange={handleInfertilityReasonChange}
                    error={validationErrors.infertility_reasons}
                  />
                </div>
              )}

              {/* ============ PREGNANCY HISTORY ============ */}

              <div id="prior_pregnancies" className="space-y-3">
                <Label>How many times have you been pregnant?</Label>
                <ButtonGroup
                  value={formData.prior_pregnancies}
                  onValueChange={(val) => updateField('prior_pregnancies', val as PriorCount)}
                  options={PRIOR_COUNT_OPTIONS}
                  error={validationErrors.prior_pregnancies}
                />
              </div>

              <div id="prior_live_births" className="space-y-3">
                <Label>How many children have you given birth to?</Label>
                <ButtonGroup
                  value={formData.prior_live_births}
                  onValueChange={(val) => updateField('prior_live_births', val as PriorCount)}
                  options={PRIOR_COUNT_OPTIONS}
                  error={validationErrors.prior_live_births}
                />
              </div>

              {isError && userFriendlyError && (
                <ErrorDisplay error={userFriendlyError} />
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? 'Calculating...' : 'Calculate Success Rate'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
