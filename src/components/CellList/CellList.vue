<template v-if="getCellList">
  <div
      v-if="active && typeof cellField.raws !== 'undefined'"
      v-on="loadCellListParams(this.$data)"
      class="main-container">
    <div class="resize-column-line"
      :style="{left: `${resizeLine.offsetLeft}px`, top: `${resizeLine.offsetTop}px`, display: resizeLine.display, height: `${resizeLine.height}px` }">
    </div>
    <div class="resize-row-line"
         :style="{top: `${resizeRowLine.offsetTop}px`, display: resizeRowLine.display}">
    </div>
    <div class="cell">
      <div class="empty-bar" :style="{gridColumn: `1 / ${cellField.defaultCols + 1}`}"></div>
      <div class="format-bar">
        <format-bar
            ref='formatBar'
            @insertChart="insertChart"
            :cellListuid="cellListuid">
        </format-bar>
      </div>
      <div class="row-resize-container"
           @mousemove="moveResizeRowLine({data: this.$data, el: this.$el, event: $event})"
           @click="showResizeRowLine({name: name, data: this.$data, el: this.$el, event: $event})"
           :style="{height: `${resizeRowLine.resizeContainerHeight}`}">
        <div class="resize-bar"
           :style="{backgroundColor: `${resizeRowLine.resizeContainerBgColor}`, display: `${resizeRowLine.resizeBarDisplay}`,
            height: `${resizeRowLine.resizeBarHeight}`, cursor: `${resizeRowLine.resizeContainerCursor}`}"
        ></div>
      </div>
      <div class="row-bar">
        <row-bar
          ref='rowBar'
          @showResizeRowLine="showResizeRowLine"
          @mousemove="moveResizeRowLine({data: this.$data, el: this.$el, event: $event})"
          :cellListuid="cellListuid"
          :hovered="{rowBarFocused, row}"
          v-for="row in cellField.defaultRaws">
        </row-bar>
      </div>
      <div class="column-bar" :style="{position: `sticky`, height: 'fit-content', top: `${117}px`, display: 'grid', zIndex: '1',
           backgroundColor: 'red', gridRow: '2', gridColumn: `1 / ${cellField.defaultCols + 1}`,
           justifyContent: 'start', paddingLeft: '31px', cursor: columnBarFocused.cursor, webkitUserSelect: 'none',
           userSelect: 'none'}"
           @mousemove="moveResizeLine({data: this.$data, el: this.$el, event: $event})"
           @click="showResizeLineLast({name: name, data: this.$data, el: this.$el, event: $event})"
            >
        <column-bar
            ref='columnBar'
            @showResizeLine="showResizeLine"
            :cellListuid="cellListuid"
            :hovered="{columnBarFocused, cell}"
            v-for="cell in cellField.defaultCols">
        </column-bar>
      </div>
      <div :style="{display: 'grid', height: '100%', zIndex: '0', gridRow: '3', gridColumn: `1 / ${cellField.defaultCols + 1}`, alignContent: cellField.alignCellContent, justifyContent: cellField.justifyCellContent, paddingLeft: '31px'}">
        <Cell
            ref="cell"
            @resizeRowBar = "resizeRowBar"
            @displayFontMenu = "displayFontMenu"
            @cellFocus = 'cellFocus'
            @insertChart="insertChart"
            :cellListuid = "cellListuid"
            v-for="cell in cellField.numberOfcells">
        </Cell>
      </div>
    </div>
  </div>
  <!--  modals-->
<!--  <my-jenesius-modal></my-jenesius-modal>-->
  <my-naive-modal
      ref="naiveModal"
      @promtModalAction = 'promtModalAction'>
  </my-naive-modal>
</template>
<script>

/* eslint-disable */
import Cell from "@/components/Cell/Cell";
import ColumnBar from "@/components/columnBar/ColumnBar";
import RowBar from "@/components/RowBar/RowBar";
import FormatBar from "@/components/FormatBar/FormatBar";
import { nextTick } from "vue";
import {mapActions, mapGetters} from "vuex";
import testChart from "@/components/ChartJS/testChart";
// import { openModal } from "jenesius-vue-modal";
import MySimpleModal from "@/components/MySimpleModal/MySimpleModal";
import MyJenesiusModal from "@/components/MyJenesiusModal/MyJenesiusModal";
import { promptModal } from "jenesius-vue-modal";
import MyNaiveModal from "@/components/MyNaiveModal/MyNaiveModal";


