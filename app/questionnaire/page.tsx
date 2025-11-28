'use client'

// External dependencies
import { useMemo } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// UI components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StepProgress } from '@/components/ui/step-progress'
import { BackButton } from '@/components/ui/back-button'
import { ErrorAlert } from '@/components/ui/error-alert'
import { ResultDisplay } from '@/components/ResultDisplay'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { LoadingCalculation } from '@/components/LoadingCalculation'
import { RadioStep } from '@/components/questionnaire/RadioStep'
import { NumberStep } from '@/components/questionnaire/NumberStep'
import { HeightWeightStep } from '@/components/questionnaire/HeightWeightStep'
import { CheckboxesStep } from '@/components/questionnaire/CheckboxesStep'
import { ReviewStep } from '@/components/questionnaire/ReviewStep'

// Hooks
import { useIvfCalculator } from '@/hooks/useIvfCalculator'
import { useQuestionnaireFlow } from '@/hooks/useQuestionnaireFlow'
import { useFormValidation } from '@/hooks/useFormValidation'

// Types and utilities
import { UserInputs, PriorCount } from '@/app/types/ivf'
import { formatErrorForUser } from '@/app/utils/errorMessages'
import { VALIDATION_CONSTRAINTS, ValidationConstraintKey } from '@/app/utils/validationConfig'
import { questionnaireSteps, StepConfig } from './steps-config'

const TOTAL_STEPS = questionnaireSteps.length

export default function QuestionnairePage() {
  const { mutate, data, isPending, isError, error } = useIvfCalculator()
  const { currentStep, inputs, updateInput, nextStep, previousStep } =
    useQuestionnaireFlow()
  const { validate } = useFormValidation()

  const currentStepConfig = questionnaireSteps[currentStep]

  const userFriendlyError = useMemo(() => {
    if (error) {
      return formatErrorForUser(error)
    }
    return null
  }, [error])

  // Memoized validation error for current step
  const stepValidationError = useMemo(() => {
    if (currentStepConfig.field !== 'prior_live_births') {
      return null
    }

    const pregnancies = inputs.prior_pregnancies
    const liveBirths = inputs.prior_live_births

    if (pregnancies === undefined || liveBirths === undefined) {
      return null
    }

    const pregnancyOrder: PriorCount[] = [0, 1, '2+']
    const pregIndex = pregnancyOrder.indexOf(pregnancies)
    const birthIndex = pregnancyOrder.indexOf(liveBirths)

    if (birthIndex > pregIndex) {
      return 'The number of children born cannot be more than total pregnancies'
    }

    return null
  }, [currentStepConfig.field, inputs.prior_pregnancies, inputs.prior_live_births])

  // Memoized canAdvance check
  const canAdvance = useMemo(() => {
    // Skip validation for conditionally hidden steps
    if (currentStepConfig.conditionalRender && !currentStepConfig.conditionalRender(inputs)) {
      return true
    }

    // Single field validation
    if (currentStepConfig.field) {
      const value = inputs[currentStepConfig.field]
      if (value === undefined || value === null) return false

      if (currentStepConfig.min !== undefined && typeof value === 'number' && value < currentStepConfig.min) {
        return false
      }
      if (currentStepConfig.max !== undefined && typeof value === 'number' && value > currentStepConfig.max) {
        return false
      }

      if (stepValidationError) {
        return false
      }
    }

    // Multiple fields validation (e.g., height-weight step)
    if (currentStepConfig.fields) {
      const allFieldsValid = currentStepConfig.fields.every(fieldKey => {
        const value = inputs[fieldKey]

        if (value === undefined || value === null) return false

        if (typeof value === 'number') {
          const constraints = VALIDATION_CONSTRAINTS[fieldKey as ValidationConstraintKey]
          if (constraints && (value < constraints.min || value > constraints.max)) {
            return false
          }
        }

        return true
      })

      if (!allFieldsValid) return false

      if (stepValidationError) {
        return false
      }
    }

    // Checkbox steps require at least one selection
    if (currentStepConfig.type === 'checkboxes' && currentStepConfig.checkboxOptions) {
      const hasAnySelected = currentStepConfig.checkboxOptions.some(
        (option) => inputs[option.key] === true
      )
      if (!hasAnySelected) return false
    }

    return true
  }, [currentStepConfig, inputs, stepValidationError])

  const handleSubmit = () => {
    const errors = validate(inputs)
    if (errors) {
      return
    }
    mutate(inputs as UserInputs)
  }

  const renderStepContent = (stepConfig: StepConfig) => {
    // Handle conditionally hidden steps
    if (stepConfig.conditionalRender && !stepConfig.conditionalRender(inputs)) {
      return (
        <p className="text-gray-600">
          This question is not applicable based on your previous answers.
        </p>
      )
    }

    switch (stepConfig.type) {
      case 'radio':
        if (!stepConfig.field || !stepConfig.options) return null
        return (
          <RadioStep
            field={stepConfig.field}
            value={inputs[stepConfig.field]}
            options={stepConfig.options}
            onChange={updateInput}
          />
        )

      case 'number':
        return (
          <NumberStep
            field={stepConfig.field}
            fields={stepConfig.fields}
            values={inputs}
            min={stepConfig.min}
            max={stepConfig.max}
            placeholder={stepConfig.placeholder}
            helpText={stepConfig.helpText}
            onChange={updateInput}
          />
        )

      case 'height-weight':
        return <HeightWeightStep values={inputs} onChange={updateInput} />

      case 'checkboxes':
        if (!stepConfig.checkboxOptions) return null
        return (
          <CheckboxesStep
            options={stepConfig.checkboxOptions}
            values={inputs}
            onChange={updateInput}
          />
        )

      case 'review':
        return <ReviewStep inputs={inputs} />

      default:
        return null
    }
  }

  // Loading state
  if (isPending) {
    return <LoadingCalculation />
  }

  // Result state
  if (data?.result) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <BackButton />
          <ResultDisplay result={data.result} />
          <Button onClick={() => window.location.reload()} className="w-full">
            Start Over
          </Button>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* ============ BACK NAVIGATION ============ */}
        <BackButton />

        <Card>
          <CardHeader>
            {/* ============ PROGRESS INDICATOR ============ */}
            <StepProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            <CardTitle className="mt-4">{currentStepConfig.title}</CardTitle>
            {currentStepConfig.description && (
              <p className="text-sm text-gray-600 mt-2">{currentStepConfig.description}</p>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* ============ STEP CONTENT ============ */}
            {renderStepContent(currentStepConfig)}

            {/* ============ VALIDATION ERRORS ============ */}
            {stepValidationError && (
              <ErrorAlert message={stepValidationError} />
            )}

            {isError && userFriendlyError && (
              <ErrorDisplay error={userFriendlyError} />
            )}

            {/* ============ NAVIGATION BUTTONS ============ */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < TOTAL_STEPS - 1 ? (
                <Button onClick={nextStep} disabled={!canAdvance}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!canAdvance}>
                  Calculate
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
