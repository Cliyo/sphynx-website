import axios from 'axios'

import { BASE_URL } from 'constants/request'
import { notify } from 'utils/notification'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    language: 'pt-BR',
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error

    if (response) {
      const data = response.data
      notify(data.message ?? 'Ocorreu um erro na operação', 'error')
    } else {
      notify('Ocorreu um erro na operação', 'error')
    }

    return Promise.reject(error)
  },
)

export default api
