<template>

    <CellList cellListuid = 'mainCellsTable'></CellList>
<!--  <CellList cellListuid = 'childCellsTable'></CellList>-->
</template>

<script>
/* eslint-disable */
import CellList from "@/components/CellList/CellList.vue";
import Cell from "@/components/Cell/Cell";

export default {
  name: "FormList2",
  components: {
    CellList,
    Cell,
  },
  data(){
    return {
      uid: this.$.uid,
      instanceName: 'FormList',
      active: true,
      classes:{
        mainContainer: 'main-container',
      },
    }
  }
}
</script>

<style scoped>
.main-container{
  display: grid;
  /*width: 100%;*/
  height: 100%;
  border: 1px solid black;
  overflow: auto;
}
</style>