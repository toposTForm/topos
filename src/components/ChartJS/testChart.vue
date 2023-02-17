<template>
  <div class="main-container">
    <Line :data="data" :options="options" />
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
  LineElement,
  PointElement
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import {Line} from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'testChart',
  components: {
    Bar,
    Line
  },
  data() {
    // return chartConfig
    return {
      data: {
        // labels: [
        //   'January',
        //   'February',
        //   'March',
        //   'April',
        //   'May',
        //   'June',
        //   'July',
        //   'August',
        //   'September',
        //   'October',
        //   'November',
        //   'December'
        // ],
        datasets: [
          {
            type: 'line',
            label: 'Data Two',
            // axis: 'y',
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
            // ticks: {
            //   stepSize: 0.5
            // }
          },
          y: {
            // max: 15,
            // min: 0,
            // ticks: {
            //   stepSize: 0.5
            // }
          }
        }
      }
    }
  },
  mounted() {
    let bla = this.$data;
  }
}
</script>

<style scoped>
.main-container{
  max-width: 300px;
  height: 300px;
  background-color: white;
}
</style>