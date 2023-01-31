<template>
  <div @dblclick="[inputView = true, setInputWidth(this.$el.getBoundingClientRect().x, this.$el.getBoundingClientRect().y)]" :style="{Width: 99+'%'}" ref="cell"  class="cell">

      <div v-if="!inputView" class="cell-text">{{ cellText }} </div>

    <textarea v-if="inputView" v-model="cellText" type="text" placeholder="type text" id="" class="input-cell"></textarea>


  </div>
</template>

<script>
/* eslint-disable */
let uuid = 0;
export default {
  name: "CellListTwo",
  data(){
    return {
      inputView: false,
      inputWidth: '50%',
      cellText: 'cell',
      uid: null,
      cellActive: {
        x: 0,
        y: 0,
        uid: this.x * this.y,
        status: false,
      },
    }
  },
  props:{
    test: 0,
  },
  methods: {
    closeInput(){

    },
    setInputWidth(x, y){
      this.cellActive.status = true;
      let el = document.getElementById('1');
      if (!this.cellActive.status){
        this.cellActive.x = x;
        this.cellActive.y = y;
        this.cellActive.status = true;
        this.$el.uid = x * y;
      }else{
        if (this.$el.uid !== this.cellActive.uid){
          this.cellActive.x = x;
          this.cellActive.y = y;
          this.cellActive.uid = this.$el.uid;
        }
      }
    },
  },
  mounted() {
    // this.uid = this.$.uid;
  }
}
</script>

<style scoped>
  .cell{
    /*justify-content: center;*/
    display: grid;
    min-width: 20px;
    min-height: 10px;
    background-color: azure;
    opacity: 0.9;
    border: 0.5px solid gray;
    font-size: 14px;
    overflow: auto;
  }
  .cell:hover{
    opacity: 1;
    border-color: black;
    background-color: blanchedalmond;
    cursor: pointer;
  }
  .cell-text{
    align-self: center;
    width: 100%;
    /*justify-self: center;*/
    text-align: center;
    /*justify-content: center;*/
    grid-area: 1 / 1;
  }
  .input-cell{
    align-self: center;
    /*justify-self: center;*/
    grid-column: 1;
    grid-row: 1;
    font-size: 14px;
    /*width: 3em;*/
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
  }
</style>