<template>
  <div></div>
</template>

<script>
import c3 from "c3";

export default {
  name: "Graph",
  data() {
    return {
      chart: null,
      targa: null,
      interval: null,
      last: 0
    };
  },
  props: {},
  sockets: {},
  methods: {},
  computed: {},
  sockets: {},
  created() {},
  mounted() {
    this.sockets.subscribe("PULLMAN_DATA", data => {
      if(data[0].indexPercorso === 1) {
          this.$store.commit('DELETE_COORDS')
      }
      if (data[0] && data[0].latitudine && data[0].longitudine && data[0].indexPercorso) {
        //if(data[0].indexPercorso -2 > this.last) { console.log(this.last, data[0].indexPercorso) }
        //this.last = data[0].indexPercorso
        //console.log(data[0].indexPercorso)
        //!data[0].indexPercorso && alert(data[0].indexPercorso)
        this.$store.commit('SET_PULLMAN_INFLUX', data[0])
        this.$store.commit('ADD_COORDS', [data[0].latitudine, data[0].longitudine])
        this.$emit('pullmanData',data)
        this.chart.flow({
          columns: [
            ["x", new Date().getTime()],
            ["passeggeri", data[0].personeABordo || 0]
          ]
        });
      }
    });

    this.interval = setInterval(() => {
      if (this.$store.getters.pullman) {
        if(this.targa != this.$store.getters.pullman.targa){
          this.targa = this.$store.getters.pullman.targa
              this.chart = c3.generate({
                bindto: this.$el,
                padding: {
                  left: 50,
                  right: 50
                },
                point: {
                  show: false
                },
                data: {
                  type: "spline",
                  x: "x",
                  columns: [
                    [
                      "x",
                      new Date().getTime(),
                      new Date().getTime() - 10000,
                      new Date().getTime(),
                      new Date().getTime() - 20000,
                      new Date().getTime(),
                      new Date().getTime() - 30000,
                      new Date().getTime(),
                      new Date().getTime() - 40000,
                      new Date().getTime(),
                      new Date().getTime() - 50000,
                      new Date().getTime(),
                      new Date().getTime() - 60000
                    ],
                    ["passeggeri", null, null, null, null, null, null, null]
                  ],
                  connectNull: true
                },
                axis: {
                  x: {
                    type: "timeseries",
                    tick: {
                      format: "%H:%M:%S"
                    },
                    label: {
                      text: "Time",
                      position: "outer-center"
                    }
                  },
                  y: {
                    max: this.$store.getters.pullman.max_posti,
                    min: 0,
                    label: {
                      position: "outer-middle"
                    }
                  }
                }
              });
            }
          this.$socket.emit("GET_PULLMAN_DATA", this.targa);
      }
    }, 3000);
  },
  beforeDestroy: function(){
    clearInterval(this.interval)
  }
};
</script>

<style scoped>
</style>
