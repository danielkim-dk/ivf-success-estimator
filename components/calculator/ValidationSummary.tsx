interface ValidationSummaryProps {
  errors: Record<string, string>
  show: boolean
}

export function ValidationSummary({ errors, show }: ValidationSummaryProps) {
  if (!show || Object.keys(errors).length === 0) {
    return null
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="bg-red-50 border-2 border-red-200 rounded-xl p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-3">
          <h3 className="text-red-900 font-semibold">
            Please complete all required fields
          </h3>
          <p className="text-red-700">The following fields need your attention:</p>
          <ul className="space-y-1 list-disc list-inside text-red-700">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
