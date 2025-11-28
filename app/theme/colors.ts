/**
 * Centralized color theme configuration
 * Single source of truth for all brand colors
 */

export const THEME_COLORS = {
  brand: {
    primary: '#F86504', // Sunfish Orange
    primaryDark: '#E65A03', // Darker Orange (hover state)
    secondary: '#6086FF', // Blue
    secondaryDark: '#5077EE', // Darker Blue (hover state)
  },
  text: {
    primary: 'text-[#F86504]',
    secondary: 'text-[#6086FF]',
  },
  background: {
    primary: 'bg-[#F86504]',
    primaryDark: 'bg-[#E65A03]',
    secondary: 'bg-[#6086FF]',
    secondaryDark: 'bg-[#5077EE]',
  },
  border: {
    primary: 'border-[#F86504]',
    secondary: 'border-[#6086FF]',
  },
  gradients: {
    brandTitle: 'bg-gradient-to-r from-[#F86504] to-[#6086FF] bg-clip-text text-transparent',
    progressBar: 'bg-gradient-to-r from-[#F86504] to-[#6086FF]',
    buttonPrimary: 'bg-gradient-to-r from-[#F86504] to-[#E65A03]',
    orange: {
      from: 'from-orange-50',
      to: 'to-white',
    },
    blue: {
      from: 'from-blue-50',
      to: 'to-white',
    },
  },
  hover: {
    border: {
      orange: 'hover:border-[#F86504]',
      blue: 'hover:border-[#6086FF]',
      primary: 'hover:border-[#F86504]',
    },
    background: {
      primary: 'hover:bg-[#E65A03]',
      secondary: 'hover:bg-[#5077EE]',
      primaryText: 'hover:bg-[#F86504] hover:text-white',
    },
    text: {
      orange: 'group-hover:text-[#F86504]',
      blue: 'group-hover:text-[#6086FF]',
    },
  },
  focus: {
    ring: {
      primary: 'focus:ring-[#F86504]',
      secondary: 'focus:ring-[#6086FF]',
    },
    border: {
      primary: 'focus-visible:border-[#F86504]',
    },
  },
} as const

export type AccentColor = 'orange' | 'blue'

/**
 * Get color classes for a specific accent color
 */
export function getAccentColorClasses(accentColor: AccentColor) {
  const isOrange = accentColor === 'orange'

  return {
    borderHover: isOrange
      ? THEME_COLORS.hover.border.orange
      : THEME_COLORS.hover.border.blue,
    textHover: isOrange
      ? THEME_COLORS.hover.text.orange
      : THEME_COLORS.hover.text.blue,
    gradientFrom: isOrange
      ? THEME_COLORS.gradients.orange.from
      : THEME_COLORS.gradients.blue.from,
    gradientTo: isOrange
      ? THEME_COLORS.gradients.orange.to
      : THEME_COLORS.gradients.blue.to,
  }
}
