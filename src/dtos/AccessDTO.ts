import { LocalDTO } from './LocalDTO'
import { CustomerItemDTO } from './CustomerDTO'

export type AccessItemDTO = {
  id: number
  consumer: CustomerItemDTO
  local: LocalDTO
  status: boolean
}
