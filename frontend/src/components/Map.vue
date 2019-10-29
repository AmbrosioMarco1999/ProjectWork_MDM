<template>
  <l-map style="height: 90%; width: 98%" :zoom="zoom" :center="center" :options="{zoomControl: true}">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-polyline
      :lat-lngs="polyline.latlngs"
      :color="polyline.color">
    </l-polyline>
    <l-circle v-if="isActive"
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
    />
  </l-map>
</template>

<script>

import {LMap, LTileLayer, LMarker, LPolyline, LCircle } from 'vue2-leaflet';

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
      },
      circle: {
        center: [0, 0],
        radius: 3,
        color: 'red'
      },
      isActive: false
    };
  },
  props: {},
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LCircle
  },
  methods: {},
  computed: {},
  sockets: {},
  created() {
    setInterval(() => {
      try {
        this.center = this.$store.getters.firstCoords || [45.9626521, 12.6550436]
        if(this.$store.getters.coords) {
          let coords = this.$store.getters.coords
          //this.circle.center = coords[coords.length - 1]
          this.polyline.latlngs = coords; 
          //this.isActive = true
        }
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
