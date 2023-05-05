<template>
  <div class="main-container">
    <div class="header-container">
      <div class="logo-container">
        <div class="logo"></div>
        <div class="docname-wrapper">
          <div class="new-form-text">Сохранён {{ formName }}</div>
          <div class="saved-text">дата {{ dateTime }}</div>
          <div style="display: grid; grid-row: 1/3; grid-column: 2; align-content: center;"><div class="pen-icon"></div></div>
        </div>
      </div>
      <div class="actions-container">
        <div class="actions-button-container"></div>
        <div class="inf-button"></div>
      </div>
    </div>
    <div class="sub-panel-container"></div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
export default {
  name: "FormatBar",
  props: ['cellListuid',],
  data(){
    return{
      formName: '',
      dateTime: '',
    }
  },
  computed: mapGetters(["getSelectedText"]),
  methods: {
    ...mapActions(['selectedText']),

  },
  watch: {

  }
}
</script>

<style scoped>
  .main-container{
    display: grid;
    grid-template-rows: repeat(2, 56px);
    background-color: transparent;
  }
  .header-container{
    display: grid;
    background: #FFFFFF;
    border-bottom: 1px solid #F0F2F7;
    box-shadow: 0px 4px 12px #EDF5F9;
    align-content: center;
    padding-right: 31px;
  }
  .sub-panel-container{
    background: #FAFBFC;
  }
  .logo-container{
    display: grid;
    padding-left: 31px;
    justify-self: start;
    grid-column-gap: 16px;
  }
  .logo{
    width: 32px;
    height: 32px;
    grid-row: 1/2;
    align-self: center;
    background-image: url("./topos-logo-icon.svg");
    background-size: cover;
  }
  .docname-wrapper{
    display: grid;
    grid-row: 1/2;
    grid-column-gap: 5px;
  }
  .new-form-text{
    font-family: 'Golos Text Bold';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #272838;
    align-self: end;
  }
  .saved-text{
    font-family: 'Golos Text Bold';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    color: #8082AA;
    align-self: start;
  }
  .pen-icon{
    width: 11.93px;
    height: 12px;
    background-image: url("./pen-icon.svg");
    background-size: cover;
  }
  .pen-icon:hover{
    opacity: 1;
    transform: scale(1.3, 1.3);
    transition-duration: 200ms;
    cursor: url("./cursor-pointer-icon.svg") 0 0, pointer;
  }
  .actions-container{
    grid-row: 1;
    grid-column: 2;
    min-height: 30px;
    min-width: 30px;
    display: grid;
    justify-self: end;
    grid-column-gap: 16px;
    background-color: red;
  }
  .actions-button-container{

  }
</style>