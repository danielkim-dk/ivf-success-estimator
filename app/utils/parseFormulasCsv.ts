import { FormulaRow } from '../types/ivf'
import fs from 'fs'
import path from 'path'

function parseBooleanOrNA(value: string): boolean | 'N/A' {
  if (value === 'N/A') return 'N/A'
  return value === 'TRUE'
}

// Memoized cache for parsed formulas
let cachedFormulas: FormulaRow[] | null = null

export function parseFormulasCsv(): FormulaRow[] {
  // Return cached formulas if already parsed
  if (cachedFormulas !== null) {
    return cachedFormulas
  }

  const csvPath = path.join(process.cwd(), 'public', 'data', 'ivf_success_formulas.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')

  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',')

  const formulas: FormulaRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row: Record<string, any> = {}

    headers.forEach((header, index) => {
      const value = values[index]

      if (header.startsWith('param_')) {
        if (header === 'param_attempted_ivf_previously') {
          row[header] = parseBooleanOrNA(value)
        } else {
          row[header] = value === 'TRUE'
        }
      } else if (header === 'cdc_formula') {
        row[header] = value
      } else {
        row[header] = parseFloat(value)
      }
    })

    formulas.push(row as FormulaRow)
  }

  // Cache the parsed formulas
  cachedFormulas = formulas

  return formulas
}

// Export function to clear cache (useful for testing)
export function clearFormulasCache(): void {
  cachedFormulas = null
}
