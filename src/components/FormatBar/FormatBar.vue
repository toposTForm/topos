<template>
  <div class="main-container">
    <div class="logo-container">
      <div class="logo-container__icon"></div>
    </div>
    <div class="font-container">
      <div class="font-container__label">
        <div class="label-font">Активный элемент</div>
      </div>
      <div class="quill-edit"></div>
<!--      <div @click="setBold({name: name, data: this.$data, el: this.$el, event: $event})" class="font-container__bold">B</div>-->
<!--      <div class="font-container__italic">&nbspI&nbsp</div>-->
<!--      <div class="font-container__u">U</div>-->
<!--      <div class="font-container__font-list">-->
<!--        <select class="font-list">-->
<!--          <option value="font-name_1">Open Sans</option>-->
<!--          <option value="font-name_2" selected>Rowdies</option>-->
<!--          <option value="font-name_3">Lato</option>-->
<!--          <option value="font-name_4">Poppins</option>-->
<!--          <option value="font-name_4">Poppinfffffffffffffffffffffs</option>-->
<!--        </select>-->
<!--      </div>-->
<!--      <div class="font-container__font-format">-->
<!--        <div class="font-size-container">-->
<!--          <input class="font-size" type="number" min="3" max="36" name="font-size-input" v-model="fontSizeInput">-->
<!--          <label class="font-size-input-label" for="font-size-input" >px</label>-->
<!--        </div>-->
<!--        <div class="font-container__color">-->
<!--          <div class="font-color" title="цвет текста">A</div>-->
<!--          <div class="cell-fill" title="заливка"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <select class="color-list">-->
<!--        <option value="font-name_1">Open Sans</option>-->
<!--        <option value="font-name_2" selected>Rowdies</option>-->
<!--        <option value="font-name_3">Lato</option>-->
<!--        <option value="font-name_4">Poppins</option>-->
<!--      </select>-->
    </div>
    <div class="alignment-container">
      <div class="font-container__label">
        <div class="label-font">Ячейка</div>
      </div>
      <div class="border-list">
        <div class="border-list__all"></div>
        <div class="border-list__left"></div>
        <div class="border-list__right"></div>
        <div class="border-list__top"></div>
        <div class="border-list__bottom"></div>
      </div>
      <div class="justify-container">
        <div class="justify-container__start" title="по левому краю"></div>
        <div class="justify-container__center" title="по центру"></div>
        <div class="justify-container__end" title="по правому краю"></div>
      </div>
    </div>
    <div class="insert-container">
      <div class="font-container__label">
        <div class="label-font">Вставка</div>
      </div>
      <div class="row-two">
        <div v-if="cellSelected" class="insert-graph" title="добавить график"
             @mouseenter="showGraphMenu(true)">
        </div>
        <div v-else class="insert-graph grayed" title="добавить график"></div>
        <div v-if="cellSelected" class="insert-obj" title="добавить топос-объект" :style="{pointEvents: `${insertContainer.displayOtherButtons}`}"></div>
        <div v-else class="insert-obj grayed" ></div>
        <div v-if="cellSelected" class="insert-picture" title="добавить картинку" :style="{pointEvents: `${insertContainer.displayOtherButtons}`}"></div>
        <div v-else class="insert-picture grayed"></div>
      </div>
      <div class="row-three">
        <div v-if="cellSelected" @click="insertChart('quillEditor')" class="insert-text" title="добавить текст" :style="{pointEvents: `${insertContainer.displayOtherButtons}`}"></div>
        <div v-else class="insert-text grayed"></div>
        <div v-if="cellSelected" @click="insertChart('handsonTable')" class="insert-table" :style="{pointEvents: `${insertContainer.displayOtherButtons}`}" title="добавить таблицу"></div>
        <div v-else class="insert-table grayed"></div>
      </div>
      <div v-if="insertContainer.showGraphMenu" class="graph-dropdown-menu"
        @mouseleave="showGraphMenu(false)" @mouseenter="showGraphMenu(true)">
        <div @click="insertChart('lineChart')" class="graph-dropdown-menu__item line-chart" title="линейный график"></div>
        <div @click="insertChart('barChartHor')" class="graph-dropdown-menu__item bar-chart-hor" title="гистограмма горизонтальная"></div>
        <div @click="insertChart('barChartVert')" class="graph-dropdown-menu__item bar-chart-vert" title="гистограмма вертикальаня"></div>
        <div @click="insertChart('groupedBarChart')" class="graph-dropdown-menu__item grouped-bar-chart" title="гистограмма групповая"></div>
        <div @click="insertChart('pieChart')" class="graph-dropdown-menu__item pie-chart" title="круговая диаграмма"></div>
        <div @click="insertChart('radarChart')" class="graph-dropdown-menu__item radar-chart" title="диаграмма направленности"></div>
        <div @click="insertChart('sectorChart')" class="graph-dropdown-menu__item sector-chart" title="секторная диаграмма"></div>
        <div @click="insertChart('doughnutChart')" class="graph-dropdown-menu__item doughnut-chart" title="кольцевая диаграмма"></div>
        <div @click="insertChart('mixBarChart')" class="graph-dropdown-menu__item mix-bar-chart" title="смешанная диаграмма"></div>
        <div @click="insertChart('bubbleChart')" class="graph-dropdown-menu__item bubble-chart" title="пузырьковая диаграмма"></div>
      </div>
    </div>
    <div class="data-container">
      <div class="font-container__label">
        <div class="label-font">Данные</div>
      </div>
      <div class="row-two">
        <div class="tab">
          <button class="confirm button">Операции</button>
          <div class="dropdown operations">
            <a class="dropdown-item" href="#">Операция 1</a>
            <a class="dropdown-item" href="#">Операция 2</a>
            <a class="dropdown-item" href="#">Операция 3</a>
         </div>
        </div>
        <div class="tab">
          <button class="confirm button">Функции</button>
          <div class="dropdown operations">
            <a class="dropdown-item" href="#">Функия 1</a>
            <a class="dropdown-item" href="#">Функия 2</a>
            <a class="dropdown-item" href="#">Функия 3</a>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm-container">
      <div class="font-container__label">
        <div class="label-font">Форма</div>
      </div>
      <div class="row-two">
        <div class="tab">
          <input type="button" value="Выполнить" class="confirm button">
        </div>
        <div class="tab">
          <input type="button" value="Сохранить" class="confirm button">
        </div>
        <div class="tab">
          <input type="button" value="Экспорт" class="confirm button">
        </div>
        <div class="tab">
          <input type="button" value="Очистить" class="confirm button">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
