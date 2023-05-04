<template>

    <vue-gauge
      ref="arrowGauge"
      :refid="`uniq_uid_${uid}`"
      :options="{'needleValue': 85, 'arcDelimiters':[85], chartWidth: newWidth, updateNeedle: 10,}"
      :style='{width: width, height: height}'>
    </vue-gauge>

</template>

<script>
import VueGauge from 'vue-gauge';

export default {
  name: "GaugeChart",
  components:{
    VueGauge
  },
  props: ['width', 'height', 'uid'],
  data() {
    return {
      graphHeigth: '',
      newWidth: 100,
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
    width: function(){
      this.$data.newWidth = this.$props.width.slice(0, this.$props.width.length - 2);
      this.$refs.arrowGauge.options.chartWidth = this.$data.newWidth;
      this.$refs.arrowGauge.options.needleValue = 10;
      if (this.$refs.arrowGauge.$el.children.length >= 1){
        this.$refs.arrowGauge.$el.children[0].remove();
      }
      this.$refs.arrowGauge.initPlugin(this.$refs.arrowGauge.options);
    }
  },
  mounted() {
    this.$data.graphHeigth = this.$el.parentElement.offsetHeight;
  }
}
</script>

<style scoped>

</style>