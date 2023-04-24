
<template>
    <FormList2 ></FormList2>
</template>

<script>
/* eslint-disable */
import store from './store'
import FormList2 from "@/components/FormList/FormList2";
import CellList from "@/components/CellList/CellList";
import Cell from "@/components/Cell/Cell";
import MyQuillEditor from "@/components/QuillEditor/MyQuillEditor";
import {ButtonPlugin} from "@syncfusion/ej2-vue-buttons";
import naive from "naive-ui";
// import GolosText_Regular from '@/fonts/Golos Text/Golos-Text_Regular.ttf'
// import GolosText_Bold from '@/fonts/Golos Text/Bold.ttf'

export default {
  name: 'App',
  store,
  ButtonPlugin,
  components: {
    FormList2,
    CellList,
    Cell,
    MyQuillEditor,
    naive,
  },
  methods: {
  }
}

</script>

<style>

@font-face{
  /*font-family: 'Golos Text Regular';*/
  /*src: local('Golos-Text_Regular'),*/
  /*    url("./fonts/Golos Text/Golos-Text_Regular.ttf") format("ttf");*/
  /*!*src: url("./Golos-Text_Regular.ttf") format("ttf");*!*/
  /*font-display: auto;*/
  /*font-style: normal;*/
  /*src: local('GolosText_Regular');*/
}
@font-face{
  /*font-display: auto;*/
  /*font-weight: bold;*/
  /*font-style: italic;*/
  /*font-family: 'Golos Text Bold';*/
  /*src: url("@/Bold.ttf") format("ttf");*/
}

</style>
