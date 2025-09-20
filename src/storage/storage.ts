import { DeviceDTO } from 'dtos/DeviceDTO'
import { AUTH_STORAGE } from './storageConfig'

type AuthObject = {
  token: string
}

export const saveAuthDataStorage = (data: AuthObject) => {
  localStorage.setItem(AUTH_STORAGE, JSON.stringify(data))
}

export const getAuthDataStorage = () => {
  try {
    const data = localStorage.getItem(AUTH_STORAGE)

    if (!data) return null

    const dataParsed = JSON.parse(data) as AuthObject

    return dataParsed
  } catch (error) {
    console.log('getAuthDataStorage: ', error)

    return null
  }
}

export const removeAuthDataStorage = () => {
  localStorage.removeItem(AUTH_STORAGE)
}

export const saveSphynxAddressStorage = (data: DeviceDTO[]) => {
  localStorage.setItem('sphynxs', JSON.stringify(data))
}

type SphynxAddressStorage = {
  ip: string
  mac: string
  registered: boolean
}

export const getSphynxAddressDataStorage = (): SphynxAddressStorage[] => {
  const sphynxAddress = localStorage.getItem('sphynxs')

  return JSON.parse(sphynxAddress ?? '[]') as SphynxAddressStorage[]
}
