import { CalculationResult } from '@/app/types/ivf'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface ResultDisplayProps {
  result: CalculationResult
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const successPercentage = (result.success_rate * 100).toFixed(2)

  return (
    <Card className="w-full bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-3xl">Your IVF Success Rate</CardTitle>
        <CardDescription className="text-base mt-2">
          Based on CDC formula {result.formula_used}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-6 bg-white rounded-2xl shadow-sm">
          <div className="text-7xl font-extrabold bg-gradient-to-r from-[#F86504] to-[#6086FF] bg-clip-text text-transparent mb-3">
            {successPercentage}%
          </div>
          <p className="text-gray-600 font-medium text-lg">Estimated Success Rate</p>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl space-y-3 border border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Calculated BMI:</span>
            <span className="font-semibold text-gray-900">{result.bmi.toFixed(1)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Formula Used:</span>
            <span className="font-semibold text-gray-900">{result.formula_used}</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 border-t border-gray-200 pt-4 leading-relaxed">
          <p>
            This estimate is based on data from the CDC&apos;s Assisted Reproductive Technology (ART) program.
            Individual results may vary. Please consult with your healthcare provider for personalized medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
