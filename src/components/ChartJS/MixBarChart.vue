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
  name: "GroupedBarChart",
  components: {
    Bar
  },
  props: ['width', 'height'],
  emits: ['resizeRowBar'],
  data() {
    return {
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
            stack: 'combined',
            label: 'вклад Вани',
            backgroundColor: 'black',
            data: [3, 6, 5],
            order: 1,
          },
          {
            type: 'bar',
            stack: 'combined',
            label: 'вклад Егора',
            backgroundColor: 'red',
            data: [2, 5, 2],
            order: 1,
          },
          {
            type: 'line',
            label: 'Результирующая',
            backgroundColor: 'orange',
            borderColor: 'yellow',
            data: [3, 6, 5],
            order: 0,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
        plugins: {
          title: {
            display: true,
            text: 'Вклад по отраслям'
          }
        },
        scales: {
          y: {
            stacked: true,
          }
        },
        title: {
          display: true,
          text: 'Групповая диаграмма'
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