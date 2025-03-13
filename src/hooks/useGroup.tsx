import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from 'services/axios'

import { GroupItemDTO } from 'dtos/GroupsDTO'
import { CreateGroupFormData } from 'pages/GroupsCreate/types'
import { notify } from 'utils/notification'
import { useTranslation } from 'react-i18next'

export const useGroup = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [groupPageData, setGroupPageData] = useState<GroupItemDTO[]>([])

  const fetchCreateGroup = async (data: CreateGroupFormData) => {
    try {
      await api.post('/groups', data)
      notify(t('toastMessages.success'), 'success')

      navigate('/groups')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUpdateGroup = async (id: number, data: CreateGroupFormData) => {
    try {
      await api.put(`/groups/${id}`, data)
      notify(t('toastMessages.success'), 'success')

      navigate('/groups')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchGetAllGroups = useCallback(async () => {
    const data = await api.get('/groups')
    setGroupPageData(data.data.data)
  }, [])

  const fetchGetAllGroupsByName = useCallback(async (name: string) => {
    const data = await api.get(`/groups?name=${name}`)
    setGroupPageData(data.data.data)
  }, [])

  const fetchGetGroupById = useCallback(async (id: string) => {
    const data = await api.get(`/groups/${id}`)
    return data.data.data as GroupItemDTO
  }, [])

  const fetchDeleteGroupById = async (id: string) => {
    try {
      await api.delete(`/groups/${id}`)
      notify(t('toastMessages.success'), 'success')

      navigate('/groups')
    } catch (error) {
      console.error(error)
    }
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
