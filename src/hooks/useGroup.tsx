import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from 'services/axios'

import { GroupItemDTO } from 'dtos/GroupsDTO'
import { CreateGroupFormData } from 'pages/Groups/GroupsCreate/types'
import { notify } from 'utils/notification'
import { useTranslation } from 'react-i18next'
import { AlertContext } from 'contexts/AlertContext'

export const useGroup = () => {
  const { setIsLoading } = useContext(AlertContext)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const [groupPageData, setGroupPageData] = useState<GroupItemDTO[]>([])

  const fetchCreateGroup = async (data: CreateGroupFormData) => {
    setIsLoading(true)
    try {
      await api.post('/groups', data)
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
      await api.put(`/groups/${id}`, data)
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
