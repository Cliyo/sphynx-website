import { LoadingContainer } from './styles'

import Spinner from '../../assets/spinner.gif'
import { LoadingProps } from './types'

export const Loading = (props: LoadingProps) => {
  const { isLoading } = props

  if (!isLoading) {
    return null
  }

  return (
    <LoadingContainer>
      <img src={Spinner} alt="Loading..." width="200px" />
    </LoadingContainer>
  )
}
