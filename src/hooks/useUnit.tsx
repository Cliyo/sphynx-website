import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from 'services/axios'

import { notify } from 'utils/notification'
import { useTranslation } from 'react-i18next'
import { AlertContext } from 'contexts/AlertContext'
import { UnitDTO } from 'dtos/UnitDTO'
import { CreateUnitFormData } from 'pages/Units/UnitsCreate/types'

export const useUnit = () => {
  const { setIsLoading } = useContext(AlertContext)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const [unitPageData, setUnitPageData] = useState<UnitDTO[]>([])

  const fetchCreateUnit = async (data: CreateUnitFormData) => {
    setIsLoading(true)
    try {
      await api.post('/units', data)
      notify(t('toastMessages.success'), 'success')

      navigate('/units')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const fetchUpdateUnit = async (id: number, data: CreateUnitFormData) => {
    setIsLoading(true)
    try {
      await api.put(`/units/${id}`, data)
      notify(t('toastMessages.success'), 'success')

      navigate('/units')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const fetchGetAllUnits = useCallback(async () => {
    setIsLoading(true)
    const data = await api.get('/units')
    setUnitPageData(data.data.data)
    setIsLoading(false)
  }, [])

  const fetchGetAllUnitsByName = useCallback(async (name: string) => {
    setIsLoading(true)
    const data = await api.get(`/units?name=${name}`)
    setUnitPageData(data.data.data)
    setIsLoading(false)
  }, [])

  const fetchGetUnitById = useCallback(async (id: string) => {
    setIsLoading(true)
    const data = await api.get(`/units/${id}`)
    setIsLoading(false)
    return data.data.data as UnitDTO
  }, [])

  const fetchDeleteUnitById = async (id: string) => {
    setIsLoading(true)
    try {
      await api.delete(`/units/${id}`)
      notify(t('toastMessages.success'), 'success')

      navigate('/units')
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return {
    fetchCreateUnit,
    fetchGetAllUnits,
    fetchGetUnitById,
    fetchUpdateUnit,
    fetchDeleteUnitById,
    fetchGetAllUnitsByName,
    unitPageData,
  }
}
