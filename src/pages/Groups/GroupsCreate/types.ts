import { WeekDaysEnum } from 'utils/enums/WeekDaysEnum'

export type CreateGroupFormData = {
  name: string
  weekDays: WeekDaysEnum[]
}
