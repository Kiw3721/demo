import request from '@/utils/request'

export function addProof(data) {
  return request({
    url: '/addProof',
    method: 'post',
    data:data,
  })
}

//删除
export function deleteProof(data) {
    return request({
      url: '/deleteProof',
      method: 'post',
      data
    })
  }

  //查询
export function searchProof(params) {
    return request({
      url: '/searchProof',
      method: 'get',
      params
    })
  }



    