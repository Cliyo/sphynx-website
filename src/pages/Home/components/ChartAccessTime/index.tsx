import { BarChart } from '@mui/x-charts'
import { AccessItemDTO } from 'dtos/AccessDTO'
import { theme } from 'themes/'

export const ChartAccessTime = ({
  accessTableData,
}: {
  accessTableData: AccessItemDTO[]
}) => {
  const xLabels = [
    '0h - 2h',
    '2h - 4h',
    '4h - 6h',
    '6h - 8h',
    '8h - 10h',
    '10h - 12h',
    '12h - 14h',
    '14h - 16h',
    '16h - 18h',
    '18h - 20h',
    '20h - 22h',
    '22h - 24h',
  ]

  const timeRangeData = Array(12).fill(0)

  accessTableData.forEach((access) => {
    const hour = parseInt(access.time.split(':')[0], 10)
    const rangeIndex = Math.floor(hour / 2)

    if (rangeIndex >= 0 && rangeIndex < 12) {
      timeRangeData[rangeIndex]++
    }
  })

  return (
    <BarChart
      width={400}
      height={200}
      series={[
        {
          data: timeRangeData,
          label: 'Acessos',
          id: 'uvId',
          color: theme.COLORS.PRIMARY_LIGHT,
        },
      ]}
      xAxis={[{ data: xLabels, label: 'Horários' }]}
      yAxis={[{ width: 0 }]}
    />
  )
}
