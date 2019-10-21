import store from '../store/store'
import VueSocketIO from 'vue-socket.io'

let socketIO = new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:5000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { query: 'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6ImNpYW9AY2lhby5iaXoiLCJpYXQiOjE1NzA5OTM2ODIsImV4cCI6MTU3MDk5NTEyMn0.isiH3CAtnALeNvNt2R3olrZZ9ecBIdrbmVHH738PDMY' } //Optional options
})

export default socketIO