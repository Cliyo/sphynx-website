import { HeaderItem, Container } from './styles'
import { HeaderProps } from './types'

export const TableHeader = (props: HeaderProps) => {
  const { headers } = props

  return (
    <Container>
      {headers.map((header, index) => (
        <HeaderItem key={index}> {header} </HeaderItem>
      ))}
      <HeaderItem />
    </Container>
  )
}
