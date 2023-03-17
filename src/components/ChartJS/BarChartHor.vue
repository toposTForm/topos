<template>
  <div :style='{width: `${resizedMinWidth}px`, height: `${resizedMinHeight}px`}'>
    <Bar :data="data" :options="options" />
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
  data() {
    return {
      resizedMinWidth: '300',
      resizedMinHeight: '300',
      data: {
        labels: [
          'Золотодобыча',
          'Свиноплан',
        ],
        datasets: [
          {
            type: 'bar',
            label: 'вклад Вани',
            backgroundColor: '#FFE123',
            data: [3, 4],
          },
          {
            type: 'bar',
            label: 'вклад Егора',
            backgroundColor: 'red',
            data: [2, 5],
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y'
      }
    }
  },
}
</script>

<style scoped>
  .main-container{
    width: 300px;
    height: 300px;
    background-color: white;
  }
</style>