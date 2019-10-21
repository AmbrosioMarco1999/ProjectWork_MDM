<template>
  <div v-if="loading">Loading</div>
  <div v-else-if="error">Dashboard</div>
  <div class="columns" v-else>
    <div class="column is-2 is-narrow-mobile is-fullheight is-hidden-mobile">
      <PullmanMenu />
    </div>
    <div class="column">
      <h1 class="title">{{ pullman.targa }}</h1>
      <Graph @pullmanData="pullmanData" />
      <strong>Max Posti:</strong>{{ pullman.max_posti }} <br>
      <strong>Allestimento:</strong>{{ pullman.allestimento }}<br>
      <strong>Modello:</strong>{{ pullman.modello }}<br>
      <strong>Anno:</strong>{{ pullman.anno }}<br>
      <strong>Targa:</strong>{{ pullman.targa }}<br>
      <strong>Latitudine:</strong>{{ selectedPullmanData.latitudine }}<br>
      <strong>Longitudine:</strong>{{ selectedPullmanData.longitudine }}<br>
      <strong>Movimento:</strong>{{ selectedPullmanData.movimento }}<br>
      <strong>Persone a bordo:</strong>{{ selectedPullmanData.personeABordo }}
    </div>
  </div>
</template>

<script>
import PullmanMenu from "@/components/PullmanMenu";
import Graph from "@/components/Graph";

export default {
  name: "Dashboard",
  data() {
    return {
      isLoading: true,
      error: null,
      selectedPullmanData: {}
    };
  },
  props: {},
  components: {
    PullmanMenu,
    Graph
  },
  methods: {
    pullmanData(data) {
      this.selectedPullmanData = data[0]
    }
  },
  computed: {
    loading() {
      if (this.isLoading) {
        return true;
      } else {
        return false;
      }
    },
    pullman() {
      return this.$store.getters.pullman || {}
    }
  },
  sockets: {},
  created() {
    this.isLoading = true;
    this.error = null;
    this.$store
      .dispatch("GET_PULLMANS")
      .then(_ => {
        this.isLoading = false;
      })
      .catch(err => {
        this.error = e.message;
      });
  },
  mounted() {}
};
</script>

<style scoped>
</style>
