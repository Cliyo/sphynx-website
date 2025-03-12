import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from 'services/axios'

import { CustomerItemDTO, CustomerTableDataDTO } from 'dtos/CustomerDTO'
import { CreateCustomerFormData } from 'pages/CustomersCreate/types'

export const useCustomer = () => {
  const navigate = useNavigate()

  const [customerTableData, setCustomerTableData] = useState<
    CustomerTableDataDTO[]
  >([])

  const fetchCreateCustomer = async (data: CreateCustomerFormData) => {
    await api.post('/consumers', data)

    navigate('/customers')
  }

  const fetchUpdateCustomer = async (
    id: number,
    data: CreateCustomerFormData,
  ) => {
    await api.put(`/consumers/${id}`, data)

    navigate('/customers')
  }

  const fetchGetAllCustomers = useCallback(async () => {
    const request = await api.get('/consumers')
    const data = request.data as CustomerItemDTO[]

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
    return request.data as CustomerItemDTO
  }, [])

  const fetchDeleteCustomerById = async (id: string) => {
    await api.delete(`/consumers/${id}`)

    navigate('/customers')
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
