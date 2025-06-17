'use client'

import { ReactNode } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { deepmerge } from '@mui/utils'

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff5722',
    },
    background: {
      default: '#f4f5fa',
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default function ThemeComponent({ children }: { children: ReactNode }) {
  const theme = deepmerge(baseTheme, {})

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
