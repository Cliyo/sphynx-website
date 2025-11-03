import { useContext, useState } from 'react'
import { Icon } from 'components/Icon'
import {
  MenuMobileButton,
  MobileMenuOption,
  MobileOptions,
  NavigationBarMobileContainer,
} from './styles'
import { routes } from 'constants/routes'
import { AuthContext } from 'contexts/AuthContext'

export const NavigationBarMobile = () => {
  const { user } = useContext(AuthContext)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const userRole = user.isAdmin ? 'admin' : 'user'

  return (
    <NavigationBarMobileContainer>
      <MenuMobileButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <Icon name="IoApps" size="32" color="NEUTRAL_900" />
      </MenuMobileButton>
      <MobileOptions isMobileMenuOpen={isMobileMenuOpen}>
        {routes.map(
          (route) =>
            route.accessList.includes(userRole) &&
            (user.isAdmin ||
              (route.menu
                ? user.permissionMenu.includes(route.menu)
                : true)) && (
              <MobileMenuOption to={route.path} key={route.name}>
                <li key={route.name} onClick={() => setIsMobileMenuOpen(false)}>
                  {route.name}
                </li>
              </MobileMenuOption>
            ),
        )}
      </MobileOptions>
    </NavigationBarMobileContainer>
  )
}