export default {
  name: "CellList",
  components:{
    MyNaiveModal,
    Cell,
    ColumnBar,
    RowBar,
    FormatBar,
    testChart,
    MyJenesiusModal,
    MySimpleModal,
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
        defaultRaws: 6,
        defaultCols: 6,
        numberOfcells: '',
        raws: '',
        cols: '',
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        scrollWidth: '',
        justifyCellContent: 'stretch',
        alignCellContent: 'start',
      },
      resizeLine: {
        offsetLeft: '',
        offsetTop: '',
        display: 'none',
        height: '',
        cursorPosX: ''
      },
      resizeRowLine: {
        offsetTop: '',
        display: 'none',
        cursorPosY: '',
        resizeContainerBgColor: 'transparent',
        resizeContainerHeight: '80%',
        resizeBarHeight: '',
        resizeContainerCursor: 'none',
        resizeBarDisplay: 'none',
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
      rowBarFocused: {
        el: '',
        data: '',
        event: '',
        activeBar: false,
        resizedWidth: '',
        lastColumn: '',
        cursor: ''
      },
      cellDbClicked: '',
      cellFocused: [],
    }
  },
  computed: mapGetters(['getCellList']),
  methods: {
    ...mapActions(['loadCellListParams', 'loadResize']),
    showResizeLine(params){
      let scrollLeft = document.querySelector('.main-container').scrollLeft - document.querySelector('.row-bar').scrollWidth;
      if (this.$data.resizeLine.display === 'none'){
        // let offsetTop = document.querySelector('.row-bar').getBoundingClientRect().top;//отступ сверху
        this.$data.cellField.scrollWidth = document.querySelector('.main-container').scrollWidth;
        let scroll = window.scrollX;
        let line = this.$data.resizeLine;
        line.height = document.querySelector('.row-bar').scrollHeight;
        // line.offsetTop = window.pageYOffset + document.querySelector('.column-bar').scrollHeight;
        line.display = 'grid';
        if (typeof params.data.event !== 'undefined') line.offsetLeft = Number(params.data.event.clientX) + scroll;
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
          let width = targetBar.$el.getBoundingClientRect().width
          let targetCell = [];
          this.$refs.cell.map((elem)=> {
            if (elem.gridCol == this.$data.columnBarFocused.data.gridCol) targetCell.push(elem);
          })
          if ((this.$data.resizeLine.offsetLeft + scrollLeft) < (offsetLeft + width) && (this.$data.resizeLine.offsetLeft + scrollLeft) > (offsetLeft - 31)){
            let temp = this.$data.resizeLine.offsetLeft - offsetLeft + scrollLeft;
            targetBar.$data.resizedMinWidth = temp + 31;
            targetCell.forEach(elem => {
              elem.$data.resizedMinWidth = targetBar.$data.resizedMinWidth + 'px';
            });
          }else if ((this.$data.resizeLine.offsetLeft + scrollLeft) > (offsetLeft + width)){
            targetBar.$data.resizedMinWidth = Math.abs((offsetLeft) - this.$data.resizeLine.offsetLeft) + scrollLeft + 35;
            targetCell.forEach(elem => {
              elem.$data.resizedMinWidth = targetBar.$data.resizedMinWidth + 'px';
            });
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
        let scroll = window.scrollX;
        if (this.$data.resizeLine.display !== 'none'){
          let line = this.$data.resizeLine;
          if (typeof params.event !== 'undefined') line.offsetLeft = params.event.clientX + scroll;
          line.cursorPosX = line.offsetLeft;
          if (typeof params.el.offsetLeft === 'undefined') params.el.offsetLeft = 0;
          if (( Math.abs(this.$data.resizeLine.offsetLeft + scrollLeft - params.el.offsetLeft)) > 2) {
            let targetBar = this.$refs.columnBar.find(elem => elem.gridCol == this.$data.columnBarFocused.data.gridCol);
            let offsetLeft = targetBar.$el.offsetLeft;
            let width = targetBar.$el.getBoundingClientRect().width;
            let targetCell = [];
            this.$refs.cell.map((elem)=> {
              if (elem.gridCol == this.$data.columnBarFocused.data.gridCol) targetCell.push(elem);
            })
            if ((this.$data.resizeLine.offsetLeft) > (offsetLeft + width)){
              targetBar.$data.resizedMinWidth = Math.abs((offsetLeft) - this.$data.resizeLine.offsetLeft) + scrollLeft + 5 + 31;
              targetCell.forEach(elem => {
                elem.$data.resizedMinWidth = targetBar.$data.resizedMinWidth + 'px';
              });
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
      }
    },
    moveResizeLine(params){
      if (this.$data.resizeLine.display !== 'none'){
        let scroll = window.scrollX;
        let line = this.$data.resizeLine;
        if ( Math.abs(line.offsetLeft - params.event.clientX) > 5){
          line.offsetLeft = params.event.clientX + scroll;
        }
      }
    },
    showResizeRowLine(params){
      if (this.$data.resizeRowLine.display === 'none' && params.name === 'CellList') return;
      if (this.$data.resizeRowLine.display === 'none'){
        this.$data.cellField.scrollHeight = document.querySelector('.main-container').scrollHeight;
        let scroll = window.scrollY;
        let line = this.$data.resizeRowLine;
        line.display = 'grid';
        if (typeof params.data.event !== 'undefined') line.offsetTop = Number(params.data.event.clientY) + scroll;
        line.cursorPosY = line.offsetTop;
        this.$data.rowBarFocused.el = params.data.el;
        this.$data.rowBarFocused.data = params.data.data;
        this.$data.rowBarFocused.event = params.data.event;
        this.$data.rowBarFocused.activeBar = params.data.data.uid;
        if (params.data.data.gridCol === this.$data.cellField.defaultCols || params.data.data.gridCol === this.$data.cellField.cols){
          this.$data.rowBarFocused.lastColumn = true;
          this.$data.rowBarFocused.cursor = 'e-resize';
        }else{
          this.$data.rowBarFocused.lastColumn = false;
          this.$data.rowBarFocused.cursor = 'default';
        }
        this.$refs.rowBar.forEach(elem => {
          if (typeof elem.hoverIsActive !== 'undefined'){
            if (elem.uid != params.data.data.uid){
              elem.choosed = false;
              elem.hoverIsActive = false;
              elem.cursor = 'ns-resize';
            }else{
              elem.choosed = true;
              elem.hoverIsActive = false;
              elem.cursor = 'ns-resize';
            }
          }
        });
      }else if (this.$data.resizeRowLine.display === 'grid' && params.name !== 'CellList'){
        this.$refs.rowBar.forEach(elem => {
          if (typeof elem.hoverIsActive !== 'undefined'){
            elem.choosed = false;
            elem.hoverIsActive = true;
          }
        });
        if (( Math.abs(this.$data.resizeRowLine.offsetTop - params.data.el.getBoundingClientRect().top)) > 2){
          let targetBar = this.$refs.rowBar.find(elem => elem.gridRaw == this.$data.rowBarFocused.data.gridRaw);
          let offsetTop = targetBar.$el.getBoundingClientRect().top;//отступ сверху
          let height = targetBar.$el.getBoundingClientRect().height;//высота текущего row-bar
          let targetCell = [];
          this.$refs.cell.map((elem)=> {
            if (elem.gridRow == this.$data.rowBarFocused.data.gridRaw) targetCell.push(elem);
          })
          if ((this.$data.resizeRowLine.offsetTop - window.scrollY) < (offsetTop + height) && (this.$data.resizeRowLine.offsetTop) > offsetTop){
            let temp = this.$data.resizeRowLine.offsetTop - window.scrollY - offsetTop;
            targetBar.$data.newHeight = temp + 2;
            targetCell.forEach(elem => {
              elem.$data.newHeight = targetBar.$data.newHeight + 'px';
            });
          }else if ((this.$data.resizeRowLine.offsetTop - window.scrollY) > (offsetTop + height)){
            targetBar.$data.newHeight = this.$data.resizeRowLine.offsetTop - window.scrollY - offsetTop + 7;
            targetCell.forEach(elem => {
              elem.$data.newHeight = targetBar.$data.newHeight + 'px';
            });
          }
        }
        this.$data.resizeRowLine.display = 'none';
        this.$data.rowBarFocused.cursor = 'default';
        this.$refs.rowBar.forEach(elem => {
          elem.cursor = 'pointer';
        });
      }else if (this.$data.resizeRowLine.display === 'grid' && params.name === 'CellList'){
        let targetBar = this.$refs.rowBar.find(elem => elem.gridRaw == this.$data.rowBarFocused.data.gridRaw);
        let offsetTop = targetBar.$el.getBoundingClientRect().top;//отступ сверху
        let targetCell = [];
        this.$refs.cell.map((elem)=> {
          if (elem.gridRow == this.$data.rowBarFocused.data.gridRaw) targetCell.push(elem);
        });
        targetBar.$data.newHeight = this.$data.resizeRowLine.offsetTop - window.scrollY - offsetTop + 7;
        targetCell.forEach(elem => {
          elem.$data.newHeight = targetBar.$data.newHeight + 'px';
        });
        this.$data.resizeRowLine.display = 'none';
        this.$data.rowBarFocused.cursor = 'default';
        this.$refs.rowBar.forEach(elem => {
          elem.cursor = 'pointer';
          elem.$data.hoverIsActive = true;
        });
        this.$data.resizeRowLine.resizeContainerBgColor = 'transparent';
        this.$data.resizeRowLine.resizeContainerCursor = 'none';
        this.$data.resizeRowLine.resizeBarDisplay = 'none';
      }
    },
    moveResizeRowLine(params){
      if (this.$data.resizeRowLine.display !== 'none'){
        let availWidth = window.screen.availHeight;
        let scrollTop = document.querySelector('.row-bar').scrollHeight;
        let scroll = window.scrollY;
        let line = this.$data.resizeRowLine;
        if ( Math.abs(line.offsetTop - params.event.clientY) > 5){
          line.offsetTop = params.event.clientY + scroll;
          if ((scrollTop + document.querySelector('.row-bar').offsetTop) < line.offsetTop){
            this.$data.resizeRowLine.resizeBarDisplay = 'grid';
            this.$data.resizeRowLine.resizeContainerBgColor = 'orange';
            this.$data.resizeRowLine.resizeContainerCursor = 'ns-resize';
            this.$data.resizeRowLine.resizeBarHeight = params.event.clientY - document.querySelector('.row-bar').offsetTop + 7 + scroll + 'px';
            // if (availWidth - (document.querySelector('.row-resize-container').scrollHeight + document.querySelector('.row-bar').offsetTop) < 70){
            //   let bla = 0;
            //   this.$data.resizeRowLine.resizeContainerHeight = (document.querySelector('.row-resize-container').scrollHeight + scroll + document.querySelector('.row-bar').offsetTop) + 100 + 'px';
            // }
          }else{
            this.$data.resizeRowLine.resizeContainerBgColor = 'transparent';
            this.$data.resizeRowLine.resizeContainerCursor = 'none';
            this.$data.resizeRowLine.resizeBarHeight = '80%';
            this.$data.resizeRowLine.resizeBarDisplay = 'none';
          }
        }
      }
    },
    resizeRowBar(params){
      if (typeof params.data !== 'undefined'){
        let newCellHeight = params.heightKey;
        let targetBar = this.$refs.rowBar.find(elem => elem.gridRaw == params.data.gridRow);
        targetBar.newHeight = newCellHeight;
      }
    },
    scrollDetect(){
      // let bla = event.currentTarget.scrollY;
      // let line = this.$data.resizeLine;
      // if (line.height < line.height + window.scrollY){
      //   line.height = line.height + window.scrollY - 80;
      // }else if (line.height > line.height + window.scrollY){
      //   line.height = line.height - window.scrollY;
      // }else if (window.scrollY == 0){
      //   this.resizeLine.height = window.screen.availHeight - document.querySelector('.column-bar').getBoundingClientRect().y - 75;
      // }
    },
    cellFocus(params){
      if (params.focused){
        let cellIndex = '';
        let checkCellState = this.$data.cellFocused.find((elem, index) => {
          if (elem.data.data.uid === params.data.data.uid){
            cellIndex = index;
            return elem;
          }
        });
        if (typeof checkCellState === 'undefined'){
          this.$data.cellFocused.push(params);
        }
        this.$refs.formatBar.$data.cellSelected = params;
      }else{
        let cellIndex = '';
        let checkCellState = this.$data.cellFocused.find((elem, index) => {
          if (elem.data.data.uid === params.data.data.uid){
            cellIndex = index;
             return elem;
          }
        });
        if(typeof checkCellState !== 'undefined'){
          this.$data.cellFocused.splice(cellIndex,1);
        }
        if (this.$data.cellFocused.length == 0) this.$refs.formatBar.$data.cellSelected = false;
      }
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
    },
    insertChart(params){
      try {
        let tempArr = this.$data.cellFocused.slice(0);
        tempArr.forEach(elem => {
          if (elem.data.data.insertObj == '' || elem.data.data.insertObj == 'empty'){
            elem.data.data.insertObj = params.type;
            elem.data.data.cellBgColor = '';
            elem.data.data.cellFocusAnima = false;
            this.cellFocus({data: elem.data, focused: false});
          }else{
            this.$refs.naiveModal.$refs.promtModal.showModal = true;
            if (params.type == 'empty'){
              this.$refs.naiveModal.$refs.promtModal.content = 'Очистить выбранные ячейки?';
            }else{
              this.$refs.naiveModal.$refs.promtModal.content = 'Некоторые ячейки содержат объекты. Перезаписать?';
            }
            this.$refs.naiveModal.$refs.promtModal.bufferElem = {cell: elem, chartType: params.type};
          }
        });
      }catch (e) {
        console.log(`Err: ${promptModal(MySimpleModal)}`);
      }
    },
    promtModalAction(params){
      let tempArr = this.$data.cellFocused.slice(0);
      tempArr.forEach(elem => {
        elem.data.data.insertObj = params.data.data.chartType;
        elem.data.data.cellBgColor = '';
        elem.data.data.cellFocusAnima = false;
        this.cellFocus({data: elem.data, focused: false});
      });
    },
  },
  mounted() {
    this.$data.cellField.numberOfcells = this.$data.cellField.defaultRaws * this.$data.cellField.defaultCols;
    nextTick(() => {
      let availWidth = window.screen.availWidth;
      let correctCellWidth = null;
      let koef = 0.05;
      do {
        koef+=0.1;
        correctCellWidth = (this.$refs.cell[0].$el.offsetWidth - koef) * (this.$data.cellField.defaultCols);
      } while(Math.round(availWidth) < Math.round(correctCellWidth));
      this.$refs.columnBar.forEach((barCell, index) => {
        barCell.$data.resizedMinWidth = this.$refs.cell[index].$el.getBoundingClientRect().width - koef;
        this.$refs.cell.forEach((cell, index) => {
          this.$refs.cell[index].$data.resizedMinWidth = this.$refs.cell[index].$el.getBoundingClientRect().width - koef +'px';
        });
      });
      this.$data.cellField.justifyCellContent = 'start';
      this.resizeLine.height = window.screen.availHeight - document.querySelector('.column-bar').getBoundingClientRect().y - 75;
      this.resizeLine.offsetTop = document.querySelector('.column-bar').getBoundingClientRect().y + window.pageYOffset + document.querySelector('.column-bar').scrollHeight;
    });
    window.addEventListener('scroll', this.scrollDetect);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollDetect);
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
  .resize-row-line{
    width: 98%;
    height: 1px;
    background-color: red;
    border: 2px dotted black;
    position: absolute;
    left: 31px;
    z-index: 3;
    display: none;
  }
  .empty-bar{
    display: grid;
    position: sticky;
    top: 0;
    left: 0;
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
    top: 0;
    left: 0;
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
    left: 0;
    z-index: 1;
    height: fit-content;
    width: fit-content;
    min-width: 31px;
    grid-column: 1;
    grid-row: 3;
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Standard syntax */
  }
  .row-resize-container{
    position: absolute;
    top: 137px;
    left: 0;
    z-index: 1;
    width: 31px;
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Standard syntax */
  }
  .resize-bar{
    z-index: 1;
    position: relative;
  }
</style>

