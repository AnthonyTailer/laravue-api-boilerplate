import {getLocalUser} from "./helpers/auth";

const user = getLocalUser()

export default {
  state: {
    welcomeMessage: 'welcome to my vue app, fat ass hole!',
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
    auth_error: null,
  },
  getters: {
    welcome(state) {
      return state.welcomeMessage
    },
    isLoading(state) {
      return state.loading
    },
    isLoggedIn(state) {
      return state.isLoggedIn
    },
    currentUser(state){
      return state.currentUser
    }
  },
  mutations: {
    login(state) {
      state.loading = true
      state.auth_error = null
    },
    loginSuccess(state, payload) {
      state.loading = false
      state.auth_error = null
      state.isLoggedIn = true
      state.currentUser = Object.assign({}, payload.user, { token: payload.access_token })

      localStorage.setItem("user", JSON.stringify(state.currentUser))
    },
    loginFailed(state, payload) {
      state.loading = false
      state.auth_error = payload.error
    },
    logout(state) {
      localStorage.removeItem("user")
      state.isLoggedIn = false
      state.currentUser = null
    }
  },
  actions: {
    login(context) {
      context.commit("login")
    }
  }
}