<template>
  <div>
    <div v-if="!logged">
      <Login />
    </div>
    <div v-else>
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Login from "@/views/Login";

export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {
    Navbar,
    Login
  },
  methods: {},
  computed: {
    logged() {
      return this.$store.getters.isLogged
    }
  },
  sockets: {},
  created() {
    if(this.logged) {
      this.$store.dispatch('CHECK_TOKEN')
    }
  },
  mounted() {}
};
</script>

<style scoped>

</style>