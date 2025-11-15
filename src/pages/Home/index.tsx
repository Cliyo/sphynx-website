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

export const Home = () => {
  const { user } = useContext(AuthContext)

  const { accessTableData, fetchGetAllAccess } = useAccess()

  useEffect(() => {
    fetchGetAllAccess()
  }, [fetchGetAllAccess])

  return (
    <Container>
      <ContainerHeader>
        <Title> Bem vindo, {user.name} </Title>
      </ContainerHeader>
      <ContainerContent>
        <p> Abaixo veja suas metricas de acessos para o mes atual </p>

        <ChartsContainer>
          <ChartItem>
            <h2> Percentual de acessos </h2>
            <ChartAccessStatus accessTableData={accessTableData} />
          </ChartItem>
          <ChartItem>
            <h2> Horarios de acesso </h2>
            <ChartAccessTime accessTableData={accessTableData} />
          </ChartItem>
        </ChartsContainer>
      </ContainerContent>
    </Container>
  )
}
