<template>
  <aside class="column">
    <p class="menu-label is-hidden-touch">Navigation</p>
    <div class="container">
      <ul class="menu-list">
        <PullmanCard v-for="pullman in getPullmans" v-bind:key="pullman._id" :pullman="pullman" />
      </ul>
    </div>
  </aside>
</template>

<script>
import PullmanCard from "@/components/PullmanCard";

export default {
  name: "PullmanMenu",
  data() {
    return {
      active_pullmans: []
    };
  },
  props: {},
  components: {
    PullmanCard
  },
  methods: {},
  computed: {
    getPullmans() {
      return this.$store.getters.pullmans;
    }
  },
  sockets: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
.container {
  overflow-y: auto;
  max-height: calc(100vh - 100px);
}

.container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.container::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: lightgray;
}
</style>
