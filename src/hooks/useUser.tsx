import { AlertContext } from 'contexts/AlertContext'
import { UserDTO } from 'dtos/UserDTO'
import { CreateUserFormData } from 'pages/Users/UsersCreate/types'
import { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import api from 'services/axios'
import { PermissionMenuEnum } from 'utils/enums/PermissionMenusEnum'
import { notify } from 'utils/notification'

export const useUser = () => {
  const { setIsLoading } = useContext(AlertContext)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const [userTableData, setUserTableData] = useState<UserDTO[]>([])

  const fetchCreateUser = async (data: CreateUserFormData) => {
    setIsLoading(true)
    try {
      const finalRequestObject = {
        ...data,
        unitId: data.unitId === 0 ? null : Number(data.unitId),
        groupId: data.groupId === 0 ? null : Number(data.groupId),
        isAdmin: data.isAdmin === 'true',
        permissionMenu: data.permissionMenu.map((menu) => {
          return Object.keys(PermissionMenuEnum).find(
            (key) =>
              PermissionMenuEnum[key as keyof typeof PermissionMenuEnum] ===
              menu,
          ) as keyof typeof PermissionMenuEnum
        }),
      }

      await api.post('/users', finalRequestObject)
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
      const finalRequestObject = {
        ...data,
        unitId: data.unitId === 0 ? null : Number(data.unitId),
        groupId: data.groupId === 0 ? null : Number(data.groupId),
        isAdmin: data.isAdmin === 'true',
        permissionMenu: data.permissionMenu.map((menu) => {
          return Object.keys(PermissionMenuEnum).find(
            (key) =>
              PermissionMenuEnum[key as keyof typeof PermissionMenuEnum] ===
              menu,
          ) as keyof typeof PermissionMenuEnum
        }),
      }

      await api.put(`/users/${id}`, finalRequestObject)
      notify(t('toastMessages.success'), 'success')

      navigate('/users')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const fetchGetAllUsers = useCallback(async () => {
    setIsLoading(true)
    const request = await api.get('/users')
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
    const request = await api.get(`/users/${id}`)
    setIsLoading(false)

    return request.data.data as UserDTO
  }, [])

  const fetchDeleteUserById = async (id: string) => {
    setIsLoading(true)
    try {
      await api.delete(`/users/${id}`)
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
