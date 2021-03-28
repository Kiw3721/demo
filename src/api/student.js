import request from '@/utils/request'

//填写学生信息
export function addStudent(data) {
  return request({
    url: '/addStudent',
    method: 'post',
    data
  })
}

//修改学生信息
export function updateStudent(data) {
  return request({
    url: '/updateStudent',
    method: 'post',
    data
  })
}


//获取全部数据
export function getAllStudent(params) {
  return request({
    url: '/getAllStudent',
    method: 'get',
    params
  })
}

//获取分页数据
export function StudentList(params) {
  return request({
    url: '/StudentList',
    method: 'get',
    params
  })
}


//删除学生信息
export function deleteStudent(data) {
  return request({
    url: '/deleteStudent',
    method: 'post',
    data
  })
}

// 

export function getStudentById(params) {
  return request({
    url: '/getStudentById',
    method: 'get',
    params
  })
}