import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwtPayload: localStorage.getItem('jwtPayload')
  },
  getters: {
    getJwtPayload(state) {
      return state.jwtPayload
    }
  },
  mutations: {
    setJwtPayload(state, jwtPayload) {
      localStorage.setItem('jwtPayload', jwtPayload)
      state.jwtPayload = jwtPayload
    }
  },
  actions: {},
  modules: {}
})
