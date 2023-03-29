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
  name: "BarChartVert",
  components: {
    Bar
  },
  props: ['width', 'height'],
  data() {
    return {
      resizedMinWidth: '300',
      graphHeigth: '',
      data: {
        labels: [
          'Золотодобыча',
          'Свиноплан',
          'Дизайн'
        ],
        datasets: [
          {
            type: 'bar',
            label: 'вклад Ksiu',
            backgroundColor: 'orange',
            data: [0, 0, 5],
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'sdfsd'
        },
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x'
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