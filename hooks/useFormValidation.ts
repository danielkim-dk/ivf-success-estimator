import { useState, useCallback } from 'react'
import { validateUserInputs } from '@/app/utils/validation'
import { UserInputs } from '@/app/types/ivf'

/**
 * Hook for managing form validation state
 * Provides validation, error tracking, and error clearing utilities
 */
export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  /** Validate inputs and return errors map (or null if valid) */
  const validate = useCallback((inputs: Partial<UserInputs>): Record<string, string> | null => {
    const validationResult = validateUserInputs(inputs)

    if (validationResult.length > 0) {
      const errorMap: Record<string, string> = {}
      validationResult.forEach((err) => {
        errorMap[err.field] = err.message
      })
      setErrors(errorMap)
      return errorMap
    }

    setErrors({})
    return null
  }, [])

  /** Clear error for a specific field */
  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  /** Clear all validation errors */
  const clearAllErrors = useCallback(() => {
    setErrors({})
  }, [])

  /** Get error message for a specific field */
  const getError = useCallback((field: string): string | undefined => {
    return errors[field]
  }, [errors])

  /** Check if there are any validation errors */
  const hasErrors = useCallback((): boolean => {
    return Object.keys(errors).length > 0
  }, [errors])

  return {
    errors,
    validate,
    clearError,
    clearAllErrors,
    getError,
    hasErrors,
  }
}
