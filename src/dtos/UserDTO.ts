import { GroupItemDTO } from './GroupsDTO'

export type UserDTO = {
  id: number
  name: string
  ra: string
  user: string
  tag: string
  group: GroupItemDTO
  isAdmin: boolean
  fingerprint: number
}
