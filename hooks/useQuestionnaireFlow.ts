import { useState } from 'react'
import { UserInputs } from '@/app/types/ivf'

/**
 * Hook for managing the multi-step questionnaire flow
 * Tracks current step, user inputs, and provides navigation functions
 */
export function useQuestionnaireFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<Partial<UserInputs>>({
    tubal_factor: false,
    male_factor_infertility: false,
    endometriosis: false,
    ovulatory_disorder: false,
    diminished_ovarian_reserve: false,
    uterine_factor: false,
    other_reason: false,
    unexplained_infertility: false,
  })

  /** Update a single input field value */
  const updateInput = <InputFieldKey extends keyof UserInputs>(
    key: InputFieldKey,
    value: UserInputs[InputFieldKey]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  /** Navigation functions */
  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const previousStep = () => setCurrentStep((prev) => Math.max(0, prev - 1))
  const goToStep = (step: number) => setCurrentStep(step)

  return {
    currentStep,
    inputs,
    updateInput,
    nextStep,
    previousStep,
    goToStep,
  }
}
