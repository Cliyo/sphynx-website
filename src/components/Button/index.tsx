import { Container } from './styles'
import { ButtonProps } from './types'

export const Button = (props: ButtonProps) => {
  const { text, color, onClick } = props

  return (
    <Container
      color={color}
      onClick={onClick}
    >
      {text}
    </Container>
  )
}
