import { UserInputs } from '@/app/types/ivf'

/**
 * Type for infertility reason field keys (boolean fields only)
 */
export type InfertilityReasonKey =
  | 'tubal_factor'
  | 'male_factor_infertility'
  | 'endometriosis'
  | 'ovulatory_disorder'
  | 'diminished_ovarian_reserve'
  | 'uterine_factor'
  | 'other_reason'
  | 'unexplained_infertility'

/**
 * Shared configuration for infertility reason options
 * Used by both calculator and questionnaire forms
 */
export const INFERTILITY_REASON_OPTIONS: ReadonlyArray<{
  key: InfertilityReasonKey
  label: string
  helpText: string
}> = [
  { key: 'tubal_factor', label: 'Tubal Factor', helpText: 'Blockage or damage to fallopian tubes' },
  { key: 'male_factor_infertility', label: 'Male Factor Infertility', helpText: 'Issues with sperm quality or quantity' },
  { key: 'endometriosis', label: 'Endometriosis', helpText: 'Tissue similar to uterine lining grows outside the uterus' },
  { key: 'ovulatory_disorder', label: 'Ovulatory Disorder', helpText: 'Problems with egg release from ovaries' },
  { key: 'diminished_ovarian_reserve', label: 'Diminished Ovarian Reserve', helpText: 'Fewer eggs available than expected for your age' },
  { key: 'uterine_factor', label: 'Uterine Factor', helpText: 'Structural issues with the uterus' },
  { key: 'other_reason', label: 'Other Reason', helpText: 'Another diagnosed cause not listed above' },
  { key: 'unexplained_infertility', label: 'Unexplained Infertility', helpText: 'No specific cause was identified' },
]

/**
 * Keys for all infertility reason fields
 */
export const INFERTILITY_REASON_KEYS: InfertilityReasonKey[] = INFERTILITY_REASON_OPTIONS.map(option => option.key)

/**
 * Prior count options used for pregnancies and live births
 */
export const PRIOR_COUNT_OPTIONS = [
  { value: 0 as const, label: 'None' },
  { value: 1 as const, label: '1' },
  { value: '2+' as const, label: '2 or more' },
]

/**
 * Egg source options
 */
export const EGG_SOURCE_OPTIONS = [
  { value: true, label: 'Yes, using my own eggs' },
  { value: false, label: 'No, using donor eggs' },
]

/**
 * Previous IVF attempt options
 */
export const PREVIOUS_IVF_OPTIONS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
]

/**
 * Infertility diagnosis known options
 */
export const INFERTILITY_DIAGNOSIS_OPTIONS = [
  { value: true, label: 'Yes, I have been diagnosed' },
  { value: false, label: 'No, the cause is unknown' },
]

/**
 * Parse string input to number, returning undefined for empty strings
 */
export function parseNumberInput(value: string): number | undefined {
  return value === '' ? undefined : parseInt(value, 10)
}

/**
 * Handle "unexplained infertility" mutual exclusivity logic
 * When unexplained is selected, all other reasons are cleared
 * When any other reason is selected, unexplained is cleared
 */
export function getInfertilityReasonUpdates(
  key: keyof UserInputs,
  checked: boolean,
  currentValues: Partial<UserInputs>
): Partial<UserInputs> {
  if (key === 'unexplained_infertility' && checked) {
    // Clear all other reasons when unexplained is selected
    return {
      tubal_factor: false,
      male_factor_infertility: false,
      endometriosis: false,
      ovulatory_disorder: false,
      diminished_ovarian_reserve: false,
      uterine_factor: false,
      other_reason: false,
      unexplained_infertility: true,
    }
  } else if (key !== 'unexplained_infertility' && checked) {
    // Clear unexplained when any specific reason is selected
    return {
      ...currentValues,
      [key]: true,
      unexplained_infertility: false,
    }
  } else {
    // Simple toggle
    return {
      ...currentValues,
      [key]: checked,
    }
  }
}
