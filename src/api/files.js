import request from '@/utils/request'

// 上传文件
export function Uploads(data) {
  return request({
    url: '/Uploads',
    method: 'post',
    data:data,
  })
}

//下载文件
export function downloadFile(params) {
    return request({
      url: '/downloadFile',
      method: 'get',
      params
    })
  }

  //删除文件
export function deleteFiles(params) {
  return request({
    url: '/deleteFiles',
    method: 'get',
    params
  })
}