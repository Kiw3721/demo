import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import  router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    account: '',
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
  login({ commit }, Info) {
    const { account, password } = Info
    // console.log("信息"+Info)
    return new Promise((resolve, reject) => {
      login({ account: account, password: password }).then(response => {
        const { data } = response
        console.log("返回的数据："+data)
        // 设置 token，作为用户已登陆的前端标识，存在 cookie 中
        commit('SET_TOKEN', data.token)
        // setToken() 方法会把 token 保存到 cookie 里
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 登陆的时候会去获取权限数据
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 请求获取权限
      getInfo(state.token).then(response => {
       
        const { data } = response
        
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // const { account, avatar } = data

        const { account,roles } = data
        commit('SET_ACCOUNT', account)
        commit('SET_ROLES', roles)
        console.log("roles:"+roles)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
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
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}

