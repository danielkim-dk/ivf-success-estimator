import { cn } from '@/lib/utils'

interface ButtonGroupOption {
  value: string | boolean | number
  label: string
}

interface ButtonGroupProps {
  value?: string | boolean | number | null | undefined
  onValueChange: (value: string | boolean | number) => void
  options: ButtonGroupOption[]
  className?: string
  ariaLabel?: string
  error?: string
}

export function ButtonGroup({
  value,
  onValueChange,
  options,
  className,
  ariaLabel,
  error,
}: ButtonGroupProps) {
  return (
    <div className="space-y-2">
      <div
        role="group"
        aria-label={ariaLabel}
        className={cn('grid gap-3', className)}
      >
        {options.map((option, index) => {
          const isSelected = option.value.toString() === value?.toString()

          return (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onValueChange(option.value)}
              className={cn(
                'w-full px-6 py-4 text-left rounded-xl border-2 font-medium transition-all duration-200',
                'hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
                'focus:outline-none focus:ring-2 focus:ring-[#F86504] focus:ring-offset-2',
                isSelected
                  ? 'bg-gradient-to-r from-[#F86504] to-[#E65A03] text-white border-[#F86504] shadow-md'
                  : error
                    ? 'bg-white text-gray-700 border-red-300 hover:border-red-400'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#F86504]'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{option.label}</span>
                {isSelected && (
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
