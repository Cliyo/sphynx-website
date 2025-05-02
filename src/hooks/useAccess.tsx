import { useCallback, useState } from 'react'

import { api } from 'services/axios'

import { AccessItemDTO } from 'dtos/AccessDTO'

export const useAccess = () => {
  const [accessTableData, setAccessTableData] = useState<AccessItemDTO[]>([])

  const fetchGetAllAccess = useCallback(async () => {
    const request = await api.get('/accessRegisters')
    setAccessTableData(request.data.data)
  }, [])

  return {
    fetchGetAllAccess,
    accessTableData,
  }
}
