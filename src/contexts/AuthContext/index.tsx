import { createContext, useCallback, useEffect, useState } from 'react'
import { AuthContextDataProps, AuthContextProviderProps } from './types'
import { api } from 'services/axios'
import { LoginFormData } from 'pages/Login/types'
import { SignInDTO, AuthDTO } from 'dtos/SignInDTO'
import { JWTdecoder } from 'utils/JWTdecoder'
import {
  getAuthDataStorage,
  removeAuthDataStorage,
  saveAuthDataStorage,
} from 'storage/storage'
import { notify } from 'utils/notification'

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthDTO>({} as AuthDTO)

  const persistUserData = useCallback(
    (token: string | null, isAdmin: boolean) => {
      if (token) {
        const jwtDecoded = JWTdecoder(token)

        if (jwtDecoded?.sub) {
          setUser({
            isAuthenticated: true,
            isAdmin,
            ...jwtDecoded,
          })

          api.defaults.headers.common.Authorization = `Bearer ${token}`
        }
      }
    },
    [],
  )

  const loadUserData = useCallback(() => {
    const data = getAuthDataStorage()

    if (!data) return

    persistUserData(data.token, data.isAdmin)
  }, [persistUserData])

  const fetchLogin = useCallback(
    async (formData: LoginFormData) => {
      try {
        const { data } = await api.post<SignInDTO>('/auth/login', formData)

        console.log(data)

        if (data) {
          saveAuthDataStorage({
            token: data.token,
            isAdmin: data.isAdmin,
          })

          persistUserData(data.token, data.isAdmin)

          notify('Login efetuado com sucesso', 'success')
        }
      } catch (error) {
        notify('Erro ao efetuar login', 'error')
        console.log(error)
      }
    },
    [persistUserData],
  )

  const signOut = useCallback(() => {
    removeAuthDataStorage()
    setUser({} as AuthDTO)
    api.defaults.headers.common.Authorization = ''
  }, [])

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  return (
    <AuthContext.Provider value={{ user, fetchLogin, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
