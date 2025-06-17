'use client'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function LoginPage() {
  const theme = useTheme()
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })

    if (error) {
      setError(error.message)
    }
  }

  return (
    <Box
      className='content-center'
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
      }}
    >
      <Card sx={{ width: 360 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img src="/assets/logo.png" alt="BMK Logo" style={{ width: 100 }} />
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Connexion à BMK Qima Parc
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
            onClick={handleLogin}
          >
            Connexion avec Google
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }} align="center">
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
