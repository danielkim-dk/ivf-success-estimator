import { UserInputs } from '../types/ivf'
import { VALIDATION_CONSTRAINTS, PRIOR_COUNT_OPTIONS } from './validationConfig'

export interface ValidationError {
  field: string
  message: string
}

export function validateUserInputs(inputs: Partial<UserInputs>): ValidationError[] {
  const errors: ValidationError[] = []

  // Egg source
  if (inputs.using_own_eggs === undefined || inputs.using_own_eggs === null) {
    errors.push({ field: 'using_own_eggs', message: 'Please let us know if you are using your own eggs' })
  }

  // Previous IVF (only if using own eggs)
  if (inputs.using_own_eggs === true) {
    if (inputs.attempted_ivf_previously === undefined || inputs.attempted_ivf_previously === null) {
      errors.push({ field: 'attempted_ivf_previously', message: 'Please let us know if you have tried IVF before' })
    }
  }

  // Infertility reason known
  if (inputs.is_reason_for_infertility_known === undefined || inputs.is_reason_for_infertility_known === null) {
    errors.push({ field: 'is_reason_for_infertility_known', message: 'Please let us know if you have an infertility diagnosis' })
  }

  // Age
  if (inputs.age === undefined || inputs.age === null) {
    errors.push({ field: 'age', message: 'Please enter your age' })
  } else if (inputs.age < VALIDATION_CONSTRAINTS.age.min || inputs.age > VALIDATION_CONSTRAINTS.age.max) {
    errors.push({ field: 'age', message: VALIDATION_CONSTRAINTS.age.errorMessage })
  }

  // Height
  if (inputs.height_feet === undefined || inputs.height_feet === null) {
    errors.push({ field: 'height_feet', message: 'Please enter your height in feet' })
  } else if (inputs.height_feet < VALIDATION_CONSTRAINTS.height_feet.min || inputs.height_feet > VALIDATION_CONSTRAINTS.height_feet.max) {
    errors.push({ field: 'height_feet', message: VALIDATION_CONSTRAINTS.height_feet.errorMessage })
  }

  if (inputs.height_inches === undefined || inputs.height_inches === null) {
    errors.push({ field: 'height_inches', message: 'Please enter the remaining inches of your height' })
  } else if (inputs.height_inches < VALIDATION_CONSTRAINTS.height_inches.min || inputs.height_inches > VALIDATION_CONSTRAINTS.height_inches.max) {
    errors.push({ field: 'height_inches', message: VALIDATION_CONSTRAINTS.height_inches.errorMessage })
  }

  // Weight
  if (inputs.weight_lbs === undefined || inputs.weight_lbs === null) {
    errors.push({ field: 'weight_lbs', message: 'Please enter your weight' })
  } else if (inputs.weight_lbs < VALIDATION_CONSTRAINTS.weight_lbs.min || inputs.weight_lbs > VALIDATION_CONSTRAINTS.weight_lbs.max) {
    errors.push({ field: 'weight_lbs', message: VALIDATION_CONSTRAINTS.weight_lbs.errorMessage })
  }

  // Infertility reasons (if reason is known)
  if (inputs.is_reason_for_infertility_known === true) {
    const hasAnyReason =
      inputs.tubal_factor ||
      inputs.male_factor_infertility ||
      inputs.endometriosis ||
      inputs.ovulatory_disorder ||
      inputs.diminished_ovarian_reserve ||
      inputs.uterine_factor ||
      inputs.other_reason ||
      inputs.unexplained_infertility

    if (!hasAnyReason) {
      errors.push({ field: 'infertility_reasons', message: 'Please select at least one reason for infertility' })
    }
  }

  // Prior pregnancies
  if (inputs.prior_pregnancies === undefined || inputs.prior_pregnancies === null) {
    errors.push({ field: 'prior_pregnancies', message: 'Please let us know how many times you have been pregnant' })
  }

  // Prior live births
  if (inputs.prior_live_births === undefined || inputs.prior_live_births === null) {
    errors.push({ field: 'prior_live_births', message: 'Please let us know how many children you have given birth to' })
  }

  // Cross-field validation (prior live births vs pregnancies)
  if (inputs.prior_pregnancies !== undefined && inputs.prior_live_births !== undefined) {
    const pregIndex = PRIOR_COUNT_OPTIONS.indexOf(inputs.prior_pregnancies)
    const birthIndex = PRIOR_COUNT_OPTIONS.indexOf(inputs.prior_live_births)

    if (birthIndex > pregIndex) {
      errors.push({
        field: 'prior_live_births',
        message: 'The number of children born cannot be more than total pregnancies',
      })
    }
  }

  return errors
}

export function canSubmitForm(inputs: Partial<UserInputs>): boolean {
  const errors = validateUserInputs(inputs)
  return errors.length === 0
}
