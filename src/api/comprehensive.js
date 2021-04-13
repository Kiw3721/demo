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

  //分页查询
  export function ComprehensiveList(params) {
    return request({
      url: '/ComprehensiveList',
      method: 'get',
      params
    })
  }


  
  //条件查询
  export function selectComprehensive(params) {
    return request({
      url: '/selectComprehensive',
      method: 'get',
      params
    })
  }

  //修改等级
export function updateLevel(data) {
  return request({
    url: '/updateLevel',
    method: 'post',
    data
  })
}