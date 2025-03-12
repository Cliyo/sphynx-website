import { ModalProps } from './types'

import { Button } from 'components/Button'

import { ButtonsContainer, Container, Text, Title } from './styles'
import { Icon } from 'components/Icon'

export const Modal = (props: ModalProps) => {
  const { title, message, onClose, onConfirm } = props

  return (
    <Container>
      <Icon color="PRIMARY_DARK" name="IoAlertCircleOutline" size="124" />
      <Title> {title} </Title>
      <Text> {message} </Text>
      <ButtonsContainer>
        <Button color="ERROR_LIGHT" onClick={onClose} text="Fechar" />
        <Button color="PRIMARY_LIGHT" onClick={onConfirm} text="Confirmar" />
      </ButtonsContainer>
    </Container>
  )
}
