import { LocalItemDTO } from './LocalDTO'
import { CustomerItemDTO } from './CustomerDTO'

export type AccessItemDTO = {
  id: number
  customer: CustomerItemDTO
  local: LocalItemDTO
  situation: string
}
