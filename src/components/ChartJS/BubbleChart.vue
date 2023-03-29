<template>
  <div>
    <Bubble :data="data" :options="options" :style='{width: width, height: height}'/>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  Title
} from 'chart.js'
import { Bubble } from 'vue-chartjs'


ChartJS.register(LinearScale, PointElement, Tooltip, Legend)
export default {
  name: "BubbleChart",
  components: {
    Bubble,
    Title
  },
  props: ['width', 'height'],
  data() {
    return {
      graphHeigth: '',
      data: {
        labels: [
          'Февраль',
          'Март',
          'Апрель',
        ],
        datasets: [
          {
            label: 'Активность Вани',
            backgroundColor: 'black',
            graphHeigth: '',
            data: [
              {
                x: 10,
                y: 30,
                r: 15
              },
              {
                x: 20,
                y: 20,
                r: 10
              },
              {
                x: 15,
                y: 8,
                r: 30
              }
            ]
          },
          {
            label: 'Активность Егора',
            backgroundColor: 'red',
            data: [
              {
                x: 20,
                y: 25,
                r: 5
              },
              {
                x: 40,
                y: 10,
                r: 10
              },
              {
                x: 30,
                y: 22,
                r: 30
              }
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Активность администраторов'
          }
        },
        indexAxis: 'x',

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
.main-container{
  width: 300px;
  height: 300px;
  background-color: white;
}
</style>