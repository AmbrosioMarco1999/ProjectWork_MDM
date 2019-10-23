<template>
  <aside class="column">
    <p class="menu-label is-hidden-touch">Navigation</p>
    <div class="container">
      <ul class="menu-list">
        <PullmanCard v-for="pullman in getPullmans" v-bind:key="pullman._id" :pullman="pullman" />
      </ul>
    </div>
  </aside>
</template>

<script>
import PullmanCard from "@/components/PullmanCard";
import VueSocketIO from 'vue-socket.io'
import Vue from 'vue';
import store from '../store/store'

export default {
  name: "PullmanMenu",
  data() {
    return {
      active_pullmans: []
    };
  },
  props: {},
  components: {
    PullmanCard
  },
  methods: {},
  computed: {
    getPullmans() {
      return this.$store.getters.pullmans;
    }
  },
  sockets: {},
  created() {
    let socketIO = new VueSocketIO({
      debug: true,
      connection: 'http://127.0.0.1:5000',
      autoConnect: false,
      vuex: {
          store,
          actionPrefix: 'SOCKET_',
          mutationPrefix: 'SOCKET_'
      },
      options: { query: 'auth_token=' + this.$store.getters.token } //Optional options
    })
    Vue.use(socketIO)
  },
  mounted() {}
};
</script>

<style scoped>
.container {
  overflow-y: auto;
  max-height: calc(100vh - 52px);
}

.container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.container::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: lightgray;
}
</style>
