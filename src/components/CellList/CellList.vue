<template v-if="getCellList" >
  <div
      v-resize="testResize"
      v-if="active && typeof cellField.raws !== 'undefined'"
      v-on="loadCellListParams(this.$data)"
      class="main-container">
    <div class="resize-column-line"
      :style="{left: `${resizeLine.offsetLeft}px`, top: `${resizeLine.offsetTop}px`, display: resizeLine.display, height: '99%' }">
    </div>
    <div class="cell">
      <div class="empty-bar" :style="{gridColumn: `1 / ${cellField.defaultCols + 1}`}"></div>
      <div class="format-bar">
        <format-bar
            ref='formatBar'
            :cellListuid="cellListuid">
        </format-bar>
      </div>
      <div class="row-bar">
        <row-bar
          ref='rowBar'
          :cellListuid="cellListuid"
          v-for="row in cellField.defaultRaws">
        </row-bar>
      </div>
      <div :style="{position: `sticky`, height: 'fit-content', top: `${90}px`, display: 'grid', zIndex: '1',
           backgroundColor: 'red', gridRow: '2', gridColumn: `1 / ${cellField.defaultCols + 1}`,
           justifyContent: 'start', paddingLeft: '20px', cursor: columnBarFocused.cursor, webkitUserSelect: 'none',
           userSelect: 'none'}"
           @mousemove="moveResizeLine({data: this.$data, el: this.$el, event: $event})"
           @click="showResizeLineLast({name: name, data: this.$data, el: this.$el, event: $event})"
            >
        <column-bar
            ref='columnBar'
            @showResizeLine="showResizeLine"
            @moveResizeLine="moveResizeLine"
            :cellListuid="cellListuid"
            :hovered="{columnBarFocused, cell}"
            v-for="cell in cellField.defaultCols">
        </column-bar>
      </div>
      <div :style="{display: 'grid', height: '100%', zIndex: '0', gridRow: '3', gridColumn: `1 / ${cellField.defaultCols + 1}`, justifyContent: cellField.justifyCellContent, paddingLeft: '20px'}">
        <Cell
            ref="cell"
            @resizeRowBar="resizeRowBar"
            @displayFontMenu="displayFontMenu"
            :cellListuid="cellListuid"
            v-for="cell in cellField.numberOfcells">
        </Cell>
      </div>
    </div>
  </div>
</template>
<script>

