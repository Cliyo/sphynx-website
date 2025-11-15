import { AuthContext } from 'contexts/AuthContext'
import { useContext, useEffect } from 'react'
import {
  ChartItem,
  ChartsContainer,
  Container,
  ContainerContent,
  ContainerHeader,
  Title,
} from './styles'
import { useAccess } from 'hooks/useAccess'
import { ChartAccessStatus } from './components/ChartAccessStatus'
import { ChartAccessTime } from './components/ChartAccessTime'
import { ChartAccessDate } from './components/ChartAccessDate'
import { Select } from 'components/Select'
import { useUnit } from 'hooks/useUnit'

export const Home = () => {
  const { user } = useContext(AuthContext)

  const { accessTableData, fetchGetAllAccess } = useAccess()
  const { fetchGetAllUnits, unitPageData } = useUnit()

  const handleUnitChange = (selectedUnitId: number) => {
    const selectedUnitIdNumber = Number(selectedUnitId)

    if (selectedUnitIdNumber) {
      fetchGetAllAccess(selectedUnitIdNumber)
    } else {
      fetchGetAllAccess()
    }
  }

  useEffect(() => {
    fetchGetAllAccess()

    if (user.isAdmin) {
      fetchGetAllUnits()
    }
  }, [fetchGetAllAccess, fetchGetAllUnits, user])

  return (
    <Container>
      <ContainerHeader>
        <Title> Bem vindo, {user.name} </Title>
      </ContainerHeader>
      <ContainerContent>
        {accessTableData.length === 0 ? (
          <>
            <p> Você ainda não possui registros de acesso. </p>

            {user.isAdmin && (
              <Select
                label="FIltrar por unidade"
                options={unitPageData.map((unit) => ({
                  label: unit.name,
                  value: unit.id,
                }))}
                onChange={(selectedUnitId) =>
                  handleUnitChange(selectedUnitId as number)
                }
              />
            )}
          </>
        ) : (
          <>
            <p> Abaixo veja suas metricas de acessos para o mes atual </p>

            {user.isAdmin && (
              <Select
                label="FIltrar por unidade"
                options={unitPageData.map((unit) => ({
                  label: unit.name,
                  value: unit.id,
                }))}
                onChange={(selectedUnitId) =>
                  handleUnitChange(selectedUnitId as number)
                }
              />
            )}

            <ChartsContainer>
              <ChartItem>
                <h2> Percentual de acessos </h2>
                <ChartAccessStatus accessTableData={accessTableData} />
              </ChartItem>
              <ChartItem>
                <h2> Dias de acesso </h2>
                <ChartAccessDate accessTableData={accessTableData} />
              </ChartItem>
              <ChartItem>
                <h2> Horarios de acesso </h2>
                <ChartAccessTime accessTableData={accessTableData} />
              </ChartItem>
            </ChartsContainer>
          </>
        )}
      </ContainerContent>
    </Container>
  )
}