export default {
  name: "FormatBar",
  props: ['cellListuid',],
  data(){
    return{
      fontContainer: {
        fontName: 'Arial',
        fontSize: '14px',
        fontWeight: '',
        fontStyle: '',
        fontEmphasis: '',
        fontColor: 'black',
        fontFill: 'none',
      },
      borderContainer: {
        borderLeft: {
          thick: '3px',
          thin: '1px',
          active: false,
        },
        borderRight: {
          thick: '3px',
          thin: '1px',
          active: false,
        },
        borderTop: {
          thick: '3px',
          thin: '1px',
          active: false,
        },
        borderBottom: {
          thick: '3px',
          thin: '1px',
          active: false,
        },
      },
      insertContainer: {
        showGraphMenu: false,
        displayOtherButtons: 'auto'
      },
      cellSelected: false,
      fontSizeInput: '12',
    }
  },
  computed: mapGetters(["getSelectedText"]),
  methods: {
    ...mapActions(['selectedText']),
    showGraphMenu(param){
      if (param){
        this.$data.insertContainer.displayOtherButtons = 'none';
      }else{
        this.$data.insertContainer.displayOtherButtons = 'auto';
      }
      setTimeout(()=> this.$data.insertContainer.showGraphMenu = param, 100)
    },
    insertChart(param){
      this.$emit('insertChart', {
        data: this.$data,
        type: param
      })
    },
  },
  watch: {
    fontSizeInput(input){
      if (input.toString().length <= 2){
        if (input <= 36){
          this.$data.fontContainer.fontSize = input;
          this.$data.fontSizeInput = input;
        }else{
          this.$data.fontContainer.fontSize = 36;
          this.$data.fontSizeInput = 36;
        }
      }else{
        this.$data.fontSizeInput = input.toString().slice(0, 2);
      }
    }
  }
}
</script>

