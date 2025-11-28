import { UserInputs } from '@/app/types/ivf'
import { CardDescription } from '../ui/card'

interface ReviewStepProps {
  inputs: Partial<UserInputs>
}

/**
 * Final review step showing a summary of all user inputs before calculation
 */
export function ReviewStep({ inputs }: ReviewStepProps) {
  return (
    <div className="space-y-4">
      <CardDescription>Please review your information before calculating</CardDescription>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Using own eggs:</span>
          <span className="font-medium">{inputs.using_own_eggs ? 'Yes' : 'No'}</span>
        </div>
        {inputs.using_own_eggs && (
          <div className="flex justify-between">
            <span className="text-gray-600">Previous IVF:</span>
            <span className="font-medium">
              {inputs.attempted_ivf_previously ? 'Yes' : 'No'}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Infertility reason known:</span>
          <span className="font-medium">
            {inputs.is_reason_for_infertility_known ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Age:</span>
          <span className="font-medium">{inputs.age}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Height:</span>
          <span className="font-medium">
            {inputs.height_feet}&apos; {inputs.height_inches}&quot;
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Weight:</span>
          <span className="font-medium">{inputs.weight_lbs} lbs</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Prior pregnancies:</span>
          <span className="font-medium">{inputs.prior_pregnancies}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Prior live births:</span>
          <span className="font-medium">{inputs.prior_live_births}</span>
        </div>
      </div>
    </div>
  )
}
