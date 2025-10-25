import { PermissionMenuEnum } from 'utils/enums/PermissionMenusEnum'

export type SignInDTO = {
  token: string
}

export type SignInDecodedDTO = {
  exp: number
  iss: string
  sub: string
  name: string
  isAdmin: boolean
  unitId: number
  permissionMenu: PermissionMenuEnum[]
}

export type AuthDTO = SignInDecodedDTO & {
  isAuthenticated: boolean
}
