export interface FormulaRow {
  param_using_own_eggs: boolean
  param_attempted_ivf_previously: boolean | 'N/A'
  param_is_reason_for_infertility_known: boolean
  cdc_formula: string
  formula_intercept: number
  formula_age_linear_coefficient: number
  formula_age_power_coefficient: number
  formula_age_power_factor: number
  formula_bmi_linear_coefficient: number
  formula_bmi_power_coefficient: number
  formula_bmi_power_factor: number
  formula_tubal_factor_true_value: number
  formula_tubal_factor_false_value: number
  formula_male_factor_infertility_true_value: number
  formula_male_factor_infertility_false_value: number
  formula_endometriosis_true_value: number
  formula_endometriosis_false_value: number
  formula_ovulatory_disorder_true_value: number
  formula_ovulatory_disorder_false_value: number
  formula_diminished_ovarian_reserve_true_value: number
  formula_diminished_ovarian_reserve_false_value: number
  formula_uterine_factor_true_value: number
  formula_uterine_factor_false_value: number
  formula_other_reason_true_value: number
  formula_other_reason_false_value: number
  formula_unexplained_infertility_true_value: number
  formula_unexplained_infertility_false_value: number
  formula_prior_pregnancies_0_value: number
  formula_prior_pregnancies_1_value: number
  'formula_prior_pregnancies_2+_value': number
  formula_prior_live_births_0_value: number
  formula_prior_live_births_1_value: number
  'formula_prior_live_births_2+_value': number
}

export type PriorCount = 0 | 1 | '2+'

export type InfertilityFormulaKey =
  | 'formula_tubal_factor_true_value'
  | 'formula_tubal_factor_false_value'
  | 'formula_male_factor_infertility_true_value'
  | 'formula_male_factor_infertility_false_value'
  | 'formula_endometriosis_true_value'
  | 'formula_endometriosis_false_value'
  | 'formula_ovulatory_disorder_true_value'
  | 'formula_ovulatory_disorder_false_value'
  | 'formula_diminished_ovarian_reserve_true_value'
  | 'formula_diminished_ovarian_reserve_false_value'
  | 'formula_uterine_factor_true_value'
  | 'formula_uterine_factor_false_value'
  | 'formula_other_reason_true_value'
  | 'formula_other_reason_false_value'
  | 'formula_unexplained_infertility_true_value'
  | 'formula_unexplained_infertility_false_value'

export interface UserInputs {
  using_own_eggs: boolean
  attempted_ivf_previously: boolean | null
  is_reason_for_infertility_known: boolean
  age: number
  weight_lbs: number
  height_feet: number
  height_inches: number
  tubal_factor: boolean
  male_factor_infertility: boolean
  endometriosis: boolean
  ovulatory_disorder: boolean
  diminished_ovarian_reserve: boolean
  uterine_factor: boolean
  other_reason: boolean
  unexplained_infertility: boolean
  prior_pregnancies: PriorCount
  prior_live_births: PriorCount
}

export interface CalculationResult {
  success_rate: number
  score: number
  bmi: number
  formula_used: string
}

export interface ApiCalculationRequest {
  inputs: UserInputs
}

export interface ApiCalculationResponse {
  result: CalculationResult
  error?: string
}
