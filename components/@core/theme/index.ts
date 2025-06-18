import type { Theme } from '@mui/material/styles'
import type { SystemMode } from '@core/types' // ✅ Manquant

import overrides from './overrides'
import colorSchemes from './colorSchemes'
import customShadows from './customShadows'
import shadows from './shadows'
import typography from './typography'

const theme = (mode: SystemMode, direction: Theme['direction']) => {
  return {
    direction,
    components: overrides(),
    colorSchemes: colorSchemes(),
    customShadows: customShadows(mode),
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 12
      }
    },
    shadows: shadows(mode),
    typography: typography(mode)
  } as unknown as Theme
}

export default theme
