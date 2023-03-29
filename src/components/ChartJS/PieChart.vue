<template>
  <div>
    <Pie :data="data" :options="options" :style='{width: width, height: height}'/>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Pie } from 'vue-chartjs'


ChartJS.register(ArcElement, Title, Tooltip, Legend)
export default {
  name: "PieChart",
  components: {
    Pie,
    Title
  },
  props: ['width', 'height'],
  data() {
    return {
      graphHeigth: '',
      data: {
        labels: ["Ваня", "Игорь", "Денис", "Ксюша", "Рома"],
        datasets: [{
          type: 'pie',
          label: "Прибыль (рубли)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Распределение прибыли'
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

</style>