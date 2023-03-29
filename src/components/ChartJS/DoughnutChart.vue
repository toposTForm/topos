<template>
  <div>
    <Doughnut :data="data" :options="options" :style='{width: width, height: height}'/>
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
import { Doughnut } from 'vue-chartjs'


ChartJS.register(
    ArcElement,
    Filler,
    Tooltip,
    Legend,
    Title
)
export default {
  name: "SectorChart",
  components: {
    Doughnut,
  },
  props: ['width', 'height'],
  data() {
    return {
      graphHeigth: '',
      data:{
        labels: [
          'Дизайн/Figma',
          'FrontEnd',
          'Юр. Вопросы',
          'Мануалы',
          'Видеоролики',
          'Акция',
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
        },
        plugins: {
          title: {
            display: true,
            text: 'Конференции Разработчиков'
          },
          legend: {
            position: 'bottom',
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
.main-container{
  width: 300px;
  height: 300px;
  background-color: white;
}
</style>