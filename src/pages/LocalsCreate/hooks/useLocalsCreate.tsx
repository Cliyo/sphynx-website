import { useCallback } from 'react'
import api from 'services/axios'
import { ResponseDTO } from 'dtos/ResponseDTO'

export const useLocalsCreate = () => {
  const handleGetAllMacs = useCallback(async () => {
    const response =
      await api.get<ResponseDTO<string[][]>>('/deviceFinder/scan')

    return response.data
  }, [])

  return {
    handleGetAllMacs,
  }
}
