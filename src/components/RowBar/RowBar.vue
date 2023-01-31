<template>
  <div :class="{'row': active}"
       v-if="active"
       v-on:click.right.prevent="rClick($event)"
       v-on="
       loadCellRow(this.$data),
       loadCellColumn(this.$data)"
       :style="{gridRow: gridRaw, gridColumn: gridCol, cursor: cursor,}">
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
      cursor: '',
      hoverIsActive: true,
    }
  },
  computed: mapGetters([]),
  watch: {
  },
  methods: {
    ...mapActions(["loadCell", "loadCellRow", "loadCellColumn", 'rClick',])
  },
}
</script>

<style scoped>
.row{
  display: grid;
  background-color: gray;
  opacity: 0.9;
  font-size: 14px;
  transition-duration: 100ms;
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