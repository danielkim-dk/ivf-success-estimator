export interface UserFriendlyError {
  title: string
  message: string
  suggestions?: string[]
}

export function formatErrorForUser(error: unknown): UserFriendlyError {
  const errorMessage = error instanceof Error ? error.message : String(error)

  // Formula not found error
  if (errorMessage.includes('No matching formula found')) {
    return {
      title: 'Missing Information',
      message: 'Please answer all required questions before calculating your success rate.',
      suggestions: [
        'Make sure you\'ve selected whether you\'re using your own eggs',
        'Indicate if you\'ve attempted IVF previously',
        'Let us know if you know the reason for infertility',
      ],
    }
  }

  // Validation error from API
  if (errorMessage.includes('Validation failed')) {
    return {
      title: 'Please Check Your Answers',
      message: 'Some of your answers need to be corrected before we can calculate your results.',
      suggestions: [
        'Make sure all required questions are answered',
        'The number of children born cannot exceed total pregnancies',
        'Age should be between 20 and 50 years',
        'Weight should be between 80 and 300 pounds',
      ],
    }
  }

  // Network/server errors
  if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
    return {
      title: 'Connection Problem',
      message: 'We\'re having trouble connecting to our servers.',
      suggestions: [
        'Check your internet connection',
        'Try again in a few moments',
        'If the problem persists, please contact support',
      ],
    }
  }

  // Age validation
  if (errorMessage.includes('Age must be between')) {
    return {
      title: 'Invalid Age',
      message: 'Please enter an age between 20 and 50 years.',
      suggestions: ['This calculator is designed for patients aged 20-50'],
    }
  }

  // Weight validation
  if (errorMessage.includes('Weight must be between')) {
    return {
      title: 'Invalid Weight',
      message: 'Please enter a weight between 80 and 300 lbs.',
    }
  }

  // Height validation
  if (errorMessage.includes('Height')) {
    return {
      title: 'Invalid Height',
      message: 'Please check your height values.',
      suggestions: [
        'Feet should be between 4 and 7',
        'Inches should be between 0 and 11',
      ],
    }
  }

  // Prior pregnancies/births validation
  if (errorMessage.includes('Prior live births cannot exceed prior pregnancies')) {
    return {
      title: 'Please Check Your Pregnancy History',
      message: 'The number of children you\'ve given birth to cannot be more than the total number of pregnancies.',
      suggestions: ['Please review your answers for prior pregnancies and live births'],
    }
  }

  // CSV parsing errors
  if (errorMessage.includes('CSV') || errorMessage.includes('formula')) {
    return {
      title: 'System Error',
      message: 'We\'re experiencing a technical issue with our calculation system.',
      suggestions: [
        'Please try again in a few moments',
        'If this continues, contact support',
      ],
    }
  }

  // Generic error
  return {
    title: 'Something Went Wrong',
    message: 'We encountered an unexpected error while processing your request.',
    suggestions: [
      'Please try again',
      'If the problem persists, contact support',
    ],
  }
}

export function getFieldErrorMessage(field: string, error: string): string {
  const friendlyFieldNames: Record<string, string> = {
    age: 'Age',
    weight_lbs: 'Weight',
    height_feet: 'Height (feet)',
    height_inches: 'Height (inches)',
    prior_pregnancies: 'Prior Pregnancies',
    prior_live_births: 'Prior Live Births',
    using_own_eggs: 'Egg Source',
    attempted_ivf_previously: 'Previous IVF Attempts',
    is_reason_for_infertility_known: 'Infertility Diagnosis',
  }

  const fieldName = friendlyFieldNames[field] || field

  // Customize specific error messages
  if (error.includes('cannot exceed')) {
    return `${fieldName}: Live births cannot be greater than total pregnancies`
  }

  if (error.includes('required')) {
    return `${fieldName} is required`
  }

  if (error.includes('between')) {
    return `${fieldName}: ${error}`
  }

  return `${fieldName}: ${error}`
}
