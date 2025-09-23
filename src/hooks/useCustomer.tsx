import { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { api } from 'services/axios'

import { CreateCustomerFormData } from 'pages/Customers/CustomersCreate/types'

import { CustomerItemDTO, CustomerTableDataDTO } from 'dtos/CustomerDTO'

import { notify } from 'utils/notification'
import { AlertContext } from 'contexts/AlertContext'

export const useCustomer = () => {
  const { setIsLoading } = useContext(AlertContext)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const [customerTableData, setCustomerTableData] = useState<
    CustomerTableDataDTO[]
  >([])

  const fetchCreateCustomer = async (data: CreateCustomerFormData) => {
    setIsLoading(true)
    try {
      await api.post('/consumers', data)
      notify(t('toastMessages.success'), 'success')

      navigate('/customers')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const fetchUpdateCustomer = async (
    id: number,
    data: CreateCustomerFormData,
  ) => {
    setIsLoading(true)
    try {
      await api.put(`/consumers/${id}`, data)
      notify(t('toastMessages.success'), 'success')

      navigate('/customers')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const fetchGetAllCustomers = useCallback(async () => {
    setIsLoading(true)
    const request = await api.get('/consumers')
    const data = request.data.data as CustomerItemDTO[]

    const dataFormatted = data.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        ra: customer.ra,
        tag: customer.tag,
        group: customer.group.name,
      } as CustomerTableDataDTO
    })

    setCustomerTableData(dataFormatted)
    setIsLoading(false)
  }, [])

  const fetchGetAllCustomersByRa = useCallback(async (ra: string) => {
    setIsLoading(true)
    const request = await api.get(`/consumers?ra=${ra}`)
    const data = request.data.data as CustomerItemDTO[]

    const dataFormatted = data.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        ra: customer.ra,
        tag: customer.tag,
        group: customer.group.name,
      } as CustomerTableDataDTO
    })

    setCustomerTableData(dataFormatted)
    setIsLoading(false)
  }, [])

  const fetchGetCustomerById = useCallback(async (id: string) => {
    setIsLoading(true)
    const request = await api.get(`/consumers/${id}`)
    setIsLoading(false)
    return request.data.data as CustomerItemDTO
  }, [])

  const fetchDeleteCustomerById = async (id: string) => {
    setIsLoading(true)
    try {
      await api.delete(`/consumers/${id}`)
      notify(t('toastMessages.success'), 'success')

      navigate('/customers')
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return {
    fetchGetAllCustomers,
    fetchGetAllCustomersByRa,
    fetchUpdateCustomer,
    fetchCreateCustomer,
    fetchGetCustomerById,
    fetchDeleteCustomerById,
    customerTableData,
  }
}
