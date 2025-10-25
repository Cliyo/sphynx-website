import { GroupItemDTO } from './GroupsDTO'

export type UserDTO = {
  id: number
  name: string
  ra: string
  user: string
  tag: string
  group: GroupItemDTO
  permissionMenus: {
    id: number
    name: string
  }[]
  isAdmin: boolean
  fingerprint: number
}
