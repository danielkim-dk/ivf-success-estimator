import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from './button'

interface BackButtonProps {
  href?: string
  label?: string
}

/**
 * Reusable back navigation button
 * Defaults to navigating back to the home page
 */
export function BackButton({ href = '/', label = 'Back to Home' }: BackButtonProps) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {label}
      </Button>
    </Link>
  )
}
