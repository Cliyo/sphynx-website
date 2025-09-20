import { AuthContext } from 'contexts/AuthContext'
import { useContext } from 'react'
import { Container, ContainerHeader, Title } from './styles'

export const Home = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container>
      <ContainerHeader>
        <Title> Bem vindo, {user.name} </Title>
      </ContainerHeader>
    </Container>
  )
}
