import { Button } from 'components/Button'
import { Container, ErrorContainer, Text, Title } from './styles'
import { useTranslation } from 'react-i18next'
import { Icon } from 'components/Icon'

export const NotFound = () => {
  const { t } = useTranslation()

  const handleBack = () => {
    window.history.back()
  }

  return (
    <Container>
      <ErrorContainer>
        <Icon color="PRIMARY_DARK" size="124" name="IoSkullOutline" />
        <Title> 404 </Title>
        <Text> {t('httpErrors.404')} </Text>
        <Button text="Voltar" color="PRIMARY_LIGHT" onClick={handleBack} />
      </ErrorContainer>
    </Container>
  )
}
