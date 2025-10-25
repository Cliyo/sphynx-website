import { PermissionMenuEnum } from 'utils/enums/PermissionMenusEnum'

export type MenuOptionProps = {
  iconName: string
  path: string
  name: string
  accessList: string[]
  menu?: PermissionMenuEnum
}
