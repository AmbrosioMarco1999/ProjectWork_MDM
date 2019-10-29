<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <div action class="box">
              <div class="field">
                <label for class="label">Email</label>
                <div class="control has-icons-left">
                  <input v-model="email" type="text" placeholder="e.g. bobsmith@gmail.com" class="input" />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for class="label">Password</label>
                <div class="control has-icons-left">
                  <input v-model="password" type="password" placeholder="*******" class="input"/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div> 
              <div v-if="this.$store.getters.loginError" class="notification is-danger">
                {{ this.$store.getters.loginError }}
              </div>
              <div class="field">
                <button class="button is-light" @click="login">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  props: {},
  methods: {
    login() {
      this.$store.dispatch('USER_LOGIN', {email: this.email, password: this.password})
      this.$router.push('/dashboard')
    }
  },
  computed: {},
  sockets: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
</style>
