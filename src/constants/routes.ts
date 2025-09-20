import { MenuOptionProps } from 'components/NavigationBar/types'

export const routes: MenuOptionProps[] = [
  {
    iconName: 'IoHome',
    name: 'Início',
    path: '/',
    adminOnly: false,
  },
  {
    iconName: 'IoPerson',
    name: 'Usuários',
    path: '/users',
    adminOnly: true,
  },
  {
    iconName: 'IoPersonSharp',
    name: 'Dependentes',
    path: '/customers',
    adminOnly: false,
  },
  {
    iconName: 'IoMap',
    name: 'Locais',
    path: '/locals',
    adminOnly: false,
  },
  {
    iconName: 'IoPeopleSharp',
    name: 'Grupos',
    path: '/groups',
    adminOnly: false,
  },
  {
    iconName: 'IoLockClosed',
    name: 'Acessos',
    path: '/access',
    adminOnly: false,
  },
]
