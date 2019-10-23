import store from '../store/store.js'
import VueSocketIO from 'vue-socket.io'

let socketIO = new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:5000',
  autoConnect: false,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { query: 'auth_token=' } //Optional options
})

export default socketIO