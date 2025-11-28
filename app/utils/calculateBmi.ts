export function calculateBmi(
  weightLbs: number,
  heightFeet: number,
  heightInches: number
): number {
  const totalHeightInches = heightFeet * 12 + heightInches
  return (weightLbs / (totalHeightInches * totalHeightInches)) * 703
}
