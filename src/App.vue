
<template>
    <FormList2></FormList2>
</template>

<script>
/* eslint-disable */
import store from './store'
import RightClickMenu from "@/components/RightClickMenu/RightClickMenu";
import FormList2 from "@/components/FormList/FormList2";
import CellList from "@/components/CellList/CellList";
import Cell from "@/components/Cell/Cell";
import MyQuillEditor from "@/components/QuillEditor/MyQuillEditor";

export default {
  name: 'App',
  store,
  components: {
    FormList2,
    CellList,
    Cell,
    MyQuillEditor,
  },
}

</script>

<style>
 .app{
   height: 100%;
   width: 100%;
 }
</style>
