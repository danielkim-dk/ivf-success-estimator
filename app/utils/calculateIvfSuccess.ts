import { FormulaRow, UserInputs, CalculationResult, InfertilityFormulaKey } from '../types/ivf'
import { calculateBmi } from './calculateBmi'
import { selectFormula } from './selectFormula'
import { parseFormulasCsv } from './parseFormulasCsv'

function getInfertilityReasonValue(
  formula: FormulaRow,
  hasDiagnosis: boolean,
  formulaIfTrueKey: InfertilityFormulaKey,
  formulaIfFalseKey: InfertilityFormulaKey
): number {
  return hasDiagnosis ? formula[formulaIfTrueKey] : formula[formulaIfFalseKey]
}

function getPriorPregnanciesValue(formula: FormulaRow, count: 0 | 1 | '2+'): number {
  if (count === 0) return formula.formula_prior_pregnancies_0_value
  if (count === 1) return formula.formula_prior_pregnancies_1_value
  return formula['formula_prior_pregnancies_2+_value']
}

function getPriorLiveBirthsValue(formula: FormulaRow, count: 0 | 1 | '2+'): number {
  if (count === 0) return formula.formula_prior_live_births_0_value
  if (count === 1) return formula.formula_prior_live_births_1_value
  return formula['formula_prior_live_births_2+_value']
}

export function calculateIvfSuccess(inputs: UserInputs): CalculationResult {
  const formulas = parseFormulasCsv()
  const formula = selectFormula(formulas, inputs)

  const bmi = calculateBmi(inputs.weight_lbs, inputs.height_feet, inputs.height_inches)

  const ageComponent =
    formula.formula_age_linear_coefficient * inputs.age +
    formula.formula_age_power_coefficient * Math.pow(inputs.age, formula.formula_age_power_factor)

  const bmiComponent =
    formula.formula_bmi_linear_coefficient * bmi +
    formula.formula_bmi_power_coefficient * Math.pow(bmi, formula.formula_bmi_power_factor)

  const tubalFactorValue = getInfertilityReasonValue(
    formula,
    inputs.tubal_factor,
    'formula_tubal_factor_true_value',
    'formula_tubal_factor_false_value'
  )

  const maleFactorValue = getInfertilityReasonValue(
    formula,
    inputs.male_factor_infertility,
    'formula_male_factor_infertility_true_value',
    'formula_male_factor_infertility_false_value'
  )

  const endometriosisValue = getInfertilityReasonValue(
    formula,
    inputs.endometriosis,
    'formula_endometriosis_true_value',
    'formula_endometriosis_false_value'
  )

  const ovulatoryDisorderValue = getInfertilityReasonValue(
    formula,
    inputs.ovulatory_disorder,
    'formula_ovulatory_disorder_true_value',
    'formula_ovulatory_disorder_false_value'
  )

  const diminishedOvarianReserveValue = getInfertilityReasonValue(
    formula,
    inputs.diminished_ovarian_reserve,
    'formula_diminished_ovarian_reserve_true_value',
    'formula_diminished_ovarian_reserve_false_value'
  )

  const uterineFactorValue = getInfertilityReasonValue(
    formula,
    inputs.uterine_factor,
    'formula_uterine_factor_true_value',
    'formula_uterine_factor_false_value'
  )

  const otherReasonValue = getInfertilityReasonValue(
    formula,
    inputs.other_reason,
    'formula_other_reason_true_value',
    'formula_other_reason_false_value'
  )

  const unexplainedInfertilityValue = getInfertilityReasonValue(
    formula,
    inputs.unexplained_infertility,
    'formula_unexplained_infertility_true_value',
    'formula_unexplained_infertility_false_value'
  )

  const priorPregnanciesValue = getPriorPregnanciesValue(formula, inputs.prior_pregnancies)
  const priorLiveBirthsValue = getPriorLiveBirthsValue(formula, inputs.prior_live_births)

  const score =
    formula.formula_intercept +
    ageComponent +
    bmiComponent +
    tubalFactorValue +
    maleFactorValue +
    endometriosisValue +
    ovulatoryDisorderValue +
    diminishedOvarianReserveValue +
    uterineFactorValue +
    otherReasonValue +
    unexplainedInfertilityValue +
    priorPregnanciesValue +
    priorLiveBirthsValue

  const eToTheScore = Math.exp(score)
  const successRate = eToTheScore / (1 + eToTheScore)

  return {
    success_rate: successRate,
    score,
    bmi,
    formula_used: formula.cdc_formula,
  }
}
