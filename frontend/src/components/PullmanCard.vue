  <template>
  <li>
    <a class="panel-block is-marginless is-paddingless" @click="click">
      <div class="card">
        <div class="card-content">
          <p class="subtitle">{{ pullman.targa }}</p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span class="has-text-success" v-if="isActive">Active</span>
            <span class="has-text-danger" v-else>Offline</span>
          </p>
          <p class="card-footer-item">
            <span>Targa</span>
          </p>
        </footer>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: "PullmanCard",
  data() {
    return {
      activePullmans: [],
      isActive: false
    };
  },
  props: {
    pullman: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    click() {
      this.$store.commit("SELECT_PULLMAN", this.pullman);
    },
    check() {
      let found = false;
      this.activePullmans.forEach(x => {
        if (x.targa == this.pullman.targa) {
          this.isActive = true;
          found = true;
        }
      });
      if (!found) {
        this.isActive = false;
      }
    }
  },
  computed: {},
  sockets: {},
  created() {
    this.sockets.subscribe("ACTIVE_PULLMANS", data => {
      this.activePullmans = data;
      this.check();
    });
  },
  mounted() {}
};
</script>

<style scoped>
</style>
