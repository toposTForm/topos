<template>
  <div class="main-container">
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
  LinearScale, LineElement
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as chartConfig from './ChartConfig'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'ChartContainer',
  components: {
    Bar
  },
  data() {
    return {
      data: chartConfig.data,
      options: chartConfig.options
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
 }
</style>