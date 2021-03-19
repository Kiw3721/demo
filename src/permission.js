import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
var flag=0
const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = localStorage.getItem('user')?true:false
  console.log(hasToken,'hasToken')


  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })

    } else {

        // 判断当前用户是否已拉取完user_info信息
        if (hasToken&&flag==0){
          //从sessionStorage中取出数据
          const hasRoles = JSON.parse(localStorage.getItem('user')).roles
          console.log("roles："+store.getters.roles,hasRoles)
          const account = JSON.parse(localStorage.getItem('user')).account
          console.log("对比账号："+store.getters.account,account);
          // 拉取user_info
          store.dispatch('permission/generateRoutes', hasRoles).then(res => {
            flag++
            console.log(res,'sdfsd')
            var aaa=router.options.routes

            router.options.routes=aaa.concat(res)
            router.addRoutes(res)
            console.log(aaa,'aaa',res, store.getters.permission_routes, router.options.routes)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            next()
          }).catch(err => {
            next()
          })
        } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})


router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
