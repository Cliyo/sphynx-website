import { LocalDTO } from './LocalDTO'
import { UserDTO } from './UserDTO'

export type AccessItemDTO = {
  id: number
  user: UserDTO
  local: LocalDTO
  status: boolean
  date: Date
  time: string
}
