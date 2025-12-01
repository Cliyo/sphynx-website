import {
  DefaultizedPieValueType,
  pieArcLabelClasses,
  PieChart,
} from '@mui/x-charts'
import { theme } from 'themes/'
import { AccessItemDTO } from 'dtos/AccessDTO'

export const ChartAccessStatus = ({
  accessTableData,
}: {
  accessTableData: AccessItemDTO[]
}) => {
  const sizing = {
    margin: { right: 5 },
    height: 200,
    hideLegend: true,
  }

  const TOTAL_ACCESS = accessTableData.length

  const approvedAccess = accessTableData.filter(
    (access) => access.status,
  ).length
  const deniedAccess = TOTAL_ACCESS - approvedAccess

  const accessData = [
    {
      label: 'Aprovados',
      value: approvedAccess,
      color: theme.COLORS.PRIMARY_LIGHT,
    },
    { label: 'Negados', value: deniedAccess, color: theme.COLORS.PRIMARY_DARK },
  ]

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL_ACCESS
    return `${(percent * 100).toFixed(0)}%`
  }

  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data: accessData,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  )
}
