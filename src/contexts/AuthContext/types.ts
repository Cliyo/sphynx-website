import { AuthDTO } from 'dtos/SignInDTO'
import { LoginFormData } from 'pages/Auth/Login/types'

export type AuthContextDataProps = {
  user: AuthDTO
  fetchLogin: (data: LoginFormData) => Promise<void>
  signOut: () => void
}

export type AuthContextProviderProps = {
  children: React.ReactNode
}