<style scoped>
  .main-container{
    display: grid;
    grid-template-columns: repeat(5, fit-content(10px));
    grid-column-gap: 1em;
    background-color: black;
    font-size: 14px;
    transition-duration: 100ms;
  }
  .logo-container{
    display: grid;
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
  }
  .logo-container__icon{
    justify-self: center;
    align-self: center;
    background-image: url("./form-menu-icon.png");
    background-size: cover;
    background-color: red;
    min-height: 5rem;
    min-width: 5rem;
    height: fit-content;
    opacity: 0.7;
    transition-duration: 200ms;
  }
  .logo-container__icon:hover{
    cursor: pointer;
    transform: scale(1.01);
    opacity: 0.99;
    transition-duration: 100ms;
  }
  .font-container{
    display: grid;
    grid-column: 2;
    grid-row-gap: 5%;
    align-content: start;
    grid-row: 1;
    min-height: 6.5rem;
    width: fit-content;
    height: fit-content;
    background: conic-gradient(from -90deg at bottom center, papayawhip, peachpuff);
    border-radius: 5%;
  }
  .font-container__label{
    display: grid;
    background: conic-gradient(at top right, slategray, white);
    cursor: not-allowed;
    border-radius: 20%;
    grid-column: 1 / 4;
    grid-row: 1;
    border-bottom: 3px solid gray;
  }
  .label-font{
    justify-self: center;
    font-size: 12px;
    opacity: 0.8;
  }
  .quill-edit{
    display: grid;
    justify-self: center;
    min-width: 600px;
    min-height: 103px;
  }
  .font-container__bold{
    display: grid;
    justify-self: center;
    cursor: pointer;
    grid-row: 2;
    grid-column: 1;
    font-weight: bold;
  }
  .font-container__bold:hover{
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.4);
  }
  .font-container__italic{
    display: grid;
    justify-self: center;
    cursor: pointer;
    grid-row: 2;
    grid-column: 2;
    font-style: italic;
  }
  .font-container__italic:hover{
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.4);
  }
  .font-container__u{
    display: grid;
    justify-self: center;
    cursor: pointer;
    grid-row: 2;
    grid-column: 3;
    text-decoration-line: underline;
  }
  .font-container__u:hover{
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.4);
  }
  .font-container__font-list{
    display: grid;
    grid-row: 3;
    grid-column: 1 / 4;

    cursor: pointer;
    padding-right: 2px;
    padding-left: 2px;
  }
  .font-list{
    color: darkgray;
  }
  .font-list:hover{
    transition-duration: 100ms;
    background-color: white;
    color: black;
  }
  .font-container__font-format{
    display: grid;
    grid-row: 4;
    grid-column: 1 / 4;
    padding-right: 2px;
    padding-left: 2px;
  }
  .font-size-container{
    display: grid;
    grid-column: 1;
    grid-row: 1;
  }
  .font-size{
    grid-column: 1;
    margin-left: 2px;
    width: 2.2em;
  }
  .font-size-input-label{
    grid-column: 1;
    grid-row: 2;
    align-self: center;
    margin-left: 3px;
  }
  .font-container__color{
    display: grid;
    grid-row: 1;
    grid-column: 2 / 4;
    grid-column-gap: 10%;
    align-self: center;
    padding-right: 5px;
    font-size: 1.5em;
  }
  .font-color{
    cursor: pointer;
    color: black;
    font-style: italic;
    font-weight: bold;
    justify-self: center;
  }
  .font-color:hover{
    transition-duration: 100ms;
    background-color: white;
    font-weight: bold;
    transform: scale(1.2);
  }
  .color-list{
    display: none;
    grid-row: 4;
    grid-column: 1 / 4;
  }
  .color-list:hover{

  }
  .cell-fill{
    min-width: 1.1em;
    paddind-right: 5px;
    grid-row: 1;
    grid-column: 2;
    justify-self: center;
    cursor: pointer;
    background: conic-gradient(from -90deg at bottom center, papayawhip, peachpuff);
    background-image: url("./cell-fill-icon.png");
    background-size: cover;
  }
  .cell-fill:hover{
    transition-duration: 100ms;
    background-color: white;
    font-weight: bold;
    transform: scale(1.2);
  }
  .alignment-container{
    display: grid;
    grid-row: 1;
    grid-column: 3;
    grid-row-gap: 5%;
    align-content: start;
    min-height: 6.5rem;
    background: conic-gradient(from -90deg at bottom center, papayawhip, peachpuff);
    border-radius: 5%;
  }
  .border-list{
    display: grid;
    grid-row: 2;
    grid-column: 1 / 4;
    padding-left: 3px;
    padding-right: 3px;
    justify-content: space-evenly;
  }
  .border-list__all{
    display: grid;
    grid-column: 1;
    grid-row: 1;
    background-image: url("./all-border-icon.png");
    transform: rotate(90deg);
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 1.7em;
    min-height: 1.7em;
  }
  .border-list__all:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2) rotate(90deg);
  }
  .border-list__top{
    grid-column: 2;
    grid-row: 1;
    background-image: url("./left-border-icon.png");
    transform: rotate(90deg);
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .border-list__top:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2) rotate(90deg);
  }
  .border-list__right{
    grid-column: 3;
    grid-row: 1;
    background-image: url("./left-border-icon.png");
    transform: rotate(180deg);
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .border-list__right:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2) rotate(180deg);
  }
  .border-list__bottom{
    grid-column: 4;
    grid-row: 1;
    background-image: url("./left-border-icon.png");
    transform: rotate(270deg);
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .border-list__bottom:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2) rotate(-90deg);
  }
  .border-list__left{
    grid-column: 5;
    grid-row: 1;
    background-image: url("./left-border-icon.png");
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .border-list__left:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
  }
  .justify-container{
    display: grid;
    grid-row: 4;
    grid-column: 1 / 4;
    justify-content: space-evenly;
  }
  .justify-container__start{
    grid-column: 1;
    grid-row: 1;
    background-image: url("./align-left-icon.png");
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .justify-container__start:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
  }
  .justify-container__center{
    grid-column: 2;
    grid-row: 1;
    background-image: url("./align-center-icon.png");
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .justify-container__center:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
  }
  .justify-container__end{
    grid-column: 3;
    grid-row: 1;
    background-image: url("./align-right-icon.png");
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .justify-container__end:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
  }
  .insert-container{
    display: grid;
    grid-row: 1;
    grid-column: 4;
    grid-row-gap: 5%;
    align-content: start;
    min-height: 6.5rem;
    background: conic-gradient(from -90deg at bottom center, papayawhip, peachpuff);
    border-radius: 5%;
  }
  .row-two{
    display: grid;
    grid-row: 2;
    grid-column: 1 / 4;
    min-width: 115px;
    justify-content: space-evenly;
  }
  .row-three{
    display: grid;
    grid-row: 3;
    grid-column: 1 / 4;
    min-width: 115px;
    justify-content: space-evenly;
  }
  .insert-graph{
    grid-column: 1;
    grid-row: 1;
    background-image: url("./insert-graph-icon.png");
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .insert-graph:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
  }
  .insert-obj{
    grid-column: 2;
    grid-row: 1;
    background-image: url("./insert-object-icon.png");
    opacity: 0.8;
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .insert-obj:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
    opacity: 0.99;
  }
  .insert-picture{
    grid-column: 3;
    grid-row: 1;
    background-image: url("./insert-picture-icon.png");
    background-size: cover;
    min-width: 1.7em;
    min-height: 1.7em;
    justify-self: start;
  }
  .insert-picture:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
  }
  .insert-text{
    grid-row: 1;
    background-image: url("./text-editor-icon.png");
    background-size: cover;
    min-width: 1.5em;
    min-height: 1.5em;
    justify-self: start;
  }
  .insert-text:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
  }
  .insert-table{
    grid-row: 1;
    background-image: url("./table-grid-icon.png");
    background-size: cover;
    min-width: 1.5em;
    min-height: 1.5em;
    justify-self: start;
  }
  .insert-table:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
  }
  .grayed{
    pointer-events: none;
    opacity: 0.3;
    color: #666666;
  }
  .data-container{
    display: grid;
    grid-row: 1;
    grid-column: 5;
    grid-row-gap: 5%;
    align-content: start;
    min-height: 6.5rem;
    background: conic-gradient(from -90deg at bottom center, papayawhip, peachpuff);
    border-radius: 5%;
  }
  .confirm-container{
    display: grid;
    grid-row: 1;
    grid-column: 6;
    grid-row-gap: 5%;
    align-content: start;
    min-height: 6.5rem;
    background: conic-gradient(from -90deg at bottom center, papayawhip, peachpuff);
    border-radius: 5%;
  }
  .confirm{
    padding-right: 15px;
    padding-left: 15px;
  }
  .tab{
    grid-column: 1;
    grid-row: auto;
  }
  .dropdown{
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  .tab:hover .dropdown{
    display: grid;
  }
  .dropdown-item{

  }
  .dropdown-item:hover{
    font-weight: bold;
    cursor: pointer;
    transition-duration: 200ms;
  }
  .operations a{
    color: black;
    padding: 6px 8px;
    text-decoration: none;
    display: block;
  }
  .button{
    border: 0;
    width: 100%;
    font-size: 1rem;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6), inset -2px -2px 3px rgba(0, 0, 0, 0.6);
    background: linear-gradient(27deg, rgba(2,0,36,1) 0%, rgba(119,115,115,0.9697128851540616) 92%, rgba(0,212,255,1) 100%);
  }
  .button:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background: linear-gradient(27deg, rgba(2,0,36,1) 0%, rgba(119,115,115,0.9697128851540616) 24%, rgba(0,212,255,1) 100%);
    transform: scale(1.1);
    opacity: 0.99;
  }
  .graph-dropdown-menu{
    display: grid;
    position: absolute;
    justify-content: space-between;
    align-content: space-around;
    grid-gap: 6px;
    padding: 5px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background: linear-gradient(27deg, rgba(2,0,36,1) 0%, rgba(119,115,115,0.9697128851540616) 1%, rgba(0,212,255,1) 100%);
    border-bottom-left-radius: 3%;
    border-bottom-right-radius: 3%;
    min-width: 310px;
    min-height: 120px;
    z-index: 1;
    transition-duration: 200ms;
  }
  .graph-dropdown-menu:hover{
    transition-duration: 200ms;
  }
  .graph-dropdown-menu__item{
    height: 50px;
    width: 50px;
    background: conic-gradient(from -90deg at bottom center, papayawhip, peachpuff);
    transition-duration: 200ms;
  }
  .line-chart{
    background-image: url("./line-chart-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .bar-chart-vert{
    background-image: url("./bar-chart-vert-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .bar-chart-hor{
    background-image: url("./bar-chart-hor-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .grouped-bar-chart{
    background-image: url("./grouped-bar-chart-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .pie-chart{
    background-image: url("./pie-chart-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .radar-chart{
    background-image: url("./radar-chart-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .sector-chart{
    background-image: url("./sector-chart-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .doughnut-chart{
    background-image: url("./doughnut-chart-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .mix-bar-chart{
    background-image: url("./mix-bar-chart-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .bubble-chart{
    background-image: url("./bubble-chart-icon.png");
    transition-duration: 200ms;
    background-size: cover;
  }
  .line-chart:hover, .bar-chart-vert:hover, .bar-chart-hor:hover, .mix-bar-chart:hover, .pie-chart:hover, .sector-chart:hover,
  .bubble-chart:hover, .grouped-bar-chart:hover, .doughnut-chart:hover, .radar-chart:hover{
    cursor: pointer;
    transition-duration: 100ms;
    background-color: white;
    transform: scale(1.2);
    opacity: 0.8;
    border-radius: 10%;
  }

</style>