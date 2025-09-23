import ReactModal from 'react-modal'
import React, { createContext, useState } from 'react'

import { globalAlertStyles } from 'themes/globalAlertStyles'

import { AlertContextDataProps, AlertContextProviderProps } from './types'

import { Modal } from 'components/Modal'
import { ModalProps } from 'components/Modal/types'

export const AlertContext = createContext({} as AlertContextDataProps)

export const AlertContextProvider = ({
  children,
}: AlertContextProviderProps) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalProps, setModalProps] = useState<ModalProps>({} as ModalProps)

  const [isLoading, setIsLoading] = useState(false)

  const { title, message, onConfirm } = modalProps

  const handleToggleModal = () => {
    setIsOpen(!modalIsOpen)
  }

  const onConfirmModal = () => {
    onConfirm()
    handleToggleModal()
  }

  const alert = (props: ModalProps) => {
    setModalProps(props)
    handleToggleModal()
  }

  return (
    <AlertContext.Provider value={{ alert, isLoading, setIsLoading }}>
      {children}

      <ReactModal
        isOpen={modalIsOpen && !!modalProps}
        style={globalAlertStyles}
      >
        <Modal
          title={title}
          message={message}
          onClose={handleToggleModal}
          onConfirm={onConfirmModal}
        />
      </ReactModal>
    </AlertContext.Provider>
  )
}
