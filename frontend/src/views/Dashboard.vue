<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-else-if="error">Dashboard</div>
    <div v-else>
      <div class="columns">
        <div class="column is-2 is-narrow-mobile is-fullheight">
          <PullmanMenu />
        </div>
        <div class="column is-10">
          <div class="columns">
            <div class="column is-12 has-text-centered" style="height:60vh">
              <h1 class="title">{{ pullman.targa }}</h1>
              <Map />
            </div>
            </div>
            <div class="columns">
              <div class="column is-3">
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
              <div class="column"> <Graph @pullmanData="pullmanData" /> </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PullmanMenu from "@/components/PullmanMenu";
import Graph from "@/components/Graph";
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import Map from '@/components/Map'

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
    Graph,
    Map
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
