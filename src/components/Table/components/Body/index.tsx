import { Icon } from 'components/Icon'
import { Container, BodyItem, BodyLine } from './styles'
import { BodyProps } from './types'
import { NavLink } from 'react-router-dom'

export const TableBody = (props: BodyProps) => {
  const { bodyLines } = props

  const path = window.location.pathname

  return (
    <Container>
      {bodyLines.map((line, index) => (
        <BodyLine key={index}>
          {line.map(
            (text, index) =>
              index !== 0 && <BodyItem key={index}> {text} </BodyItem>,
          )}
          <BodyItem>
            <NavLink to={`${path}/edit/${line[0]}`}>
              <Icon color="NEUTRAL_900" size="16" name="IoEye" />
            </NavLink>
          </BodyItem>
        </BodyLine>
      ))}
    </Container>
  )
}
