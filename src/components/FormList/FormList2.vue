<template>

    <CellList cellListuid = 'mainCellsTable'>

    </CellList>
  <div style="position: fixed; bottom: 0%; overflow: visible; right: 0px; z-index: 2;" >
    <right-layout></right-layout>
  </div>

</template>

<script>
/* eslint-disable */
import CellList from "@/components/CellList/CellList.vue";
import Cell from "@/components/Cell/Cell";
import RightLayout from "@/components/RightLayout/RightLayout";

export default {
  name: "FormList2",
  components: {
    CellList,
    Cell,
    RightLayout
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