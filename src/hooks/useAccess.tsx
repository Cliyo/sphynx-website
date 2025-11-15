import { useCallback, useContext, useState } from 'react'

import { api } from 'services/axios'

import { AccessItemDTO } from 'dtos/AccessDTO'
import { AlertContext } from 'contexts/AlertContext'

export const useAccess = () => {
  const { setIsLoading } = useContext(AlertContext)

  const [accessTableData, setAccessTableData] = useState<AccessItemDTO[]>([])

  const fetchGetAllAccess = useCallback(async (unitId?: number) => {
    setIsLoading(true)
    let request
    if (unitId) {
      request = await api.get(`/accessRegisters?unitId=${unitId}`)
    } else {
      request = await api.get('/accessRegisters')
    }
    setAccessTableData(request.data.data)
    setIsLoading(false)
  }, [])

  return {
    fetchGetAllAccess,
    accessTableData,
  }
}
