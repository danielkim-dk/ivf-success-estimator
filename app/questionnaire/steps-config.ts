import { UserInputs } from '../types/ivf'
import {
  INFERTILITY_REASON_OPTIONS,
  EGG_SOURCE_OPTIONS,
  PREVIOUS_IVF_OPTIONS,
  INFERTILITY_DIAGNOSIS_OPTIONS,
  PRIOR_COUNT_OPTIONS,
  InfertilityReasonKey,
} from '../utils/formConfig'

export interface StepConfig {
  id: number
  title: string
  description?: string
  type: 'radio' | 'number' | 'height-weight' | 'checkboxes' | 'review'
  field?: keyof UserInputs
  fields?: Array<keyof UserInputs>
  options?: Array<{
    value: string | boolean | number
    label: string
  }>
  checkboxOptions?: Array<{
    key: InfertilityReasonKey
    label: string
  }>
  conditionalRender?: (inputs: Partial<UserInputs>) => boolean
  min?: number
  max?: number
  placeholder?: string
  helpText?: string
}

export const questionnaireSteps: StepConfig[] = [
  // ============ AGE, HEIGHT, WEIGHT ============
  {
    id: 0,
    title: 'Your Age',
    type: 'number',
    field: 'age',
    min: 20,
    max: 50,
    placeholder: 'Enter your age',
    helpText: 'Please enter an age between 20 and 50',
  },
  {
    id: 1,
    title: 'Height and Weight',
    type: 'height-weight',
    fields: ['height_feet', 'height_inches', 'weight_lbs'],
  },
  // ============ EGG & IVF HISTORY ============
  {
    id: 2,
    title: 'Egg Source',
    description: 'Are you using your own eggs for IVF?',
    type: 'radio',
    field: 'using_own_eggs',
    options: EGG_SOURCE_OPTIONS,
  },
  {
    id: 3,
    title: 'Previous IVF Experience',
    description: 'Have you attempted IVF before?',
    type: 'radio',
    field: 'attempted_ivf_previously',
    conditionalRender: (inputs) => inputs.using_own_eggs === true,
    options: PREVIOUS_IVF_OPTIONS,
  },
  // ============ INFERTILITY DIAGNOSIS ============
  {
    id: 4,
    title: 'Infertility Diagnosis',
    description: 'Do you know the reason for infertility?',
    type: 'radio',
    field: 'is_reason_for_infertility_known',
    options: INFERTILITY_DIAGNOSIS_OPTIONS,
  },
  {
    id: 5,
    title: 'Infertility Reasons',
    description: 'Select all diagnoses that apply to you',
    type: 'checkboxes',
    conditionalRender: (inputs) => inputs.is_reason_for_infertility_known === true,
    checkboxOptions: INFERTILITY_REASON_OPTIONS.map(({ key, label }) => ({ key, label })),
  },
  // ============ PREGNANCY HISTORY ============
  {
    id: 6,
    title: 'Prior Pregnancies',
    description: 'How many times have you been pregnant?',
    type: 'radio',
    field: 'prior_pregnancies',
    options: PRIOR_COUNT_OPTIONS,
  },
  {
    id: 7,
    title: 'Prior Live Births',
    description: 'How many children have you given birth to?',
    type: 'radio',
    field: 'prior_live_births',
    options: PRIOR_COUNT_OPTIONS,
  },
  // ============ REVIEW ============
  {
    id: 8,
    title: 'Review Your Information',
    description: 'Please review your answers before calculating',
    type: 'review',
  },
]
