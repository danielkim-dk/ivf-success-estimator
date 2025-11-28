import { PriorCount } from '../types/ivf'

export const VALIDATION_CONSTRAINTS = {
  age: {
    min: 20,
    max: 50,
    label: 'Age',
    errorMessage: 'Please enter an age between 20 and 50 years',
  },
  weight_lbs: {
    min: 80,
    max: 300,
    label: 'Weight (lbs)',
    errorMessage: 'Please enter a weight between 80 and 300 lbs',
  },
  height_feet: {
    min: 4,
    max: 6,
    label: 'Height (feet)',
    errorMessage: 'Please enter a height between 4\'6" and 6\'0"',
  },
  height_inches: {
    min: 0,
    max: 11,
    label: 'Height (inches)',
    errorMessage: 'Please enter inches between 0 and 11',
  },
} as const

export const PRIOR_COUNT_OPTIONS: readonly PriorCount[] = [0, 1, '2+'] as const

export type ValidationConstraintKey = keyof typeof VALIDATION_CONSTRAINTS
