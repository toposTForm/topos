
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{ helloWorld }}
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return{
      // msg: '4',
      helloWorld: 'helloWorld'
    }
  },
  methods: {
    test(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
