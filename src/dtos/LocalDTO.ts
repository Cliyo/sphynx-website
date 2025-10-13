import { GroupItemDTO } from './GroupsDTO'

export type LocalDTO = {
  id: number
  name: string
  mac: string
  groups: GroupItemDTO[]
}
