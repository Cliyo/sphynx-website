import { TopInfosContainerProps } from './types'

import { Container, InfoContainer, Text, Title } from './styles'

export const TopInfosContainer = (props: TopInfosContainerProps) => {
  const { topInfos } = props

  return (
    <Container>
      {topInfos.map((topInfo, index) => (
        <InfoContainer key={index}>
          <Title> {topInfo.title} </Title>
          <Text> {topInfo.text} </Text>
        </InfoContainer>
      ))}
    </Container>
  )
}
