import {login,logout} from '@/api/login'
import {getToken,setToken,removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    account: ''||localStorage.getItem('account'),
    roles: []
    // avatar: ''
  }
}

//共享的数据
const state = getDefaultState()

//同步方法
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
    //把登录的账号保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
    localStorage.setItem('account', account)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
}

//异步方法
const actions = {
  // user login
  login({
    commit
  }, Info) {
    const {
      account,
      password
    } = Info
    console.log("信息" + JSON.stringify(Info))
    return new Promise((resolve, reject) => {
      login({
        account: account,
        password: password
      }).then(response => {
        const {
          data
        } = response
        console.log(response, "返回的数据：" + data)
        // 设置 token，作为用户已登陆的前端标识，存在 cookie 中
        // commit('SET_TOKEN', data.token)
        // setToken() 方法会把 token 保存到 cookie 里
        //   setToken(data.token)
        const {account} = data
        commit('SET_ACCOUNT', account)

        state.roles.push(response.data.roles)
        // 将后台返回的JSON数据存入浏览器localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        // 将后台返回的JSON数据存入浏览器localStorage
        localStorage.setItem("userInfo", JSON.stringify(response.user));
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 登陆的时候会去获取权限数据
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
        // 请求获取权限
        getInfo(state.token).then(response => {

          const {
            data
          } = response

          if (!data) {
            return reject('Verification failed, please Login again.')
          }

          // const { account, avatar } = data

          const {
            account,
            roles
          } = data
          commit('SET_ACCOUNT', account)
          commit('SET_ROLES', roles)
          console.log("roles:" + roles)
          // commit('SET_AVATAR', avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      

    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_ROLES', [])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
