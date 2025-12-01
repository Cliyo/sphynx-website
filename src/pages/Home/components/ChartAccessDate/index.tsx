import { BarChart } from '@mui/x-charts'
import { AccessItemDTO } from 'dtos/AccessDTO'
import { theme } from 'themes/'

export const ChartAccessDate = ({
  accessTableData,
}: {
  accessTableData: AccessItemDTO[]
}) => {
  const xLabels = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ]

  const timeRangeData = Array(7).fill(0)

  accessTableData.forEach((access) => {
    const [year, month, day] = access.date.toString().split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const dayOfWeek = date.getDay()

    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1

    timeRangeData[adjustedDay]++
  })

  return (
    <BarChart
      height={200}
      series={[
        {
          data: timeRangeData,
          label: 'Acessos',
          id: 'uvId',
          color: theme.COLORS.PRIMARY_LIGHT,
        },
      ]}
      xAxis={[{ data: xLabels, label: 'Dias' }]}
      yAxis={[{ width: 0 }]}
    />
  )
}
