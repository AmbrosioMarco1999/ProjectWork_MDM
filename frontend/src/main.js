import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import socketIO from './config/socket'

require('../node_modules/c3/c3.min.css')

import './../node_modules/bulma/css/bulma.css';

Vue.use(socketIO)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
