import request from '@/utils/request'

export function addHealth(data) {
  return request({
    url: '/addHealth',
    method: 'post',
    data:data,
  })
}

//修改
export function updateHealth(data) {
    return request({
      url: '/updateHealth',
      method: 'post',
      data
    })
  }

  // selectHealth
  export function selectHealthById(params) {
    return request({
      url: '/selectHealthById',
      method: 'get',
      params
    })
  }