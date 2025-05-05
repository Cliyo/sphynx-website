import { useCallback, useState } from 'react'

import api from 'services/axios'
import { saveSphynxAddressStorage } from 'storage/storage'

export const useLocalsCreate = () => {
  const [macs, setMacs] = useState<{ label: string; value: string }[]>()

  const handleGetAllMacs = useCallback(async () => {
    const response = await api.get<string[][]>('/deviceFinder/scan')

    const formattedMacs = response.data.map((mac: string[]) => ({
      label: mac[1],
      value: mac[1],
    }))

    setMacs(formattedMacs)
    saveSphynxAddressStorage(response.data)
  }, [])

  return {
    handleGetAllMacs,
    macs,
  }
}
