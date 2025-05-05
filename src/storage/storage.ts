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

export const saveSphynxAddressStorage = (data: string[][]) => {
  const formattedMacs = data.map((mac: string[]) => ({
    ip: mac[0],
    mac: mac[1],
  }))

  localStorage.setItem('sphynxs', JSON.stringify(formattedMacs))
}

type SphynxAddressStorage = {
  ip: string
  mac: string
}

export const getSphynxAddressDataStorage = (): SphynxAddressStorage[] => {
  const sphynxAddress = localStorage.getItem('sphynxs')

  return JSON.parse(sphynxAddress ?? '[]') as SphynxAddressStorage[]
}
