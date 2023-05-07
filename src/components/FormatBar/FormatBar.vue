<template>
  <div class="main-container">
    <div class="header-container">
      <div class="logo-container">
        <div class="logo"></div>
        <div class="docname-wrapper">
          <div class="new-form-text">Имя формы {{ formName }}</div>
          <div class="saved-text">Последнее изменение {{ dateTime }}</div>
          <div style="display: grid; grid-row: 1/3; grid-column: 2; align-content: center;">
            <div @click="changeName" class="pen-icon"></div>
          </div>
        </div>
      </div>
      <div class="actions-container">
        <div class="actions-button-container">
          <div class="button-icon"></div>
          <div class="button-text">Выбрать</div>
        </div>
        <div class="inf-button-container">
          <div class="icon-wrapper">
            <div class="inf-button"></div>
          </div>
          <div class="icon-wrapper">
            <div class="inf-button link"></div>
          </div>
        </div>
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
      dateTime: new Date().toLocaleDateString() + ' / ' +  new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
    }
  },
  computed: mapGetters(["getSelectedText"]),
  methods: {
    ...mapActions(['selectedText']),
    changeName(){
      this.$emit('changeFormName', {
        data: this.$data,
        type: 'changeFormName'
      })
    }
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
    justify-self: center;
    /*justify-content: center;*/
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
  }
  .actions-button-container{
    display: grid;
    background: #0000FE;
    border-radius: 5px;
    justify-content: center;
    align-content: center;
    padding: 0px 16px 0px 8px;
    gap: 6px;
    width: 110px;
    height: 32px;
    grid-column: 2;
    grid-row: 1;
  }
  .actions-button-container:hover {
    cursor: url("./cursor-pointer-icon.svg") 0 0, pointer;
    opacity: 0.7;
    transition-duration: 200ms;
  }
  .actions-button-container:hover .button-icon{
    opacity: 1;
    transform: scale(1.3, 1.3);
    transition-duration: 200ms;
  }
  .button-icon{
    align-self: center;
    margin-bottom: 2px;
    grid-column: 1;
    grid-row: 1;
    width: 16px;
    height: 16px;
    background-image: url("./icon-document-pending.svg");
    background-size: cover;
  }
  .button-text{
    align-self: center;
    grid-column: 2;
    grid-row: 1;
    font-family: 'Golos Text Regular';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 32px;
    display: flex;
    color: #FFFFFF;
  }
  .inf-button-container{
    display: grid;
    grid-column: 1;
    grid-row: 1;
    gap: 16px;
    grid-auto-flow: column;
  }
  .icon-wrapper{
    display: grid;
    justify-content: center;
    align-content: center;
    width: 32px;
    height: 32px;
    background: #F9F9F9;
    border: 1px solid #DDDEDF;
    border-radius: 5px;
    cursor: url("./cursor-pointer-icon.svg") 0 0, pointer;
  }
  .inf-button{
    background-size: contain;
    background-repeat: no-repeat;
    width: 18px;
    height: 18px;
    background-image: url("./icon-info.svg");
  }
 .link{
   background-size: contain;
   background-repeat: no-repeat;
   width: 18px;
   height: 18px;
   background-image: url("./link-icon.svg");
 }
  .icon-wrapper:hover .inf-button{
    transform: scale(1.15, 1.15);
    transition-duration: 200ms;
  }
</style>