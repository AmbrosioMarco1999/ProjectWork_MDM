import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import VueSocketIO from 'vue-socket.io'

Vue.use(Vuex)
Vue.use(Axios)

let apiIP = 'http://192.168.101.55:5000'

const store = new Vuex.Store({
  state: {
    token: null,
    pullmans: [],
    selected_pullman: null,
    lastPullmanRes: {},
    coords: []
  },
  getters: {
    isLogged: state => {
      if (state.token) {
        return true
      }
      let token = localStorage.getItem('AUTH_TOKEN')
      if (token) {
        store.commit('SET_TOKEN', token)
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
    },
    coords: state => {
      return state.coords
    },
    firstCoords: state => {
      return state.coords[0]
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('AUTH_TOKEN', token)
      let socketIO = new VueSocketIO({
        debug: false,
        connection: apiIP,
        autoConnect: false,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
        options: { query: 'auth_token=' + state.token }
      })
      Vue.use(socketIO)
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
      state.coords = []
    },
    SET_ACTIVE_PULLMANS: (state, payload) => {
      state.active_pullmans = payload
    },
    SET_PULLMAN_INFLUX: (state, payload) => {
      state.lastPullmanRes = payload
    },
    ADD_COORDS: (state, payload) => {
      state.coords.push(payload)
    },
    SET_ROUTE_DONE: (state, payload) => {
      state.coords = payload
    },
    DELETE_COORDS: (state, payload) => {
      state.coords = []
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
    // GET_PERCORSI(context, payload) {
    //   Axios.get(apiIP + '/pullmans/route')
    //   .then((res) => {

    //     resolve()
    //   })
    //   .catch((err) => {
    //     reject();
    //     console.log(err)
    //   })
    // },
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