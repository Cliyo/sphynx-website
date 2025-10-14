import { MenuOptionProps } from 'components/NavigationBar/types'

export const routes: MenuOptionProps[] = [
  {
    iconName: 'IoHome',
    name: 'Início',
    path: '/',
    accessList: ['admin', 'user'],
  },
  {
    iconName: 'IoCube',
    name: 'Unidades',
    path: '/units',
    accessList: ['admin'],
  },
  {
    iconName: 'IoPerson',
    name: 'Usuários',
    path: '/users',
    accessList: ['admin', 'user'],
  },
  {
    iconName: 'IoMap',
    name: 'Locais',
    path: '/locals',
    accessList: ['user'],
  },
  {
    iconName: 'IoPeopleSharp',
    name: 'Grupos',
    path: '/groups',
    accessList: ['user'],
  },
  {
    iconName: 'IoLockClosed',
    name: 'Acessos',
    path: '/access',
    accessList: ['admin', 'user'],
  },
]
