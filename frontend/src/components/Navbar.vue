<template>
  <nav class="navbar has-background-grey-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item is-unselectable" style="cursor: default">
        <h1 class="title">MDM</h1>
      </a>
    </div>

    <div class="navbar-start">
      <router-link class="navbar-item" to="/dashboard">Dashboard</router-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/");
    }
  },
  computed: {},
  sockets: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>

.router-link-active {
  background-color:  #EEEE
}

</style>
