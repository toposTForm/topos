<template>
  <div>
    <Bar :data="data" :options="options" :style='{width: width, height: height}'/>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export default {
  name: "BarChartHor",
  components: {
    Bar
  },
  props: ['width', 'height'],
  data() {
    return {
      graphHeigth: '',
      data: {
        labels: [
          'Февраль',
          'Март',
        ],
        datasets: [
          {
            type: 'bar',
            label: 'Активность разработки 2023г (0 - 10)',
            backgroundColor: 'red',
            data: [3, 9],
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        title: {
          display: true,
          text: 'Title'
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
    }
  },
  mounted() {
    this.$data.graphHeigth = this.$el.parentElement.offsetHeight;
  }
}
</script>

<style scoped>
  .main-container{
    width: 300px;
    height: 300px;
    background-color: white;
  }
</style>