import { useNavigate } from 'react-router'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { api } from 'services/axios'

import { CreateLocalFormData } from 'pages/Locals/LocalsCreate/types'

import { LocalGroupItemDTO } from 'dtos/LocalDTO'

import { notify } from 'utils/notification'

export const useLocal = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [localPageData, setLocalPageData] = useState<LocalGroupItemDTO[]>([])

  const fetchCreateLocal = async (data: CreateLocalFormData) => {
    try {
      await api.post('/locals', data)
      notify(t('toastMessages.success'), 'success')

      navigate('/locals')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUpdateLocal = async (id: number, data: CreateLocalFormData) => {
    try {
      await api.put(`/locals/${id}`, data)
      notify(t('toastMessages.success'), 'success')

      navigate('/locals')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchGetAllLocals = useCallback(async () => {
    const data = await api.get('/locals')
    console.log(data.data.data)
    setLocalPageData(data.data.data)
  }, [])

  const fetchGetAllLocalByName = useCallback(async (name: string) => {
    const data = await api.get(`/locals?name=${name}`)
    setLocalPageData(data.data.data)
  }, [])

  const fetchGetLocalById = useCallback(async (id: string) => {
    const data = await api.get(`/locals/${id}`)
    return data.data.data as LocalGroupItemDTO
  }, [])

  const fetchDeleteLocalById = async (id: string) => {
    try {
      await api.delete(`/locals/${id}`)
      notify(t('toastMessages.success'), 'success')

      navigate('/locals')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchCreateLocal,
    fetchUpdateLocal,
    fetchGetAllLocals,
    fetchGetAllLocalByName,
    fetchGetLocalById,
    fetchDeleteLocalById,
    localPageData,
  }
}
