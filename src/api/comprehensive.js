import request from '@/utils/request'

export function submitComprehensive(data) {
  return request({
    url: '/submitComprehensive',
    method: 'post',
    data:data,
  })
}

//修改信息
export function updateComprehensive(data) {
    return request({
      url: '/updateComprehensive',
      method: 'post',
      data
    })
  }

  //查询信息
export function selectComprehensiveById(params) {
  return request({
    url: '/selectComprehensiveById',
    method: 'get',
    params
  })
}

  //查询信息
  export function ComprehensiveList(params) {
    return request({
      url: '/ComprehensiveList',
      method: 'get',
      params
    })
  }