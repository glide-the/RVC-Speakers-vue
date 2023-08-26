import requestData from '@/utils/requestData'


export const runnerSubmit = (data) => {
  return requestData({
    url: '/runner/submit',
    method: 'post',
    data: data
  })
}

export const runnerResult = (params) => {
  return requestData({
    url: '/runner/result',
    method: 'get',
    responseType: 'blob',
    params: params
  })
}
