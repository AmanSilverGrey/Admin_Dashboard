import axios from 'axios'
import {logout} from '../../_metronic/partials'

const Api = axios.create({
  baseURL: 'http://asc.apptology.in:81/api',
  timeout: 30000,
})

Api.interceptors.request.use(async (config) => {
  const userData = localStorage.getItem('User-Details')
  const jsonUserData = JSON.parse(userData)
  if (jsonUserData?.id) {
    config.headers['Authorization'] = jsonUserData?.id
  }
  return config
})
Api.interceptors.response.use(
  (res) => {
    return Promise.resolve(res)
  },
  async (error) => {
    if (error?.response?.status === 403) logout()
    return Promise.reject(error)
  }
)

export default Api
