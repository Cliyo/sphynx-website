import { DeviceDTO } from 'dtos/DeviceDTO'
import { useCallback, useState } from 'react'

import api from 'services/axios'
import { saveSphynxAddressStorage } from 'storage/storage'

export const useLocalsCreate = () => {
  const [devices, setDevices] = useState<DeviceDTO[]>([])

  const handleGetAllDevices = useCallback(async () => {
    const response = await api.get<DeviceDTO[]>('/deviceFinder/scan')

    setDevices(response.data)
    saveSphynxAddressStorage(response.data)
  }, [])

  return {
    handleGetAllDevices,
    devices,
  }
}
