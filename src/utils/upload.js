import axios from 'axios'
import { getAccessToken } from '@/utils/auth'

export function upload(api, file) {
  var data = new FormData()
  data.append('file', file)
  const config = {
    headers: { 'Authorization': getAccessToken() }
  }
  return axios.post(api, data, config)
}
