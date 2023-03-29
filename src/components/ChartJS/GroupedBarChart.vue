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
    Bar,
  },
  props: ['width', 'height'],
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
            label: 'вклад Вани',
            backgroundColor: 'black',
            data: [3, 4],
          },
          {
            label: 'вклад Егора',
            backgroundColor: 'red',
            data: [2, 5],
          },
          {
            type: 'bar',
            label: 'вклад Ksiu',
            backgroundColor: 'orange',
            data: [0, 0, 5],
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
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

</style>