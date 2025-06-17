// theme/themeConfig.ts

import { createTheme } from '@mui/material/styles'

// 👉 Couleurs personnalisées
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6f00' // Orange BMK
    },
    secondary: {
      main: '#212121' // Noir profond
    },
    background: {
      default: '#f4f5fa',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Public Sans", sans-serif',
    fontSize: 14
  },
  shape: {
    borderRadius: 10
  }
})

export default theme
