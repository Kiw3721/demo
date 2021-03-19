import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {

  if (route.meta && route.meta.roles) {
   // console.log( 'roles, route',roles,route.meta.roles ,roles,route.meta.roles.some(role => role.includes(roles)))
    return route.meta.roles.some(role => role.includes(roles)) //数组形式
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return  res
}

const state = {
  routes: [],
  a: 11,
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    // console.log(roles,'admin')
    // var a=[]
    // a.push(roles)
    return new Promise((resolve, reject) => {
      let accessedRoutes

        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    //    console.log(accessedRoutes,'!admin', filterAsyncRoutes(asyncRoutes, roles))

      state.addRoutes=accessedRoutes
      state.routes=accessedRoutes
     //  commit('SET_ROUTES', accessedRoutes)
    //  console.log(accessedRoutes,'!admin', filterAsyncRoutes(asyncRoutes, roles),'AS',)

      resolve(accessedRoutes)

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
