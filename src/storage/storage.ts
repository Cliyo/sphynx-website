import { DeviceDTO } from 'dtos/DeviceDTO'
import { AUTH_TOKEN_STORAGE } from './storageConfig'

export const saveAuthDataStorage = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export const getAuthDataStorage = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE)

    return token ?? null
  } catch (error) {
    console.log('getAuthDataStorage: ', error)

    return null
  }
}

export const removeAuthDataStorage = () => {
  localStorage.removeItem(AUTH_TOKEN_STORAGE)
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
