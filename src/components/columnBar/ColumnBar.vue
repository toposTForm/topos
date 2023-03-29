<template>
  <div :class="{'main-container_hover': hoverIsActive, 'main-container': !hoverIsActive, 'main-container_selected': choosed}"
       v-if="active"
       v-on:click.right.prevent="rClick($event)"
       v-on="loadCell(this.$data),
       loadCellRow(this.$data),
       loadCellColumn(this.$data)"
       :style="{gridRow: gridRow, gridColumn: gridCol, cursor: cursor,}"
       @click="showResizeLine({name: name, data: this.$data, el: this.$el, event: $event})"
      >
    <div class="wrap"
         :style="{minWidth: `${resizedMinWidth}px`, width: `${resizedWidth}` }"
         >
      <div class="cell-text" >
        {{gridCol}}Y
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ref} from "vue";

export default {
  name: "ColumnBar",
  props: ['cellListuid', 'hovered'],
  setup(props){
    let hovered = ref([]);
    hovered.value = props.hovered.columnBarFocused.activeBar;
    return{}
  },
  data(){
    return{
      parentCellList: this.$props.cellListuid,
      uid: this.$.uid,
      active: true,
      name: 'ColumnBar',
      gridCol: '',
      gridRow: '',
      cursor: 'pointer',
      resizedWidth: '',
      resizedMinWidth: '',
      hoverIsActive: true,
      choosed: false,
    }
  },
  computed: mapGetters(['getCell', 'getCellMinHeight', "getClickUp"]),
  watch: {
    hovered(state){
      if (state.columnBarFocused.activeBar){
      }
      if (state.columnBarFocused.resizedWidth){
        this.resizedWidth = state.columnBarFocused.resizedWidth;
      }
    }
  },
  methods: {
    ...mapActions(['loadCell', 'dbClickCell', "loadCellRow", "loadCellColumn", 'rClick', 'loadCellText', 'loadResize']),
    showResizeLine(data){
      this.$emit('showResizeLine', {
        data: data,
      })
    },
  },
}
</script>

<style scoped>
  .main-container{
    width: 100%;
    justify-self: start;
    display: grid;
    background-color: gray;
    opacity: 0.9;
    font-size: 14px;
    transition-duration: 100ms;
  }
  .main-container_selected{
    width: 100%;
    justify-self: start;
    display: grid;
    opacity: 0.8;
    border-bottom: none;
    border-top: none;
    background-color: blanchedalmond;
  }
  .main-container_hover{
    display: grid;
    background-color: gray;
    opacity: 0.9;
    font-size: 14px;
    transition-duration: 100ms;
  }
  .main-container_hover:hover{
    opacity: 0.8;
    border-bottom: none;
    border-top: none;
    background-color: blanchedalmond;
    border-color: white;
  }
  .wrap{
    display: grid;
    min-height: 20px;
    min-width: 30px;
    border: 1px solid black;
    border-right: none;
  }
  .cell-text{
    align-self: center;
    line-height: normal;
    text-align: left;
    width: 100%;
  }
</style>