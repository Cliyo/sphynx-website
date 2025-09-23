import { AlertContext } from 'contexts/AlertContext'
import { UserDTO } from 'dtos/UserDTO'
import { CreateUserFormData } from 'pages/Users/UsersCreate/types'
import { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import api from 'services/axios'
import { notify } from 'utils/notification'

export const useUser = () => {
  const { setIsLoading } = useContext(AlertContext)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const [userTableData, setUserTableData] = useState<UserDTO[]>([])

  const fetchCreateUser = async (data: CreateUserFormData) => {
    setIsLoading(true)
    try {
      await api.post('/auth/register', data)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const fetchUpdateUser = async (id: number, data: CreateUserFormData) => {
    setIsLoading(true)
    try {
      await api.put(`/auth/users/${id}`, data)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const fetchGetAllUsers = useCallback(async () => {
    setIsLoading(true)
    const request = await api.get('/auth/users')
    const data = request.data.data as UserDTO[]

    const dataFormatted = data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        ra: user.ra,
        user: user.user,
      } as UserDTO
    })

    setUserTableData(dataFormatted)
    setIsLoading(false)
  }, [])

  const fetchGetUserById = useCallback(async (id: string) => {
    setIsLoading(true)
    const request = await api.get(`/auth/users/${id}`)
    setIsLoading(false)
    return request.data.data as UserDTO
  }, [])

  const fetchDeleteUserById = async (id: string) => {
    setIsLoading(true)
    try {
      await api.delete(`/auth/users/${id}`)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return {
    userTableData,
    setUserTableData,
    fetchGetAllUsers,
    fetchCreateUser,
    fetchUpdateUser,
    fetchGetUserById,
    fetchDeleteUserById,
  }
}
