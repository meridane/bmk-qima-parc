// theme/ThemeComponent.tsx

'use client'

import { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import createEmotionCache from './emotion-cache'
import { CacheProvider } from '@emotion/react'

// Exemple de thème MUI personnalisé (modifiable)
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f97316' // Orange BMK
    },
    secondary: {
      main: '#000000' // Noir
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
})

const clientSideEmotionCache = createEmotionCache()

export default function ThemeComponent({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
