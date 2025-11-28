import { AlertCircle } from 'lucide-react'
import { UserFriendlyError } from '@/app/utils/errorMessages'

interface ErrorDisplayProps {
  error: UserFriendlyError
  className?: string
}

export function ErrorDisplay({ error, className = '' }: ErrorDisplayProps) {
  return (
    <div className={`bg-red-50 border-2 border-red-200 rounded-xl p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-red-900 font-semibold text-base mb-1">
              {error.title}
            </h3>
            <p className="text-red-700 text-sm leading-relaxed">
              {error.message}
            </p>
          </div>

          {error.suggestions && error.suggestions.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-red-800 text-xs font-medium uppercase tracking-wide">
                What to do:
              </p>
              <ul className="space-y-1">
                {error.suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="text-red-700 text-sm flex items-start gap-2"
                  >
                    <span className="text-red-400 mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
