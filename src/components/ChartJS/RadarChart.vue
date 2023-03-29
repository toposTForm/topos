<template>
  <div>
    <Radar :data="data" :options="options" :style='{width: width, height: height}'/>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import { Radar } from 'vue-chartjs'


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title
)
export default {
  name: "RadarChart",
  components: {
    Radar,
  },
  props: ['width', 'height'],
  data() {
    return {
      graphHeigth: '',
      data:{
        labels: [
          'Машиностроение',
          'Животноводство',
          'Медицина',
          'Бюджетирование',
          'Образование',
          'ВПК',
        ],
        datasets: [
          {
            label: '2022г',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [0, 50, 10, 70, 0, 0]
          },
          {
            label: '2023г',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [0, 0, 20, 80, 0, 0]
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Шаблоны по отраслям'
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