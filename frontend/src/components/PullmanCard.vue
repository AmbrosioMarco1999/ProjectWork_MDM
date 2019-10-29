  <template>
  <li>
    <a class="panel-block is-marginless is-paddingless" v-bind:class="{ 'nopointer': !isActive }" @click="click">
      <div class="card">
        <div class="card-content">
          <p class="subtitle"> 
            <span class="dot" v-bind:class="( isActive ? 'active' : 'offline' )">
            </span> {{ pullman.targa }}</p>
        </div>
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
      if(this.isActive) {
        this.$store.commit("SELECT_PULLMAN", this.pullman);
      }
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

.dot {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
}
.active {
  background-color: green;
}
.offline {
  background-color: red;
}
.nopointer {
  cursor: default
}
</style>
