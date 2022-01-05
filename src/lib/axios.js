import axios from 'axios'
import env from '../env'

const { API_URL, API_KEY } = env

const API = async (props) => {
  const {
    path, method = 'GET', params = {}, data,
  } = props
  const timeout = 15E3
  const config = {
    timeout,
    baseURL: API_URL,
    url: path,
    method,
    params: {
      language: 'en-US',
      api_key: API_KEY,
      ...params,
    },
    data,
    headers: {
      Accept: 'application/json',
    },
  }
  const response = await axios(config)
  return response.data
}

export default API