/* eslint-disable */
import Cell from "@/components/Cell/Cell";
import ColumnBar from "@/components/columnBar/ColumnBar";
import RowBar from "@/components/RowBar/RowBar";
import FormatBar from "@/components/FormatBar/FormatBar";
import ChartJS from "@/components/ChartJS/ChartContainer";
import {nextTick} from "vue";
import {mapActions, mapGetters} from "vuex";
import ChartContainer from "@/components/ChartJS/ChartContainer";
import testChart from "@/components/ChartJS/testChart";
export default {
  name: "CellList",
  components:{
    ChartContainer,
    Cell,
    ColumnBar,
    RowBar,
    FormatBar,
    testChart
  },
  directives: {
    resize: {
      function(el, binding) {
        const onResizeCallback = binding.value;
        window.addEventListener('resize', () => {
          const width = document.documentElement.clientWidth;
          const height = document.documentElement.clientHeight;
          onResizeCallback({ width, height });
        })
      }
    }
  },
  props: ['cellListuid'],
  data(){
    return {
      props: this.$props,
      uid: this.$.uid,
      active: true,
      name: 'CellList',
      cellField:{
        defaultRaws: 2,
        defaultCols: 2,
        numberOfcells: '',
        raws: '',
        cols: '',
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        scrollWidth: '',
        justifyCellContent: 'stretch',
      },
      resizeLine: {
        offsetLeft: '',
        offsetTop: '',
        display: 'none',
        height: '',
        cursorPosX: ''
      },
      columnBarFocused: {
        el: '',
        data: '',
        event: '',
        activeBar: false,
        resizedWidth: '',
        lastColumn: '',
        cursor: ''
      },
      cellDbClicked: '',
      cellFocused: {
        el: '',
        data: '',
        event: '',
      }
    }
  },
  computed: mapGetters(['getCellList']),
  methods: {
    ...mapActions(['loadCellListParams', 'loadResize']),
    showResizeLine(params){
      let scrollLeft = document.querySelector('.main-container').scrollLeft - document.querySelector('.row-bar').scrollWidth;
      if (this.$data.resizeLine.display === 'none'){
        let scrollWIdth = document.querySelector('.cell').scrollWidth;
        this.$data.cellField.scrollWidth = scrollWIdth;
        let line = this.$data.resizeLine;
        line.display = 'grid';
        if (typeof params.data.event !== 'undefined') line.offsetLeft = params.data.event.clientX;
        line.cursorPosX = line.offsetLeft;
        this.$data.columnBarFocused.el = params.data.el;
        this.$data.columnBarFocused.data = params.data.data;
        this.$data.columnBarFocused.event = params.data.event;
        this.$data.columnBarFocused.activeBar = params.data.data.uid;
        if (params.data.data.gridCol === this.$data.cellField.defaultCols || params.data.data.gridCol === this.$data.cellField.cols){
          this.$data.columnBarFocused.lastColumn = true;
          this.$data.columnBarFocused.cursor = 'e-resize';
        }else{
          this.$data.columnBarFocused.lastColumn = false;
          this.$data.columnBarFocused.cursor = 'default';
        }
        this.$refs.columnBar.forEach(elem => {
          if (typeof elem.hoverIsActive !== 'undefined'){
            if (elem.uid != params.data.data.uid){
              elem.choosed = false;
              elem.hoverIsActive = false;
              elem.cursor = 'e-resize';
            }else{
              elem.choosed = true;
              elem.hoverIsActive = false;
              elem.cursor = 'e-resize';
            }
          }
        });
      }else{
        this.$refs.columnBar.forEach(elem => {
          if (typeof elem.hoverIsActive !== 'undefined'){
              elem.choosed = false;
              elem.hoverIsActive = true;
          }
        });
        if (( Math.abs(this.$data.resizeLine.offsetLeft + scrollLeft - params.data.el.offsetLeft)) > 2){
          let targetBar = this.$refs.columnBar.find(elem => elem.gridCol == this.$data.columnBarFocused.data.gridCol);
          let offsetLeft = targetBar.$el.offsetLeft;
          let width = targetBar.$el.offsetWidth;
          let targetCell = this.$refs.cell.find(elem => elem.gridCol == this.$data.columnBarFocused.data.gridCol);
          if ((this.$data.resizeLine.offsetLeft + scrollLeft) < (offsetLeft + width) && (this.$data.resizeLine.offsetLeft + scrollLeft) > offsetLeft){
            let temp = this.$data.resizeLine.offsetLeft - offsetLeft + scrollLeft;
            targetBar.$data.resizedMinWidth = temp + 20;
            targetCell.$data.resizedMinWidth = temp + 20 + 'px';
            targetCell.$data.resizedTextWidth = temp + 19 + 'px';
          }else if ((this.$data.resizeLine.offsetLeft + scrollLeft) > (offsetLeft + width)){
            targetBar.$data.resizedMinWidth = Math.abs((offsetLeft) - this.$data.resizeLine.offsetLeft) + scrollLeft + 5 + 20;
            targetCell.$data.resizedMinWidth = targetBar.$data.resizedMinWidth + 'px';
            targetCell.$data.resizedTextWidth = targetBar.$data.resizedMinWidth - 1 + 'px';
          }
        }
        this.$data.resizeLine.display = 'none';
        this.$data.columnBarFocused.cursor = 'default';
        this.$refs.columnBar.forEach(elem => {
            elem.cursor = 'pointer';
        });
      }
    },
    showResizeLineLast(params){
      if (this.$data.columnBarFocused.lastColumn){
        let scrollLeft = document.querySelector('.main-container').scrollLeft - document.querySelector('.row-bar').scrollWidth;
        if (this.$data.resizeLine.display !== 'none'){
          let line = this.$data.resizeLine;
          if (typeof params.event !== 'undefined') line.offsetLeft = params.event.clientX;
          line.cursorPosX = line.offsetLeft;
          if (( Math.abs(this.$data.resizeLine.offsetLeft + scrollLeft - params.el.offsetLeft)) > 2) {
            let targetBar = this.$refs.columnBar.find(elem => elem.gridCol == this.$data.columnBarFocused.data.gridCol);
            let offsetLeft = targetBar.$el.offsetLeft;
            let width = targetBar.$el.offsetWidth;
            let targetCell = this.$refs.cell.find(elem => elem.gridCol == this.$data.columnBarFocused.data.gridCol);
            if ((this.$data.resizeLine.offsetLeft + scrollLeft) > (offsetLeft + width)){
              targetBar.$data.resizedMinWidth = Math.abs((offsetLeft) - this.$data.resizeLine.offsetLeft) + scrollLeft + 5 + 20;
              targetCell.$data.resizedMinWidth = targetBar.$data.resizedMinWidth + 'px';
              this.$data.resizeLine.display = 'none';
              this.$data.columnBarFocused.cursor = 'default';
              this.$refs.columnBar.forEach(elem => {
                if (typeof elem.hoverIsActive !== 'undefined'){
                  elem.choosed = false;
                  elem.hoverIsActive = true;
                  elem.cursor = 'pointer';
                }
              });
            }
          }
        }
      }else{
        return;
      }
    },
    moveResizeLine(params){
      if (this.$data.resizeLine.display !== 'none'){
        let line = this.$data.resizeLine;
        if ( Math.abs(line.offsetLeft - params.event.clientX) > 5){
          line.offsetLeft = params.event.clientX;
        }
      }
    },
    resizeRowBar(params){
      let newCellHeight = params.data.textAreaNewHeight + 1;
      let targetBar = this.$refs.rowBar.find(elem => elem.gridRaw == params.data.gridRow);
      targetBar.newHeight = newCellHeight;
    },
    testResize({width, height}){
      let bla  = 0;
    },
    cellFocus(params){
      this.$refs.cell.forEach((cell, index) => { //

      });
    },
    displayFontMenu(params){
      let fontContainer = this.$refs.formatBar.$el.querySelector('.quill-edit');
      params.el.children[0].style.border = 'none';
      if(fontContainer.children.length == 0){
        fontContainer.appendChild(params.el.children[0]);
      }else{
        fontContainer.children[0].remove();
        fontContainer.appendChild(params.el.children[0]);
      }

    }
  },
  mounted() {
    this.$data.cellField.numberOfcells = this.$data.cellField.defaultRaws * this.$data.cellField.defaultCols;
    nextTick(() => {
      let availWidth = window.screen.availWidth + 0;
      let correctCellWidth = null;
      let koef = 0.05;
      do {
        koef+=0.1;
        correctCellWidth = (this.$refs.cell[0].$el.offsetWidth - koef) * (this.$data.cellField.defaultCols);
      } while(Math.round(availWidth) < Math.round(correctCellWidth));
      this.$refs.columnBar.forEach((barCell, index) => {
        barCell.$data.resizedMinWidth = this.$refs.cell[index].$el.offsetWidth + koef;
        this.$refs.cell[index].$data.resizedMinWidth = this.$refs.cell[index].$el.offsetWidth + koef + 'px';
      });
      this.$data.cellField.justifyCellContent = 'start';
    });
  }
}
</script>

<style scoped>
  .main-container{
    display: grid;
    width: 100%;
    align-content: start;
  }
  .cell{
    display: grid;
    grid-row: 1;
    height: fit-content;
  }
  .resize-column-line{
    height: 100%;
    width: 1px;
    background-color: red;
    border: 2px dotted black;
    position: absolute;
    left: 100px;
    z-index: 1;
    display: none;
  }
  .empty-bar{
    display: grid;
    position: sticky;
    top: 0px;
    left: 0px;
    z-index: 2;
    align-content: stretch;
    justify-content: stretch;
    background-color: black;
    grid-row: 1;
  }
  .format-bar{
    display: grid;
    position: sticky;
    justify-content: start;
    top: 0px;
    left: 0px;
    z-index: 2;
    height: fit-content;
    grid-row: 1;
    grid-column: 1 / 3;
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Standard syntax */
  }
  .row-bar{
    display: grid;
    position: sticky;
    top: 100px;
    left: 0px;
    z-index: 1;
    height: fit-content;
    width: fit-content;
    grid-column: 1;
    grid-row: 3;
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Standard syntax */
  }

</style>