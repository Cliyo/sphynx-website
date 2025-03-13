import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from 'services/axios'

import { CustomerItemDTO, CustomerTableDataDTO } from 'dtos/CustomerDTO'
import { CreateCustomerFormData } from 'pages/CustomersCreate/types'
import { notify } from 'utils/notification'

export const useCustomer = () => {
  const navigate = useNavigate()

  const [customerTableData, setCustomerTableData] = useState<
    CustomerTableDataDTO[]
  >([])

  const fetchCreateCustomer = async (data: CreateCustomerFormData) => {
    try {
      await api.post('/consumers', data)
      notify('Operação realizada com sucesso', 'success')

      navigate('/customers')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUpdateCustomer = async (
    id: number,
    data: CreateCustomerFormData,
  ) => {
    try {
      await api.put(`/consumers/${id}`, data)
      notify('Operação realizada com sucesso', 'success')

      navigate('/customers')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchGetAllCustomers = useCallback(async () => {
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
  }, [])

  const fetchGetCustomerById = useCallback(async (id: string) => {
    const request = await api.get(`/consumers/${id}`)
    return request.data.data as CustomerItemDTO
  }, [])

  const fetchDeleteCustomerById = async (id: string) => {
    try {
      await api.delete(`/consumers/${id}`)
      notify('Operação realizada com sucesso', 'success')

      navigate('/customers')
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetchGetAllCustomers,
    fetchUpdateCustomer,
    fetchCreateCustomer,
    fetchGetCustomerById,
    fetchDeleteCustomerById,
    customerTableData,
  }
}
