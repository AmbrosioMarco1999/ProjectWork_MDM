<template>
        <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: false}">
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>

import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: "Map",
    data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [45.9626521, 12.6550436]
    };
  },
  props: {},
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  methods: {},
  computed: {},
  sockets: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>

</style>
