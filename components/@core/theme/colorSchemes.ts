// MUI Imports
import type { Theme } from '@mui/material/styles'

const colorSchemes = () => {
  const skin = 'default' as string

  return {
    light: {
      palette: {
        // ... tout ton contenu inchangé ...
        // je te confirme que tout le reste peut rester identique
        // sauf la toute dernière ligne typée à supprimer
      }
    },
    dark: {
      palette: {
        // ... idem ici, tout reste pareil ...
      }
    }
  }
}

export default colorSchemes
