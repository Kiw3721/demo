import request from '@/utils/request'

export function addApply(data) {
  return request({
    url: '/addApply',
    method: 'post',
    data:data,
  })
}

//修改信息
export function updateApply(data) {
    return request({
      url: '/updateApply',
      method: 'post',
      data
    })
  }

  //查询信息
export function searchApplyById(params) {
  return request({
    url: '/searchApplyById',
    method: 'get',
    params
  })
}