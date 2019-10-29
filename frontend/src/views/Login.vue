<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <figure class="avatar">
              <img src="../assets/logo.png" width="200" />
            </figure>
              <div class="field">
                <div class="control">
                  <input v-model="email" type="text" placeholder="email" class="input is-large" />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="password" type="password" placeholder="*******" class="input is-large"/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div v-if="this.$store.getters.loginError" class="notification is-danger">
                {{ this.$store.getters.loginError }}
              </div>
              <button class="button is-block is-light is-large is-fullwidth" @click="login">
                Login
                <i class="fa fa-sign-in" aria-hidden="true"></i>
              </button>
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
      password: null
    };
  },
  props: {},
  methods: {
    login() {
      this.$store.dispatch("USER_LOGIN", {
        email: this.email,
        password: this.password
      });
      this.$router.push("/dashboard");
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
