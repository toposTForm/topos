<template>
  <div >
    <hot-table :settings="hotSettings" style="cursor: pointer"
       :style='{width: width, height: height}'>
    </hot-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import {
  registerLanguageDictionary,
  getLanguagesDictionaries,
  ruRU,
} from 'handsontable/i18n';
registerLanguageDictionary(ruRU);

registerAllModules();

export default {
  name: "HandsontableOne",
  components: {
    HotTable
  },
  props: ['width', 'height'],
  emits: ['resizeRowBar', 'displayFontMenu'],
  data(){
    return {
      tableHeight: '',
      hotSettings: {
        data: [
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],
        ],
        colHeaders: true,
        height: 'auto',
        rowHeaders: true,
        contextMenu: true,
        mergeCells: true,
        readOnly: true,
        manualColumnMove: true,
        cursor: 'pointer',
        licenseKey: 'non-commercial-and-evaluation',
        language: 'ru-RU',
        search: {
          // add your custom callback function
          callback: this.searchResultCounter
        },
      },

    }
  },
  methods: {
    resizeRowBar(){
      this.$emit('resizeRowBar', {
        heightKey: this.$data.tableHeight
      })
    },
    searchResultCounter(){

    },
    disableEditor(){
      this.hotSettings.readOnly = true;
    },
    enableEditor(){
      this.hotSettings.readOnly = false;
    },
  },
  watch: {
    tableHeight: function (data){
      this.resizeRowBar();
    },
  },
  mounted() {
    this.$data.tableHeight = this.$el.parentElement.offsetHeight;
    this.$emit('displayFontMenu', {
      data: this.$data,
      el: this.$el,
      type: this.$.type.name
    })
  },

}

</script>

<style scoped>

</style>