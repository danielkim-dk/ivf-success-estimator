import { useMutation } from '@tanstack/react-query'
import { UserInputs, ApiCalculationRequest, ApiCalculationResponse } from '@/app/types/ivf'

/** POST user inputs to the calculation API and return the result */
async function calculateIvfSuccess(inputs: UserInputs): Promise<ApiCalculationResponse> {
  const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs } as ApiCalculationRequest),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to calculate IVF success rate')
  }

  return response.json()
}

/**
 * Hook for calculating IVF success rates
 * Provides mutation state (isPending, isError, data, error) for form submission
 */
export function useIvfCalculator() {
  return useMutation({
    mutationFn: calculateIvfSuccess,
  })
}
