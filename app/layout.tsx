// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '../styles/globals.css'
import '../styles/generated-icons.css'

export const metadata = {
  title: 'BMK Qima Parc',
  description: 'Plateforme de gestion pour le chargement des conteneurs BMK.'
}

// ✅ Type direct ici
type ChildrenType = {
  children: React.ReactNode
}

const RootLayout = ({ children }: ChildrenType) => {
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
    </html>
  )
}

export default RootLayout
