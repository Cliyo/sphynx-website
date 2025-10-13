import { useNavigate } from 'react-router'
import { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { api } from 'services/axios'

import { CreateLocalFormData } from 'pages/Locals/LocalsCreate/types'

import { LocalDTO } from 'dtos/LocalDTO'

import { notify } from 'utils/notification'
import { AlertContext } from 'contexts/AlertContext'

export const useLocal = () => {
  const { setIsLoading } = useContext(AlertContext)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const [localPageData, setLocalPageData] = useState<LocalDTO[]>([])

  const fetchCreateLocal = async (data: CreateLocalFormData) => {
    setIsLoading(true)
    try {
      await api.post('/locals', data)
      notify(t('toastMessages.success'), 'success')

      navigate('/locals')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const fetchUpdateLocal = async (id: number, data: CreateLocalFormData) => {
    setIsLoading(true)
    try {
      await api.put(`/locals/${id}`, data)
      notify(t('toastMessages.success'), 'success')

      navigate('/locals')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const fetchGetAllLocals = useCallback(async () => {
    setIsLoading(true)
    const data = await api.get('/locals')
    console.log(data.data.data)
    setLocalPageData(data.data.data)
    setIsLoading(false)
  }, [])

  const fetchGetAllLocalByName = useCallback(async (name: string) => {
    setIsLoading(true)
    const data = await api.get(`/locals?name=${name}`)
    setLocalPageData(data.data.data)
    setIsLoading(false)
  }, [])

  const fetchGetLocalById = useCallback(async (id: string) => {
    setIsLoading(true)
    const data = await api.get(`/locals/${id}`)
    setIsLoading(false)
    return data.data.data as LocalDTO
  }, [])

  const fetchDeleteLocalById = async (id: string) => {
    setIsLoading(true)
    try {
      await api.delete(`/locals/${id}`)
      notify(t('toastMessages.success'), 'success')

      navigate('/locals')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
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
