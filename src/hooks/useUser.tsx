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
      await api.post('/users', data)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUpdateUser = async (id: number, data: CreateUserFormData) => {
    try {
      await api.put(`/users/${id}`, data)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGetAllUsers = useCallback(async () => {
    const request = await api.get('/consumers')
    const data = request.data.data as UserDTO[]

    const dataFormatted = data.map((user) => {
      return {
        name: user.name,
        email: user.email,
        ra: user.ra,
      } as UserDTO
    })

    setUserTableData(dataFormatted)
  }, [])

  const fetchGetUserById = useCallback(async (id: string) => {
    const request = await api.get(`/users/${id}`)
    return request.data.data as UserDTO
  }, [])

  const fetchDeleteUserById = async (id: string) => {
    try {
      await api.delete(`/users/${id}`)
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
