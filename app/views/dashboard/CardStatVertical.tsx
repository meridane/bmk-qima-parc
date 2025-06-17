type Props = {
  title: string
  stats: string
  avatarIcon: string
  avatarColor: string
  subtitle: string
  trendNumber: string
  trend: 'positive' | 'negative'
}

const CardStatVertical = ({ title, stats, avatarIcon, avatarColor, subtitle, trendNumber, trend }: Props) => {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
      <h3>{title}</h3>
      <p>{stats}</p>
      <p>{subtitle}</p>
      <p style={{ color: trend === 'positive' ? 'green' : 'red' }}>
        {trend === 'positive' ? '+' : '-'}
        {trendNumber}
      </p>
      <p>Icon: {avatarIcon} | Couleur: {avatarColor}</p>
    </div>
  )
}

export default CardStatVertical
