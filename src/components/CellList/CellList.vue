<template v-if="getCellList">
  <div
      v-if="active && typeof cellField.raws !== 'undefined'"
      v-on="loadCellListParams(this.$data)"
      class="main-container">
    <div class="resize-column-line"
      :style="{left: `${resizeLine.offsetLeft}px`, top: `${resizeLine.offsetTop}px`, display: resizeLine.display, height: `${resizeLine.height}px` }">
    </div>
    <div class="resize-row-line"
         :style="{top: `${resizeRowLine.offsetTop}px`, display: resizeRowLine.display, width: `${resizeRowLine.width}px`}">
    </div>
    <div class="cell">
      <div class="empty-bar" >
<!--        :style="{gridColumn: `1 / ${cellField.defaultCols + 1}`}"-->
        <format-bar
            ref='formatBar'
            @changeFormName="changeFormName"
            :cellListuid="cellListuid">
        </format-bar>
      </div>
      <div style="position: fixed; bottom: 0%; overflow: visible; right: 0px; z-index: 2;" >
        <right-layout
            ref='rightLayout'
            @insertChart="insertChart"
            :cellListuid="cellListuid"
        >
        </right-layout>
      </div>
      <div class="row-resize-container"
           @mousemove="moveResizeRowLine({data: this.$data, el: this.$el, event: $event})"
           @click="showResizeRowLine({name: name, data: this.$data, el: this.$el, event: $event})"
           :style="{height: `${resizeRowLine.resizeContainerHeight}`}">
        <div class="resize-row-bar"
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
      <div class="column-resize-container"
           @mousemove="moveResizeLine({data: this.$data, el: this.$el, event: $event})"
           @click="showResizeColumnLine({name: name, data: this.$data, el: this.$el, event: $event})"
           :style="{width: `${resizeLine.resizeContainerWidth}`}">
        <div class="resize-column-bar"
             :style="{backgroundColor: `${resizeLine.resizeContainerBgColor}`, display: `${resizeLine.resizeBarDisplay}`,
            width: `${resizeLine.resizeBarWidth}`, cursor: `${resizeLine.resizeContainerCursor}`}"
        ></div>
      </div>
      <div class="column-bar" :style="{gridColumn: `1 / ${cellField.defaultCols + 1}`, cursor: columnBarFocused.cursor, webkitUserSelect: 'none'}"
            >
        <column-bar
            ref='columnBar'
            @mousemove="moveResizeLine({data: this.$data, el: this.$el, event: $event})"
            @showResizeColumnLine="showResizeColumnLine"
            :cellListuid="cellListuid"
            :hovered="{columnBarFocused, cell}"
            v-for="cell in cellField.defaultCols">
        </column-bar>
      </div>
      <div :style="{display: 'grid', overflow: 'hidden', height: '100%', zIndex: '0', gridRow: '3', gridColumn: `1 / ${cellField.defaultCols + 1}`, alignContent: cellField.alignCellContent, justifyContent: cellField.justifyCellContent, paddingLeft: '31px'}">
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
  <my-naive-modal
      ref="naiveModal"
      @promtModalAction = 'promtModalAction'
      @addElement = 'addElement'>
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
import MySimpleModal from "@/components/MySimpleModal/MySimpleModal";
import MyJenesiusModal from "@/components/MyJenesiusModal/MyJenesiusModal";
import MyNaiveModal from "@/components/MyNaiveModal/MyNaiveModal";
import MyNaiveInput from "@/components/MyNaiveMessage/MyNaiveInput";
import RightLayout from "@/components/RightLayout/RightLayout";

