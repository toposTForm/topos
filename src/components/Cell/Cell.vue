<template>
  <div :id=uid
       v-if="active"
       v-on:click.right.prevent="rClick($event)"
       v-on="loadCell(this.$data),
       loadCellRow(this.$data),
       loadCellColumn(this.$data)"
       @dblclick='dbClickCell(this)'
       @click="cellFocus({name: name, data: this.$data, el: this.$el, event: $event})"
       class="cell"
       :style="{display: 'grid', gridRow: gridRow, gridColumn: gridCol, cursor: cursor, width: `${resizedWidth}`, backgroundColor: `${cellBgColor}`, justifyContent: 'stretch'}">
    <div class="wrap" :style="{minWidth: `${resizedMinWidth}`}" :class="{'cell-focus-anima': cellFocusAnima}">
<!--      <chart-container></chart-container>-->
      <div v-if="!dbClicked" class="cell-text" v-html="cellTextHtml" :style="{fontSize: `${fontSize}px`,fontWeight: fontWeight, width: `${resizedTextWidth}`, height: `${textAreaNewHeight}` }"
           >
      </div>
      <div v-if="dbClicked" class="input-cell" :style="{width: `${resizedMinWidth}`, cursor: 'auto' }">
<!--        <textarea class="text-area"-->
<!--                  v-on:input="loadCellText(this)"-->
<!--                  v-model="cellText" type="text"-->
<!--                  @mouseup="selectedText({name: name, data: this.$data, el: this.$el, event: $event})"-->
<!--                  :style="{height: `${textAreaNewHeight}px`, fontSize: `${fontSize}px`, fontWeight: `normal`, minWidth: `${resizedMinWidth}`}"-->
<!--                  placeholder="type text ">-->
<!--        </textarea>-->
        <my-quill-editor
            @resizeRowBar="resizeRowBar"
            @saveInnerHtml="saveInnerHtml"
            @displayFontMenu="displayFontMenu"
            ref="quillEditor"
            :style="{width: `${resizedMinWidth}`}">
        </my-quill-editor>
<!--        <div contenteditable="true" class="text-area"-->
<!--            v-on:input="loadCellText(this)"-->
<!--            @mouseup="selectedText({name: 'selectText', data: this.$data, el: this.$el, event: $event})"-->
<!--            :style="{height: `${textAreaNewHeight}px`, fontSize: `${fontSize}px`, fontWeight: fontWeight, minWidth: `${resizedMinWidth}`}"-->
<!--            placeholder="type text">-->

<!--        </div>-->
        <right-click-menu v-if="showMenu"></right-click-menu>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {mapGetters, mapActions} from "vuex";
import RightClickMenu from "@/components/RightClickMenu/RightClickMenu";
import ChartContainer from "@/components/ChartJS/ChartContainer";
import MyQuillEditor from "@/components/QuillEditor/MyQuillEditor";

export default {
  name: "Cell",
  components:{
    RightClickMenu,
    ChartContainer,
    MyQuillEditor
  },
  props: ['cellListuid', 'rows', 'columns'],
  setup(props){

  },
  data(){
    return {
      parentCellList: this.$props.cellListuid,
      uid: this.$.uid,
      name: 'Cell',
      showMenu: '',
      active: true,
      dbClicked: false,
      disableClick: false,
      mouseenterColResize: false,
      mouseMoveColResize: false,
      mouseleaveColResize: false,
      cellText: "",
      cellTextEl: '',
      cellTextHtml: '',
      gridCol: '',
      gridRow: '',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 'normal',
      textAreaOldHeight: 40,
      textAreaNewHeight: '',
      resizedWidth: '',
      resizedTextWidth: '',
      resizedMinWidth: '',
      classes:{
        mainContainer: 'main-container',
      },
      cellBgColor: '',
      cellFocusAnima: false,
    }
  },
  computed: mapGetters(['getCell', 'getCellMinHeight', "getClickUp", "getSelectedText"]),
  watch: {
    textAreaNewHeight: function (data){
      this.resizeRowBar();
    }
  },
  methods: {
    ...mapActions(['loadCell', 'dbClickCell', "loadCellRow", "loadCellColumn", 'rClick', 'loadCellText', 'loadResize', 'selectedText']),
    resizeRowBar(params){
      if (typeof params !== 'undefined') this.textAreaNewHeight = params.data.quillHeight;
      this.$emit('resizeRowBar', {
        data: this.$data,
      })
    },
    changeToolBar(params){
      // this.$refs.quillEditor.toolbar = {...'full'};
    },
    cellFocus(data){
      setTimeout(() =>  {
        if(this.$data.cellBgColor !== 'blanchedalmond' && !this.$data.dbClicked ){
          if (!this.$data.disableClick){
            this.$data.cellBgColor = 'blanchedalmond';
            this.$data.cellFocusAnima = true;
            this.selectedText({name: 'cellFocus', data: this.$data, el: this.$el, event: data.event});
            this.$emit('cellFocus',{
              data: data,
            })
          }
        }else {
          this.$data.cellBgColor = '';
          this.$data.cellFocusAnima = false;
        }
      }, 100)
    },
    saveInnerHtml(params){
      this.cellTextHtml = params.data;
    },
    displayFontMenu(params){
      this.$emit('displayFontMenu', {
        data: params.data,
        el: params.el
      })
    }
  },
}
</script>

<style scoped>
.cell{
  width: 100%;
  display: grid;
  background-color: azure;
  opacity: 0.9;
  font-size: 14px;}
.wrap{
  display: grid;
  min-height: 40px;
  min-width: 18px;
  border: 1px solid gray;
}
.cell-focus-anima{
  width: 100%;
  position: relative;
  animation: 1s ease-in 0.1s infinite alternate animate-focused-cell;
}
@keyframes animate-focused-cell {
  from {
    border-bottom: none;
    transform: translateY(0em);
    filter: brightness(30%);
  }
  to {
    border-bottom: none;
    transform: translateY(0.7em);
  }
}
.cell:hover{
  opacity: 1;
  border-color: black;
  background-color: blanchedalmond;
  cursor: pointer;
}
.cell-text{
  align-self: center;
  line-height: normal;
  text-align: left;
  overflow: auto;
  -webkit-user-select: none; /* Safari */
  user-select: none; /* Standard syntax */
}
.input-cell{
  width: fit-content;
  font-size: 14px;
  width: 100%;
  padding: 0;
  margin: 0;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  display: grid;
  background-color: white;
}
.text-area{
  padding: 2px;
  min-height: 40px;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  resize: none;
  cursor: text;
}
</style>