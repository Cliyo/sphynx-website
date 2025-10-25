import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from 'services/axios'

import { GroupItemDTO } from 'dtos/GroupsDTO'
import { CreateGroupFormData } from 'pages/Groups/GroupsCreate/types'
import { notify } from 'utils/notification'
import { useTranslation } from 'react-i18next'
import { AlertContext } from 'contexts/AlertContext'
import { WeekDaysEnum } from 'utils/enums/WeekDaysEnum'

export const useGroup = () => {
  const { setIsLoading } = useContext(AlertContext)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const [groupPageData, setGroupPageData] = useState<GroupItemDTO[]>([])

  const fetchCreateGroup = async (data: CreateGroupFormData) => {
    setIsLoading(true)

    const formattedData = {
      ...data,
      weekDays: data.weekDays.map((day) => {
        return Object.keys(WeekDaysEnum).find(
          (key) => WeekDaysEnum[key as keyof typeof WeekDaysEnum] === day,
        ) as keyof typeof WeekDaysEnum
      }),
    }

    try {
      await api.post('/groups', formattedData)
      notify(t('toastMessages.success'), 'success')

      navigate('/groups')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const fetchUpdateGroup = async (id: number, data: CreateGroupFormData) => {
    setIsLoading(true)
    try {
      const formattedData = {
        ...data,
        weekDays: data.weekDays.map((day) => {
          return Object.keys(WeekDaysEnum).find(
            (key) => WeekDaysEnum[key as keyof typeof WeekDaysEnum] === day,
          ) as keyof typeof WeekDaysEnum
        }),
      }

      await api.put(`/groups/${id}`, formattedData)
      notify(t('toastMessages.success'), 'success')

      navigate('/groups')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const fetchGetAllGroups = useCallback(async () => {
    setIsLoading(true)
    const data = await api.get('/groups')
    setGroupPageData(data.data.data)
    setIsLoading(false)
  }, [])

  const fetchGetAllGroupsByName = useCallback(async (name: string) => {
    setIsLoading(true)
    const data = await api.get(`/groups?name=${name}`)
    setGroupPageData(data.data.data)
    setIsLoading(false)
  }, [])

  const fetchGetGroupById = useCallback(async (id: string) => {
    setIsLoading(true)
    const data = await api.get(`/groups/${id}`)
    setIsLoading(false)
    return data.data.data as GroupItemDTO
  }, [])

  const fetchDeleteGroupById = async (id: string) => {
    setIsLoading(true)
    try {
      await api.delete(`/groups/${id}`)
      notify(t('toastMessages.success'), 'success')

      navigate('/groups')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return {
    fetchCreateGroup,
    fetchGetAllGroups,
    fetchGetAllGroupsByName,
    fetchUpdateGroup,
    fetchGetGroupById,
    fetchDeleteGroupById,
    groupPageData,
  }
}
