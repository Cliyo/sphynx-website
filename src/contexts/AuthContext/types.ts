import { AuthDTO } from 'dtos/SignInDTO'
import { LoginFormData } from 'pages/Login/types'

export type AuthContextDataProps = {
  user: AuthDTO
  fetchLogin: (data: LoginFormData) => Promise<void>
  signOut: () => void
}

export type AuthContextProviderProps = {
  children: React.ReactNode
}
