import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import socketIO from '../config/socket'

Vue.use(Vuex)
Vue.use(Axios)

let apiIP = 'http://127.0.0.1:5000'

const store = new Vuex.Store({
  state: {
    token: null,
    pullmans: [],
    selected_pullman: null,
    lastPullmanRes: {}
  },
  getters: {
    isLogged: state => {
      if (state.token) {
        return true
      }
      let token = localStorage.getItem('AUTH_TOKEN')
      if (token) {
        state.token = token
        return true
      }
      return false
    },
    token: state => {
      return state.token
    },
    pullmans: state => {
      return state.pullmans
    },
    pullman: state => {
      return state.selected_pullman
    },
    getPullmanInfo: state => {
      return state.lastPullmanRes
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      console.log(token)
      state.token = token
      localStorage.setItem('AUTH_TOKEN', token)
    },
    LOGOUT: (state) => {
      state.token = false
      localStorage.removeItem('AUTH_TOKEN')
    },
    SET_PULLMANS: (state, payload) => {
      state.pullmans = payload
    },
    SELECT_PULLMAN: (state, payload) => {
      state.selected_pullman = payload
    },
    SET_ACTIVE_PULLMANS: (state, payload) => {
      state.active_pullmans = payload
    },
    SET_PULLMAN_INFLUX: (state, payload) => {
      state.lastPullmanRes = payload
    }
  },
  actions: {
    USER_LOGIN(context, payload) {
      Axios.post(apiIP + '/users/login', payload)
        .then((res) => {
          context.commit('SET_TOKEN', res.data.token)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    GET_PULLMANS(context) {
      return new Promise((resolve, reject) => {
        Axios.get(apiIP + '/pullmans')
          .then((res) => {
            context.commit('SET_PULLMANS', res.data)
            resolve()
          })
          .catch((err) => {
            reject();
            console.log(err)
          })
      })
    },
    CHECK_TOKEN(context) {
      Axios.get(apiIP + '/users/check', {
        headers: { 'Authorization': 'Bearer ' + context.getters.token }
      })
    },
  }
})

// 401 HANDLER

Axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    store.commit('LOGOUT')
  } else {
    return Promise.reject(error);
  }
});

export default store