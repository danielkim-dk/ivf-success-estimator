import { calculateIvfSuccess } from './app/utils/calculateIvfSuccess'
import { UserInputs } from './app/types/ivf'

// Example 1 from CDC: Using Own Eggs / Did Not Previously Attempt IVF / Known Infertility Reason
const example1: UserInputs = {
  using_own_eggs: true,
  attempted_ivf_previously: false,
  is_reason_for_infertility_known: true,
  age: 32,
  weight_lbs: 150,
  height_feet: 5,
  height_inches: 8,
  tubal_factor: false,
  male_factor_infertility: false,
  endometriosis: true,
  ovulatory_disorder: true,
  diminished_ovarian_reserve: false,
  uterine_factor: false,
  other_reason: false,
  unexplained_infertility: false,
  prior_pregnancies: 1,
  prior_live_births: 1,
}

// Example 2: Using Own Eggs / Did Not Previously Attempt IVF / Unknown Infertility Reason
const example2: UserInputs = {
  using_own_eggs: true,
  attempted_ivf_previously: false,
  is_reason_for_infertility_known: false,
  age: 32,
  weight_lbs: 150,
  height_feet: 5,
  height_inches: 8,
  tubal_factor: false,
  male_factor_infertility: false,
  endometriosis: false,
  ovulatory_disorder: false,
  diminished_ovarian_reserve: false,
  uterine_factor: false,
  other_reason: false,
  unexplained_infertility: false,
  prior_pregnancies: 1,
  prior_live_births: 1,
}

// Example 3: Using Own Eggs / Previously Attempted IVF / Known Infertility Reason
const example3: UserInputs = {
  using_own_eggs: true,
  attempted_ivf_previously: true,
  is_reason_for_infertility_known: true,
  age: 32,
  weight_lbs: 150,
  height_feet: 5,
  height_inches: 8,
  tubal_factor: true,
  male_factor_infertility: false,
  endometriosis: false,
  ovulatory_disorder: false,
  diminished_ovarian_reserve: true,
  uterine_factor: false,
  other_reason: false,
  unexplained_infertility: false,
  prior_pregnancies: 1,
  prior_live_births: 1,
}

console.log('Testing IVF Success Calculator\n')

console.log('Example 1: Expected 62.21%')
const result1 = calculateIvfSuccess(example1)
console.log(`Result: ${(result1.success_rate * 100).toFixed(2)}%`)
console.log(`BMI: ${result1.bmi.toFixed(1)}`)
console.log(`Formula: ${result1.formula_used}`)
console.log(`Score: ${result1.score}\n`)

console.log('Example 2: Expected 59.83%')
const result2 = calculateIvfSuccess(example2)
console.log(`Result: ${(result2.success_rate * 100).toFixed(2)}%`)
console.log(`BMI: ${result2.bmi.toFixed(1)}`)
console.log(`Formula: ${result2.formula_used}`)
console.log(`Score: ${result2.score}\n`)

console.log('Example 3: Expected 40.89%')
const result3 = calculateIvfSuccess(example3)
console.log(`Result: ${(result3.success_rate * 100).toFixed(2)}%`)
console.log(`BMI: ${result3.bmi.toFixed(1)}`)
console.log(`Formula: ${result3.formula_used}`)
console.log(`Score: ${result3.score}`)
