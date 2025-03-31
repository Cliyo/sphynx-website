import { GroupItemDTO } from './GroupsDTO'

export type LocalDTO = {
  id: number
  name: string
  mac: string
}

export type LocalGroupItemDTO = {
  local: LocalDTO
  groups: GroupItemDTO[]
}
