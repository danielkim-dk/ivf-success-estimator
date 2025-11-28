import { FormulaRow, UserInputs } from '../types/ivf'

export function selectFormula(
  formulas: FormulaRow[],
  inputs: UserInputs
): FormulaRow {
  const attemptedIvf = inputs.using_own_eggs
    ? inputs.attempted_ivf_previously
    : 'N/A'

  const matchingFormula = formulas.find((formula) => {
    return (
      formula.param_using_own_eggs === inputs.using_own_eggs &&
      formula.param_attempted_ivf_previously === attemptedIvf &&
      formula.param_is_reason_for_infertility_known === inputs.is_reason_for_infertility_known
    )
  })

  if (!matchingFormula) {
    throw new Error(
      `No matching formula found for parameters: using_own_eggs=${inputs.using_own_eggs}, ` +
      `attempted_ivf_previously=${attemptedIvf}, ` +
      `is_reason_for_infertility_known=${inputs.is_reason_for_infertility_known}`
    )
  }

  return matchingFormula
}
