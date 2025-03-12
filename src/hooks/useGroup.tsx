import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from 'services/axios'

import { GroupItemDTO } from 'dtos/GroupsDTO'
import { CreateGroupFormData } from 'pages/GroupsCreate/types'

export const useGroup = () => {
  const navigate = useNavigate()

  const [groupPageData, setGroupPageData] = useState<GroupItemDTO[]>([])

  const fetchCreateGroup = async (data: CreateGroupFormData) => {
    await api.post('/groups', data)

    navigate('/groups')
  }

  const fetchUpdateGroup = async (id: number, data: CreateGroupFormData) => {
    await api.put(`/groups/${id}`, data)

    navigate('/groups')
  }

  const fetchGetAllGroups = useCallback(async () => {
    const data = await api.get('/groups')
    setGroupPageData(data.data)
  }, [])

  const fetchGetGroupById = useCallback(async (id: string) => {
    const data = await api.get(`/groups/${id}`)
    return data.data as GroupItemDTO
  }, [])

  const fetchDeleteGroupById = async (id: string) => {
    await api.delete(`/groups/${id}`)

    navigate('/groups')
  }

  return {
    fetchCreateGroup,
    fetchGetAllGroups,
    fetchUpdateGroup,
    fetchGetGroupById,
    fetchDeleteGroupById,
    groupPageData,
  }
}
