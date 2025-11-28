import { ReactNode } from 'react'
import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AccentColor, getAccentColorClasses } from '@/app/theme/colors'

interface CalculatorOptionCardProps {
  href: string
  icon: ReactNode
  title: string
  description: string
  buttonText: string
  buttonVariant?: 'default' | 'secondary'
  accentColor: AccentColor
}

export function CalculatorOptionCard({
  href,
  icon,
  title,
  description,
  buttonText,
  buttonVariant = 'default',
  accentColor,
}: CalculatorOptionCardProps) {
  const colorClasses = getAccentColorClasses(accentColor)

  return (
    <Link href={href} className="block group">
      <Card
        className={`h-full hover:shadow-xl transition-all cursor-pointer border-2 border-transparent ${colorClasses.borderHover} bg-gradient-to-br ${colorClasses.gradientFrom} ${colorClasses.gradientTo}`}
      >
        <CardHeader>
          <CardTitle
            className={`flex items-center gap-2 text-xl text-gray-900 transition-colors ${colorClasses.textHover}`}
          >
            {icon}
            {title}
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={buttonVariant} className="w-full">
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
