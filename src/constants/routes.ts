import { MenuOptionProps } from 'components/NavigationBar/types'

export const routes: MenuOptionProps[] = [
  {
    iconName: 'IoHome',
    name: 'Início',
    path: '/',
  },
  {
    iconName: 'IoPerson',
    name: 'Usuários',
    path: '/users',
  },
  {
    iconName: 'IoPersonSharp',
    name: 'Dependentes',
    path: '/customers',
  },
  {
    iconName: 'IoMap',
    name: 'Locais',
    path: '/locals',
  },
  {
    iconName: 'IoPeopleSharp',
    name: 'Grupos',
    path: '/groups',
  },
  {
    iconName: 'IoLockClosed',
    name: 'Acessos',
    path: '/access',
  },
]