class Memento{
  constructor(value) {
    this.value = value;
  }
};
const creator = {
  save: val => new Memento(val),
  restore: memento => memento.value,
};
class Caretaker{
  constructor() {
    this.values = [];
  }
  addMemento(memento){
    this.values.push(memento);
  }
  getMemento(index){
    return this.values[index];
  }
}
const hranitel = new Caretaker();
// creator.restore(hranitel.getMemento(0));
// hranitel.addMemento(creator.save('hello'));
// hranitel.addMemento(creator.save('hello1'));
// hranitel.addMemento(creator.save('hello2'));
// console.log(creator.restore(hranitel.getMemento(1)));
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
    MyNaiveInput,
    RightLayout
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
        columnParams: [],
        rowParams: [],
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
        cursorPosX: '',
        resizeContainerBgColor: 'transparent',
        resizeContainerWidth: '98%',
        resizeBarWidth: '',
        resizeContainerCursor: 'none',
        resizeBarDisplay: 'none',
      },
      resizeRowLine: {
        offsetTop: '',
        display: 'none',
        cursorPosY: '',
        width: '',
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
    showResizeColumnLine(params){
      if (this.$data.resizeLine.display === 'none' && params.name === 'CellList') return;
      let scrollLeft = document.querySelector('.main-container').scrollLeft - document.querySelector('.row-bar').scrollWidth;
      if (this.$data.resizeLine.display === 'none'){
        this.$data.cellField.scrollWidth = document.querySelector('.main-container').scrollWidth;
        let scroll = window.scrollX;
        let line = this.$data.resizeLine;
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
        line.height = document.querySelector('.row-bar').scrollHeight;
        this.$data.resizeRowLine.display = 'none';
      }else if (this.$data.resizeLine.display === 'grid' && params.name !== 'CellList'){
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
            if (targetBar.$data.resizedMinWidth < 68) targetBar.$data.resizedMinWidth = 68;
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
      }else if (this.$data.resizeLine.display === 'grid' && params.name === 'CellList'){
        let targetBar = this.$refs.columnBar.find(elem => elem.gridCol == this.$data.columnBarFocused.data.gridCol);
        let offsetLeft = targetBar.$el.getBoundingClientRect().left;//отступ сверху
        let targetCell = [];
        this.$refs.cell.map((elem)=> {
          if (elem.gridCol == this.$data.columnBarFocused.data.gridCol) targetCell.push(elem);
        });
        targetBar.$data.resizedMinWidth = this.$data.resizeLine.offsetLeft - window.scrollX - offsetLeft + 7;
        targetCell.forEach(elem => {
          elem.$data.resizedMinWidth = targetBar.$data.resizedMinWidth + 'px';
        });
        this.$data.resizeLine.resizeContainerBgColor = 'transparent';
        this.$data.resizeLine.display = 'none';
        this.$data.columnBarFocused.cursor = 'default';
        this.$refs.columnBar.forEach(elem => {
          elem.cursor = 'pointer';
          elem.hoverIsActive = true;
        });
      }
    },
    moveResizeLine(params){
      if (this.$data.resizeLine.display !== 'none'){
        let scrollLeft = document.querySelector('.column-bar').scrollWidth;
        let scroll = window.scrollX;
        let line = this.$data.resizeLine;
        if ( Math.abs(line.offsetLeft - params.event.clientX) > 5){
          line.offsetLeft = params.event.clientX + scroll;
          if ((scrollLeft + document.querySelector('.column-bar').offsetLeft) < line.offsetLeft){
            this.$data.resizeLine.resizeBarDisplay = 'grid';
            this.$data.resizeLine.resizeContainerBgColor = 'orange';
            this.$data.resizeLine.resizeContainerCursor = 'e-resize';
            this.$data.resizeLine.resizeBarWidth = params.event.clientX - document.querySelector('.column-bar').offsetLeft -24 + scroll + 'px';
          }else{
            this.$data.resizeLine.resizeContainerBgColor = 'transparent';
            this.$data.resizeLine.resizeContainerCursor = 'none';
            this.$data.resizeLine.resizeBarHeight = '80%';
            this.$data.resizeLine.resizeBarDisplay = 'none';
          }
        }
      }
    },
    showResizeRowLine(params){
      if (this.$data.resizeRowLine.display === 'none' && params.name === 'CellList') return;
      if (this.$data.resizeRowLine.display === 'none'){
        this.$data.resizeLine.display = 'none';
        this.$data.cellField.scrollHeight = document.querySelector('.main-container').scrollHeight;
        let scroll = window.scrollY;
        let line = this.$data.resizeRowLine;
        line.display = 'grid';
        line.width = document.querySelector('.column-bar').scrollWidth - 31;
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
        this.$data.resizeLine.height = document.querySelector('.row-bar').scrollHeight;
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
            if (targetBar.$data.newHeight < 68) targetBar.$data.newHeight = 68;
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
        this.$data.resizeLine.display = 'none';
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
        this.$data.resizeLine.display = 'none';
      }
    },
    moveResizeRowLine(params){
      if (this.$data.resizeRowLine.display !== 'none'){
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
        this.$refs.formatBar.cellSelected = params;
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
        if (this.$data.cellFocused.length == 0) this.$refs.formatBar.cellSelected = false;
      }
    },
    displayFontMenu(params){
      // if (params.type === 'MyQuillEditor'){
      //   let fontContainer = this.$refs.formatBar.$el.querySelector('.quill-edit');
      //   params.el.children[0].style.border = 'none';
      //   if(fontContainer.children.length == 0){
      //     if (params.enable){
      //       fontContainer.appendChild(params.el.children[0]);
      //       params.toolbar.style.display = 'block';
      //     }
      //   }else{
      //     if (params.enable){
      //       params.toolbar.style.display = 'block';
      //       fontContainer.children[0].replaceWith(params.toolbar);
      //     }
      //     if (!params.enable){
      //       params.toolbar.style.display = 'none';
      //     }
      //   }
      // }else if (params.type === 'HandsontableOne'){
      //   params.el.children[0].style.border = 'none';
      // }
    },
    insertChart(params){

      try {
        let tempArr = this.$data.cellFocused.slice(0);
        let objName = '';
        switch (params.type){
          case 'barChartHor':
            objName ='Гистограмма горизонтальная';
            break;
          case 'barChartVert':
            objName ='Гистограмма вертикальная';
            break;
          case 'groupedBarChart':
            objName ='Гистограмма групповая';
            break;
          case 'pieChart':
            objName ='Круговая диаграмма ';
            break;
          case 'lineChart':
            objName ='Линейная диаграмма ';
            break;
          case 'mixBarChart':
            objName ='Смешанная диаграмма';
            break;
          case 'radarChart':
            objName ='Диаграмма направленности';
            break;
          case 'sectorChart':
            objName ='Секторная диаграмма';
            break;
          case 'quillEditor':
            objName ='Текстовый редактор';
            break;
          case 'handsonTable':
            objName ='Таблица';
            break;
          case 'gaugeChart':
            objName ='Индикатор';
            break;
          default:
            objName = 'Без имени';
        }
        let lengthFlag = false;
        let notEmptyFlag = false;
        let emptyMessageFlag = false;
        tempArr.forEach((elem) => {
          if ((elem.data.data.insertObj == 'empty' || typeof  elem.data.data.insertObj === 'undefined') && params.type !== 'empty'){
            notEmptyFlag = true;
            if (this.$data.cellFocused.length > 1 && params.action !== 'addElement'){
              if (this.$data.cellFocused.length <= 4){
                this.$refs.naiveModal.$refs.promtModal.title = `Создать: ${objName} (${this.$data.cellFocused.length} экземпляра)`;
              } else{
                this.$refs.naiveModal.$refs.promtModal.title = `Создать: ${objName} (${this.$data.cellFocused.length} экземпляров)`;
              }
              this.$refs.naiveModal.$refs.promtModal.content = '"Авто", чтобы установить имя автоматически. "Вручную" - ввести для каждого.';
              this.$refs.naiveModal.$refs.promtModal.negativeText = 'Авто';
              this.$refs.naiveModal.$refs.promtModal.positiveText = 'Вручную';
              this.$refs.naiveModal.$refs.promtModal.showInput = false;
              setTimeout(() => this.$refs.naiveModal.$refs.promtModal.showModal = true, 300);
              this.$refs.naiveModal.$refs.promtModal.bufferElem = {cell: elem, type: params.type, objName: objName};
              lengthFlag = true;
              throw {
                event: 'multiAdding',
              }
            }else if (!lengthFlag){
              this.$refs.naiveModal.$refs.promtModal.showInput = true;
              this.$refs.naiveModal.$refs.promtModal.title = `Создать: ${objName}`;
              this.$refs.naiveModal.$refs.promtModal.content = 'Введите имя ячейки';
              this.$refs.naiveModal.$refs.promtModal.negativeText = 'Отмена';
              this.$refs.naiveModal.$refs.promtModal.positiveText = 'Принять';
              this.$refs.naiveModal.$refs.promtModal.bufferElem = {cell: elem, type: params.type, objName: objName};
              setTimeout(() => this.$refs.naiveModal.$refs.promtModal.showModal = true, 300);
            }
          }else{
            if (params.type == 'empty' && elem.data.data.insertObj !== 'empty'){
              this.$refs.naiveModal.$refs.promtModal.title = `Очистить ячейки`;

              if (this.$data.cellFocused.length == 1){
                this.$refs.naiveModal.$refs.promtModal.content = `(${this.$data.cellFocused.length} ячейка будет очищена)`;
              }else if (this.$data.cellFocused.length >= 2 && this.$data.cellFocused.length < 5){
                this.$refs.naiveModal.$refs.promtModal.content = `(${this.$data.cellFocused.length} ячейки будет очищено)`;
              }else{
                this.$refs.naiveModal.$refs.promtModal.content = `(${this.$data.cellFocused.length} ячеек будет очищено)`;
              }
              this.$refs.naiveModal.$refs.promtModal.positiveText = 'Удалить';
              this.$refs.naiveModal.$refs.promtModal.negativeText = 'Отмена';
              this.$refs.naiveModal.$refs.promtModal.showInput = false;
              this.$refs.naiveModal.$refs.promtModal.bufferElem = {cell: elem, type: params.type};
              setTimeout(() => this.$refs.naiveModal.$refs.promtModal.showModal = true, 100);
            }else if (params.type == 'empty' && elem.data.data.insertObj == 'empty'){
              if (this.$data.cellFocused.length > 1 && !notEmptyFlag && !emptyMessageFlag) {
                this.$refs.naiveModal.$refs.message.createMessage('Ячейки пусты');
                emptyMessageFlag = true;
              }else if (this.$data.cellFocused.length == 1 && !emptyMessageFlag){
                this.$refs.naiveModal.$refs.message.createMessage('Ячейка пуста');
              }
            }else{
              this.$refs.naiveModal.$refs.promtModal.title = `Перезаписать: ${objName}`;
              this.$refs.naiveModal.$refs.promtModal.content = 'Некоторые ячейки содержат объекты. Перезаписать?';
              this.$refs.naiveModal.$refs.promtModal.positiveText = 'Вручную';
              this.$refs.naiveModal.$refs.promtModal.negativeText = 'Авто';
              this.$refs.naiveModal.$refs.promtModal.showInput = false;
              this.$refs.naiveModal.$refs.promtModal.bufferElem = {cell: elem, type: params.type, objName: objName};
              setTimeout(() => this.$refs.naiveModal.$refs.promtModal.showModal = true, 100);
            }
            if (params.action == 'Удалить'){
              this.addElement({cell: elem, type: params.type, objName: objName});
            }
          }
        });
      }catch (e) {
       console.log(`Err: ${e.event}`);
      }
    },
    addElement(params){
      if (params.data.action === 'Удалить' || params.data.action === 'Авто' ){
        let tempArr = this.$data.cellFocused.slice(0);
        tempArr.forEach(elem => {
          elem.data.data.insertObj = params.data.data.type;
          elem.data.data.cellBgColor = '';
          elem.data.data.cellFocusAnima = false;
          if (params.data.action === 'Авто'){
            elem.data.data.userName = `${params.data.data.objName}_${elem.data.data.gridCol}Y/${elem.data.data.gridRow}X`;
            if (elem.data.data.userName.length > 16){
              let firstStr = elem.data.data.userName.slice(0, 16);
              let afterSlash = /[_].*/gi;
              let secStr = elem.data.data.userName.match(afterSlash);
              let nameStr = firstStr.slice(0, firstStr.length - secStr[0].length) + secStr;
              elem.data.data.userName = nameStr;
            }
          }else if(params.data.action === 'Удалить') {
            elem.data.data.userName = ``;
          }
          this.cellFocus({data: elem.data, focused: false});
          let targetRows = [];
          let heightArr = [];
          nextTick(() => {
            this.$refs.cell.map((item)=> {
              if (item.gridRow == elem.data.data.gridRow){
                heightArr.push(item.$el.getBoundingClientRect().height);
                targetRows.push(item.$data);
              }
            });
            let maxRowHeight = Math.max.apply(null, heightArr);
            if (elem.data.el.getBoundingClientRect().height > maxRowHeight){
              targetRows.forEach(item => {
                item.newHeight = elem.data.el.getBoundingClientRect().height + 'px';
              });
            }else if (elem.data.el.getBoundingClientRect().height < maxRowHeight){
              targetRows.forEach(item => {
                item.newHeight = maxRowHeight + 'px';
              });
            }else if (elem.data.el.getBoundingClientRect().height == maxRowHeight){
              targetRows.forEach(item => {
                // if (item.newHeight === ''){
                  let type = params.data.data.type;
                  if (type === 'barChartHor' || type === 'barChartVert' || type === 'bubbleChart' || type === 'doughnutChart'
                      || type === 'groupedBarChart' || type === 'lineChart' || type === 'mixBarChart'
                      || type === 'pieChart' || type === 'radarChart' || type === 'sectorChart'){
                    // item.newHeight = maxRowHeight + 150 + 'px';
                    item.newHeight = maxRowHeight + 'px';
                  }else{
                    item.newHeight = maxRowHeight + 'px';
                  }
                // }
              });
            }
          })
        });
      }else{
        let elem = params.data.data.cell;
        elem.data.data.insertObj = params.data.data.type;
        elem.data.data.cellBgColor = '';
        elem.data.data.cellFocusAnima = false;
        elem.data.data.userName = params.data.userName;
        elem.data.data.cellName = params.data.data.objName;
        let targetCell = this.$refs.cell.find(item => item.$data.uid == elem.data.data.uid);
        if (typeof targetCell.$refs.avatarGroup !== 'undefined' && targetCell.$refs.avatarGroup !== null){
          targetCell.$refs.avatarGroup.value = params.data.userName;
        }
        this.cellFocus({data: elem.data, focused: false});
        let targetRows = [];
        let heightArr = [];
        nextTick(() => {
          this.$refs.cell.map((item)=> {
            if (item.gridRow == elem.data.data.gridRow){
              heightArr.push(item.$el.getBoundingClientRect().height);
              targetRows.push(item.$data);
            }
          });
          let maxRowHeight = Math.max.apply(null, heightArr);
          if (elem.data.el.getBoundingClientRect().height > maxRowHeight){
            targetRows.forEach(item => {
              item.newHeight = elem.data.el.getBoundingClientRect().height + 'px';
            });
          }else if (elem.data.el.getBoundingClientRect().height < maxRowHeight){
            targetRows.forEach(item => {
              item.newHeight = maxRowHeight + 'px';
            });
          }else if (elem.data.el.getBoundingClientRect().height == maxRowHeight){
            targetRows.forEach(item => {
              // if (item.newHeight === ''){
                let type = params.data.data.type;
                if (type === 'barChartHor' || type === 'barChartVert' || type === 'bubbleChart' || type === 'doughnutChart'
                    || type === 'groupedBarChart' || type === 'lineChart' || type === 'mixBarChart'
                    || type === 'pieChart' || type === 'radarChart' || type === 'sectorChart'){
                  // item.newHeight = maxRowHeight + 150 + 'px';
                  item.newHeight = maxRowHeight + 'px';
                }else{
                  item.newHeight = maxRowHeight + 'px';
                }
              // }
            });
          }
        })
        if (this.$data.cellFocused.length != 0) this.insertChart({data: params.data.data, type: params.data.data.type, action: params.data.action});
      }
    },
    promtModalAction(params){
      try {
        let tempArr = this.$data.cellFocused.slice(0);
        let elem = tempArr[tempArr.length - 1];
          this.$refs.naiveModal.$refs.promtModal.showInput = true;
          this.$refs.naiveModal.$refs.promtModal.title = `Создать: ${params.data.data.objName}`;
          this.$refs.naiveModal.$refs.promtModal.content = 'Введите имя ячейки';
          this.$refs.naiveModal.$refs.promtModal.negativeText = 'Отмена';
          this.$refs.naiveModal.$refs.promtModal.positiveText = 'Принять';
          this.$refs.naiveModal.$refs.promtModal.bufferElem = {cell: elem, type: params.data.data.type, params: params.data, actionFirst: params.data.actionFirst};
          setTimeout(() => this.$refs.naiveModal.$refs.promtModal.showModal = true, 300);
      }
     catch (e) {
       console.log(`Err: ${e.event}`);
     }
    },
    changeFormName(params){
      hranitel.addMemento(creator.save(params.data.formName));
      this.$refs.naiveModal.$refs.promtModal.title = `Имя Формы`;
      this.$refs.naiveModal.$refs.promtModal.content = 'Введите название:';
      this.$refs.naiveModal.$refs.promtModal.negativeText = 'Отмена';
      this.$refs.naiveModal.$refs.promtModal.positiveText = 'Принять';
      this.$refs.naiveModal.$refs.promtModal.showInput = true;
      setTimeout(() => this.$refs.naiveModal.$refs.promtModal.showModal = true, 300);
      this.$refs.naiveModal.$refs.promtModal.bufferElem = {type: params.type, elem: params};
    }
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
    top: 0px;
    left: 0px;
    z-index: 2;
  }
  .format-bar{
    visibility: hidden;
    display: grid;
    position: sticky;
    width: 100%;
    /*justify-content: start;*/
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
    width: 32px;
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Standard syntax */
  }
  .resize-row-bar{
    z-index: 1;
    position: relative;
    width: 32px;
  }
  .column-bar{
    display: grid;
    position: sticky;
    height: fit-content;
    width: fit-content;
    top: 112px;
    z-index: 1;
    grid-row: 2;
    justify-content: start;
    padding-left: 31px;
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Standard syntax */
  }
  .column-resize-container{
    position: absolute;
    background-color: transparent;
    top: 112px;
    left: 31px;
    z-index: 1;
    height: 20px;
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Standard syntax */
  }
  .resize-column-bar{
    z-index: 1;
    position: relative;
    height: 20.5px;
  }

</style>

