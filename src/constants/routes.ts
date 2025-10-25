import { MenuOptionProps } from 'components/NavigationBar/types'
import { PermissionMenuEnum } from 'utils/enums/PermissionMenusEnum'

export const routes: MenuOptionProps[] = [
  {
    iconName: 'IoHome',
    name: 'Início',
    path: '/',
    accessList: ['admin', 'user'],
    menu: PermissionMenuEnum.DASHBOARD,
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
    menu: PermissionMenuEnum.USERS,
  },
  {
    iconName: 'IoMap',
    name: 'Locais',
    path: '/locals',
    accessList: ['user'],
    menu: PermissionMenuEnum.LOCALS,
  },
  {
    iconName: 'IoPeopleSharp',
    name: 'Grupos',
    path: '/groups',
    accessList: ['user'],
    menu: PermissionMenuEnum.GROUPS,
  },
  {
    iconName: 'IoLockClosed',
    name: 'Acessos',
    path: '/access',
    accessList: ['admin', 'user'],
    menu: PermissionMenuEnum.ACCESS,
  },
]
