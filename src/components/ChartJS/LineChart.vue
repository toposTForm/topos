<template>
  <div>
    <Line :data="data" :options="options" :style='{width: width, height: height}' />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale, LinearScale,
  LineElement,
  PointElement
} from 'chart.js'

import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'lineChart',
  components: {
    Line
  },
  props: ['width', 'height'],
  data() {
    return {
      graphHeigth: '',
      data: {
        datasets: [
          {
            type: 'line',
            label: 'График продаж',
            backgroundColor: '#748044',
            data: [{
              x: 1,
              y: 5
            }, {
              x: 5,
              y: 10
            }, {
              x: 8,
              y: 5
            }, {
              x: 15,
              y: 0
            }],
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x, y',
        scales: {
          x: {
            // max: 50,
            // min: 0,
            ticks: {
              stepSize: 1
            },
            label: 'График продаж',
          },
          y: {
          }
        }
      }
    }
  },
  methods: {
    resizeRowBar(){
      this.$emit('resizeRowBar', {
        heightKey: this.$data.graphHeigth
      })
    },
  },
  watch: {
    graphHeigth: function (data){
      this.resizeRowBar();
    },
  },
  mounted() {
    this.$data.graphHeigth = this.$el.parentElement.offsetHeight;
  }
}
</script>

<style scoped>

</style>