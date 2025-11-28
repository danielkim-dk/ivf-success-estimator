import { Progress } from './progress'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

/**
 * Step progress indicator showing current step number and percentage complete
 */
export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} />
    </div>
  )
}
