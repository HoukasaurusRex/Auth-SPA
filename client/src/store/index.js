import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { getCookie, deleteCookie } from '../utils/cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'localhost:3030',
    authPayload: getCookie('Auth-Payload'),
    service: axios.create({
      // Must include credentials in request
      // to allow cross origin response to set cookies
      withCredentials: true,
      baseURL: 'http://localhost:3030/',
      timeout: 5000,
      headers: {
        common: { Authorization: getCookie('Auth-Payload') }
      }
    }),
    status: ''
  },
  getters: {
    getAuthPayload: state => state.authPayload,
    isAuthenticated: state => !!state.authPayload,
    getStatus: state => state.status
  },
  mutations: {
    AUTH_LOADING: state => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: state => {
      state.status = 'success'
      state.authPayload = getCookie('Auth-Payload')
      state.service.defaults.headers.common['Authorization'] = state.authPayload
    },
    AUTH_ERROR: state => {
      state.status = 'error'
      deleteCookie('Auth-Payload')
    }
  },
  actions: {
    AUTH_LOGIN: async ({ commit, state }, user) => {
      try {
        commit('AUTH_LOADING')
        const res = await state.service.post('/auth/email', user)
        const { data } = res
        commit('AUTH_SUCCESS')
        return data
      } catch (error) {
        console.error(error.message)
        commit('AUTH_ERROR', error)
        return error
      }
    },
    AUTH_LOGOUT: ({ commit, dispatch }) => {
      commit('AUTH_LOADING')
      deleteCookie('Auth-Payload')
      commit('AUTH_SUCCESS')
      return 'logged out'
    },
    AUTH_VERIFY: async ({ commit, state }) => {
      try {
        commit('AUTH_LOADING')
        const res = await state.service.get('/auth/verify')
        const { data } = res
        commit('AUTH_SUCCESS')
        return data
      } catch (error) {
        console.error(error.message)
        commit('AUTH_ERROR', error)
        return error
      }
    }
  },
  modules: {}
})
