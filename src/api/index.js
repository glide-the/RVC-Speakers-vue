import requestData from '@/utils/requestData'


export const runnerSubmit = (data) => {
  return requestData({
    url: '/runner/submit',
    method: 'post',
    data: data
  })
}
export const runnerStatus = (params) => {
  return requestData({
    url: '/runner/result',
    method: 'get',
    params: params
  })
}

export const runnerResult = (params) => {
  return requestData({
    url: '/runner/result_source',
    method: 'get',
    responseType: 'blob',
    params: params
  })
}
