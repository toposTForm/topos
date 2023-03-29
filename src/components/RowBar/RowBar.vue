<template>
  <div :class="{'main-container_hover': hoverIsActive, 'main-container': !hoverIsActive, 'main-container_selected': choosed}"
       v-if="active"
       v-on:click.right.prevent="rClick($event)"
       v-on="loadCellRow(this.$data), loadCellColumn(this.$data)"
       :style="{gridRow: gridRaw, gridColumn: gridCol, cursor: cursor,}"
       @click="showResizeRowLine({name: name, data: this.$data, el: this.$el, event: $event})"
        >
    <div class="wrap" :style="{minHeight: `${newHeight}px`}">
      <div class="cell-text" >
        {{gridRaw}}X
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ref} from "vue";

export default {
  name: "RowBar",
  props: ['cellListuid',],
  data(){
    return{
      parentCellList: this.$props.cellListuid,
      uid: this.$.uid,
      active: true,
      name: 'RowBar',
      choosed: false,
      gridCol: '',
      newHeight: '40',
      gridRaw: 1,
      gridRow: '',
      cursor: 'pointer',
      hoverIsActive: true,
    }
  },
  computed: mapGetters([]),
  watch: {
  },
  methods: {
    ...mapActions(["loadCell", "loadCellRow", "loadCellColumn", 'rClick',]),
    showResizeRowLine(data){
      this.$emit('showResizeRowLine', {
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
.main-container_hover:hover {
  opacity: 0.8;
  border-bottom: none;
  border-top: none;
  background-color: blanchedalmond;
  border-color: white;
}
.wrap{
  display: grid;
  border: 1px solid black;
  min-height: 40px;
  min-width: 20px;
  border-right: none;
}
.cell-text{
  align-self: center;
  line-height: normal;
  text-align: left;
}
</style>