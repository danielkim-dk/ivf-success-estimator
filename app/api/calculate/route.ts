import { NextRequest, NextResponse } from 'next/server'
import { calculateIvfSuccess } from '@/app/utils/calculateIvfSuccess'
import { validateUserInputs } from '@/app/utils/validation'
import { ApiCalculationRequest, ApiCalculationResponse } from '@/app/types/ivf'

class ValidationError extends Error {
  constructor(
    message: string,
    public validationErrors: Array<{ field: string; message: string }>
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

class CalculationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CalculationError'
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let body: ApiCalculationRequest
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Validate request structure
    if (!body.inputs) {
      return NextResponse.json(
        { error: 'Missing inputs in request body' },
        { status: 400 }
      )
    }

    // Validate user inputs
    const validationErrors = validateUserInputs(body.inputs)
    if (validationErrors.length > 0) {
      throw new ValidationError('Validation failed', validationErrors)
    }

    // Calculate result with error handling
    let result
    try {
      result = calculateIvfSuccess(body.inputs)
    } catch (calcError) {
      throw new CalculationError(
        calcError instanceof Error
          ? calcError.message
          : 'Failed to calculate IVF success rate'
      )
    }

    const response: ApiCalculationResponse = {
      result,
    }

    return NextResponse.json(response)
  } catch (error) {
    // Handle specific error types
    if (error instanceof ValidationError) {
      console.warn('Validation error:', error.validationErrors)
      return NextResponse.json(
        {
          error: error.message,
          validationErrors: error.validationErrors,
        },
        { status: 400 }
      )
    }

    if (error instanceof CalculationError) {
      console.error('Calculation error:', error.message)
      return NextResponse.json(
        { error: 'Unable to calculate success rate. Please check your inputs.' },
        { status: 422 }
      )
    }

    // Generic error handling
    console.error('Unexpected error in calculation API:', error)
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : 'Internal server error'
            : 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    )
  }
}
