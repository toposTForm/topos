<template>
  <div>
    <PolarArea :data="data" :options="options" :style='{width: width, height: height}'/>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import { PolarArea } from 'vue-chartjs'

ChartJS.register(
    RadialLinearScale,
    ArcElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title
)
export default {
  name: "SectorChart",
  components: {
    PolarArea,
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
            backgroundColor: [
              'red', 'black','blue','orange','gray'
            ],
            data: [40, 50, 10, 70, 17, 0]
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Стримы'
          },
          legend: {
            position: 'top',
          },
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