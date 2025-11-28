// External dependencies
import { ArrowRight, Calculator } from 'lucide-react'

// UI components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorOptionCard } from '@/components/home/CalculatorOptionCard'

// Theme
import { THEME_COLORS } from '@/app/theme/colors'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-3xl">
        {/* ============ HEADER ============ */}
        <CardHeader className="text-center space-y-4 pb-6">
          <CardTitle className={`text-4xl md:text-5xl ${THEME_COLORS.gradients.brandTitle}`}>
            IVF Success Estimator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-xl mx-auto">
            Calculate your IVF success rate based on CDC data. Get personalized insights to help you understand your journey.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ============ INTRO TEXT ============ */}
          <p className="text-gray-700 text-center font-medium text-lg">
            Choose how you&apos;d like to get started:
          </p>

          {/* ============ CALCULATOR OPTIONS ============ */}
          <div className="grid gap-5 md:grid-cols-2">
            <CalculatorOptionCard
              href="/questionnaire"
              icon={<ArrowRight className="h-6 w-6" />}
              title="Guided Flow"
              description="Step-by-step questionnaire that walks you through each question with care"
              buttonText="Start Questionnaire"
              accentColor="orange"
            />

            <CalculatorOptionCard
              href="/calculator"
              icon={<Calculator className="h-6 w-6" />}
              title="Direct Calculator"
              description="Fill out all information at once on a single comprehensive form"
              buttonText="Go to Calculator"
              buttonVariant="secondary"
              accentColor="blue"
            />
          </div>

          {/* ============ FOOTER ============ */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              * Data from CDC ART Program
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
