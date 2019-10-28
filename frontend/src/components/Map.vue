<template>
  <l-map style="height: 90%; width: 98%" :zoom="zoom" :center="center" :options="{zoomControl: true}">
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
      zoom: 13,
      center: [45.9, 12.6],
      polyline: {
        latlngs: [],
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
      try {
        this.center = this.$store.getters.firstCoords || [45.9626521, 12.6550436]
        if(this.$store.getters.coords) { this.polyline.latlngs = this.$store.getters.coords }
      }
      catch {
        
      }
    },1000)
  },
  mounted() {}
};
</script>

<style scoped>

</style>
