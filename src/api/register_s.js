import request from '@/utils/request'

export function addUser(data) {
  return request({
    url: '/addUser',
    method: 'post',
    data
  })
}
