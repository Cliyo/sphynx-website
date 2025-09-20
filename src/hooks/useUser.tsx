import { UserDTO } from 'dtos/UserDTO'
import { CreateUserFormData } from 'pages/Users/UsersCreate/types'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import api from 'services/axios'
import { notify } from 'utils/notification'

export const useUser = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [userTableData, setUserTableData] = useState<UserDTO[]>([])

  const fetchCreateUser = async (data: CreateUserFormData) => {
    try {
      await api.post('/auth/users/', data)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUpdateUser = async (id: number, data: CreateUserFormData) => {
    try {
      await api.put(`/auth/users/${id}`, data)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGetAllUsers = useCallback(async () => {
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

    console.log(dataFormatted)

    setUserTableData(dataFormatted)
  }, [])

  const fetchGetUserById = useCallback(async (id: string) => {
    const request = await api.get(`/auth/users/${id}`)
    return request.data.data as UserDTO
  }, [])

  const fetchDeleteUserById = async (id: string) => {
    try {
      await api.delete(`/auth/users/${id}`)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
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
