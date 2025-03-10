import { useNavigate } from 'react-router-dom'
import { Icon } from 'components/Icon'
import { Line } from 'components/Line'

import { useAuth } from 'hooks/useAuth'
import { useAlert } from 'hooks/useAlert'

import IconImage from 'assets/icon.svg'
import { routes } from 'constants/routes'

import {
  Container,
  LogoContainer,
  LogoImg,
  LogoText,
  MenuLeaveOption,
  MenuOption,
  MenuOptionText,
} from './styles'

export const NavigationBar = () => {
  const { alert } = useAlert()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const onConfirmLogout = () => {
    signOut()
    navigate('/auth/login')
  }

  const handleLogout = () => {
    alert({
      title: 'Sair',
      message: 'Deseja realmente sair?',
      onConfirm: onConfirmLogout,
    })
  }

  return (
    <Container>
      <LogoContainer>
        <LogoImg src={IconImage} />
        <LogoText> Sphynx </LogoText>
      </LogoContainer>

      <Line />

      {routes.map((route) => (
        <MenuOption to={route.path} key={route.name}>
          <Icon color={'NEUTRAL_0'} size="20" name={route.iconName} />
          <MenuOptionText> {route.name} </MenuOptionText>
        </MenuOption>
      ))}

      <Line />

      <MenuLeaveOption onClick={handleLogout}>
        <Icon color={'NEUTRAL_0'} size="20" name={'IoExit'} />
        <MenuOptionText> Sair </MenuOptionText>
      </MenuLeaveOption>
    </Container>
  )
}
