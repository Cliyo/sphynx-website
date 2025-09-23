import { useCallback, useContext, useState } from 'react'

import { api } from 'services/axios'

import { AccessItemDTO } from 'dtos/AccessDTO'
import { AlertContext } from 'contexts/AlertContext'

export const useAccess = () => {
  const { setIsLoading } = useContext(AlertContext)

  const [accessTableData, setAccessTableData] = useState<AccessItemDTO[]>([])

  const fetchGetAllAccess = useCallback(async () => {
    setIsLoading(true)
    const request = await api.get('/accessRegisters')
    setAccessTableData(request.data.data)
    setIsLoading(false)
  }, [])

  return {
    fetchGetAllAccess,
    accessTableData,
  }
}
