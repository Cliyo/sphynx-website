import { useAuth } from 'hooks/useAuth'
import { PrivateRouteProps } from './types'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { children } = props

  const location = useLocation()

  const { user } = useAuth()
  const { isAuthenticated } = user

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <PrivateRouteContainer>{children}</PrivateRouteContainer>
}
