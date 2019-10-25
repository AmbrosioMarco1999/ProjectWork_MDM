<template>
  <l-map style="height: 90%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: true}">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-polyline
      :lat-lngs="polyline.latlngs"
      :color="polyline.color">
    </l-polyline>
  </l-map>
</template>

<script>

import {LMap, LTileLayer, LMarker, LPolyline } from 'vue2-leaflet';

export default {
  name: "Map",
    data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [0, 0],
      polyline: {
        latlngs: [[0, 0]],
        color: 'red'
      }
    };
  },
  props: {},
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline
  },
  methods: {},
  computed: {},
  sockets: {},
  created() {
    setInterval(() => {
      this.center = this.$store.getters.firstCoords || [0, 0]
      this.polyline.latlngs = this.$store.getters.coords || [[0, 0]]
    },1000)
  },
  mounted() {}
};
</script>

<style scoped>

</style>
