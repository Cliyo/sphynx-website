import { useNavigate } from 'react-router-dom'
import { Icon } from 'components/Icon'
import { Line } from 'components/Line'

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
import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'

export const NavigationBar = () => {
  const { alert } = useAlert()
  const { signOut, user } = useContext(AuthContext)
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

  const userRole = user.isAdmin ? 'admin' : 'user'

  return (
    <Container>
      <LogoContainer>
        <LogoImg src={IconImage} />
        <LogoText> Sphynx </LogoText>
      </LogoContainer>

      <Line />

      {routes.map(
        (route) =>
          route.accessList.includes(userRole) &&
          (user.isAdmin ||
            (route.menu ? user.permissionMenu.includes(route.menu) : true)) && (
            <MenuOption to={route.path} key={route.name}>
              <Icon color={'NEUTRAL_0'} size="20" name={route.iconName} />
              <MenuOptionText> {route.name} </MenuOptionText>
            </MenuOption>
          ),
      )}

      <Line />

      <MenuLeaveOption onClick={handleLogout}>
        <Icon color={'NEUTRAL_0'} size="20" name={'IoExit'} />
        <MenuOptionText> Sair </MenuOptionText>
      </MenuLeaveOption>
    </Container>
  )
}
