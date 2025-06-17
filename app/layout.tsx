// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
type ChildrenType = {
  children: React.ReactNode
}

// Style Imports
import '../styles/globals.css'
import '../styles/generated-icons.css'

// Materio Theme Wrapper
import ThemeComponent from './theme/ThemeComponent'

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Gestion des conteneurs pour l’export de voitures.'
}

const RootLayout = ({ children }: ChildrenType) => {
  return (
    <html lang="fr">
      <body>
        <ThemeComponent>{children}</ThemeComponent>
      </body>
    </html>
  )
}

export default RootLayout
