import { PrivateRouteProps } from './types'
import { Navigate, useLocation } from 'react-router-dom'
import { PrivateRouteContainer } from './styles'
import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { children } = props

  const location = useLocation()

  const { user } = useContext(AuthContext)
  const { isAuthenticated } = user

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <PrivateRouteContainer>{children}</PrivateRouteContainer>
}
