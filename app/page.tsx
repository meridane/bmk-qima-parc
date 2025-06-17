'use client'

// ✅ Import du bon Grid pour MUI v5+
import Grid from '@mui/material/Unstable_Grid2'

// ✅ Import de tous les composants utilisés
import Award from '@/views/dashboard/Award'
import Transactions from '@/views/dashboard/Transactions'
import WeeklyOverview from '@/views/dashboard/WeeklyOverview'
import TotalEarning from '@/views/dashboard/TotalEarning'
import LineChart from '@/views/dashboard/LineChart'
import CardStatVertical from '@/components/card-statistics/Vertical'
import DistributedColumnChart from '@/views/dashboard/DistributedColumnChart'
import SalesByCountries from '@/views/dashboard/SalesByCountries'
import DepositWithdraw from '@/views/dashboard/DepositWithdraw'
import Table from '@/views/dashboard/Table'

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid xs={12} md={4}>
        <Award />
      </Grid>

      <Grid xs={12} md={8} lg={8}>
        <Transactions />
      </Grid>

      <Grid xs={12} md={6}>
        <WeeklyOverview />
      </Grid>

      <Grid xs={12} md={6}>
        <TotalEarning />
      </Grid>

      <Grid xs={12} md={6}>
        <LineChart />
      </Grid>

      {/* ✅ Bloc 1 - Statistiques : Voitures */}
      <Grid xs={12} md={4}>
        <CardStatVertical
          stats="45"
          title="Voitures chargées"
          subtitle="Ce mois-ci"
          avatarColor="primary"
          avatarIcon="mdi:car"
        />
      </Grid>

      {/* ✅ Bloc 2 - Statistiques : Conteneurs */}
      <Grid xs={12} md={4}>
        <CardStatVertical
          stats="7"
          title="Conteneurs partis"
          subtitle="Sur les 30 derniers jours"
          avatarColor="success"
          avatarIcon="mdi:truck"
        />
      </Grid>

      {/* ✅ Bloc 3 - Statistiques : Revenus */}
      <Grid xs={12} md={4}>
        <CardStatVertical
          stats="$12,500"
          title="Revenus générés"
          subtitle="Mois courant"
          avatarColor="info"
          avatarIcon="mdi:currency-usd"
        />
      </Grid>

      <Grid xs={12} md={6}>
        <DistributedColumnChart />
      </Grid>

      <Grid xs={12} md={6}>
        <SalesByCountries />
      </Grid>

      <Grid xs={12} md={6}>
        <DepositWithdraw />
      </Grid>

      <Grid xs={12} md={6}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics