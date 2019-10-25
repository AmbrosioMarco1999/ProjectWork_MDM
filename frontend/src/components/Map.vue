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
      center: [45.9626521, 12.6550436],
      polyline: {
        latlngs: [[45.934852, 12.609485], [47.342596, -1.328731], [47.241487, -1.190568], [47.234787, -1.358337]],
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
  created() {},
  mounted() {}
};
</script>

<style scoped>

</style>
