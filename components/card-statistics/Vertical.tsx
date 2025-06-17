'use client'

import { Card, CardContent, Typography, Avatar, Box } from '@mui/material'
import TrendingUp from '@mui/icons-material/TrendingUp'
import TrendingDown from '@mui/icons-material/TrendingDown'

type Props = {
  stats: string
  title: string
  subtitle: string
  avatarColor: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  avatarIcon: string
  trend?: 'positive' | 'negative'
  trendNumber?: string
}

const CardStatVertical = ({ stats, title, subtitle, avatarColor, avatarIcon, trend, trendNumber }: Props) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: `${avatarColor}.main` }}>
            <i className={avatarIcon} />
          </Avatar>
          <Box>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='body2' color='text.secondary'>
              {subtitle}
            </Typography>
          </Box>
        </Box>
        <Typography variant='h4' sx={{ mb: 1 }}>
          {stats}
        </Typography>
        {trend && trendNumber && (
          <Typography
            variant='body2'
            color={trend === 'positive' ? 'success.main' : 'error.main'}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {trend === 'positive' ? <TrendingUp fontSize='small' /> : <TrendingDown fontSize='small' />}
            <Box sx={{ ml: 0.5 }}>{trendNumber}</Box>
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default CardStatVertical
