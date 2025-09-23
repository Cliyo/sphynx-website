import { ModalProps } from 'components/Modal/types'

export type AlertContextDataProps = {
  alert: (props: ModalProps) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export type AlertContextProviderProps = {
  children: React.ReactNode
}
