
<template>

  <n-space vertical size="large">
    <n-layout has-sider sider-placement="right"
        style="
          border-width: 1px 0px 0px 1px;
          border-style: solid;
          border-color: #F0F2F7;
          text-align: center;
          justify-content: center;
          display: grid;
          box-shadow: 0px 12px 10px -2px rgba(44, 75, 99, 0.14);
          border-radius: 16px 0px 0px 0px;">
      <n-layout style="max-height: 1000px; min-height: 300px; min-width: 0px; " />
      <n-layout-sider

          position="static"
          collapse-mode="width"
          :default-collapsed="true"
          :show-collapsed-content="false"
          :collapsed-width="72"
          :width="240"
          :native-scrollbar="false"
          style="max-height: 1000px; "
      >
        <div class="collapsed-layout-container">
          <div class="components-container main">
            <div class="wrapper">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image"></div>
            </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image table"></div>
            </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image linear-graph"></div>
            </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image bar-chart-hor"></div>
            </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image bar-chart-vert"></div>
            </div>
            <div class="wrapper poor-resolution ">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image mix-bar-chart"></div>
            </div>
            <div class="wrapper poor-resolution">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image pie-chart"></div>
            </div>
            <div class="wrapper poor-resolution middle-resolution">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image bubble-chart"></div>
            </div>
            <div class="wrapper poor-resolution">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image radar-chart"></div>
            </div>
            <div class="wrapper poor-resolution middle-resolution">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image sector-chart"></div>
            </div>
            <div class="wrapper poor-resolution middle-resolution">
              <div class="text-menu-container">
                <div class="text-menu-image"></div>
              </div>
              <div class="text-image doughnut-chart"></div>
            </div>
          </div>
          <div class="components-container empty"></div>
          <div class="components-container second">
            <div class="wrapper" style="align-content: center; height: 40px">
              <div class="text-image" style="background-image: none; display: grid; justify-content: center; align-content: center">
                <div class="form-menu"></div>
              </div>
            </div>
            <div class="wrapper" style="align-content: center; height: 40px">
              <div class="text-image expand-menu"></div>
            </div>
          </div>
        </div>
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script>
import { h, defineComponent, Component } from "vue";
import { NCard, NLayout, NLayoutSider, NSpace } from 'naive-ui'
export default {
  name: "RightLayout",
  components:{
    NCard,
    NLayout,
    NLayoutSider,
    NSpace
  }
}
</script>

<style scoped>
  .collapsed-layout-container{
    display: grid;
    width: 72px;
    padding: 16px 0px;
  }
  .components-container{
    display: grid;
    width: 40px;
    grid-row-gap: 8px;
    /*justify-content: center;*/
    justify-self: center;
    /*padding-right: 6px;*/
  }
  .empty{
    grid-row: 2;
    height: 50px;
  }
  .second{
    justify-content: center;
    width: 71px;
    height: 120px;
    grid-row: 3;
    padding-top: 16px;
    padding-bottom: 16px;
    border-top: 1px solid #F0F2F7;
    box-shadow: 4px 0px 4px rgba(44, 75, 99, 0.1);
  }
  .wrapper{
    display: grid;
    background-color: #FAFAFA;
    border: 1px solid #EEF0F2;
    border-radius: 8px;
    width: 40px;
    height: 51px;
    align-content: space-evenly;
  }
  .wrapper:hover .form-menu{

  }
  .text-menu-container{
    display: grid;
    justify-self: center;
    grid-row: 1;
    width: 24px;
    align-self: center;
    justify-content: center;
    align-content: center;
  }
  .text-menu-image{
    background-image: url("./AvatarIcons/Vector.svg");
    background-repeat: no-repeat;
    width: 14px;
    height: 7px;
    opacity: 0.4;
    cursor: url("./AvatarIcons/cursor-pointer-icon.svg") 0 0, pointer;
  }
  .text-menu-image:hover{
    opacity: 1;
    transform: scale(1.4, 1.4);
    transition-duration: 200ms;
  }
  .text-image{
    background-size: contain;
    grid-row: 2;
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    justify-self: center;
    background-image: url("./AvatarIcons/text-icon.svg");
  }
  .text-image:hover{
    opacity: 1;
    transform: scale(1.3, 1.3);
    transition-duration: 200ms;
    cursor: url("./AvatarIcons/cursor-pointer-icon.svg") 0 0, pointer;
  }
  .table{
    width: 20px;
    background-image: url("./AvatarIcons/table-icon.svg");
  }
  .linear-graph{
    background-image: url("./AvatarIcons/chart-icon.svg");
  }
  .bar-chart-hor{
    width: 20px;
    background-image: url("./AvatarIcons/bar-chart-vert-icon.svg");
  }
  .bar-chart-vert{
    width: 20px;
    background-image: url("./AvatarIcons/bar-chart-hor-icon.svg");
  }
  .mix-bar-chart{
    width: 20px;
    background-image: url("./AvatarIcons/mix-bar-chart-icon.png");
  }
  .pie-chart{
    width: 24px;
    background-image: url("./AvatarIcons/pie-chart-icon.svg");
  }
  .bubble-chart{
    width: 24px;
    background-image: url("./AvatarIcons/bubble-chart-icon.svg");
  }
  .radar-chart{
    width: 20px;
    background-image: url("./AvatarIcons/radar-chart-icon.png");
  }
  .sector-chart{
    width: 20px;
    background-image: url("./AvatarIcons/sector-chart-icon.png");
  }
  .doughnut-chart{
    width: 20px;
    background-image: url("./AvatarIcons/doughnut-chart-icon.png");
  }
  .form-menu{
    /*width: 6px;*/
    grid-area: 1/1;
    background-repeat: no-repeat;
    width: 6px;
    height: 20px;
    background-image: url("./AvatarIcons/form-menu-icon.svg");
  }
  .expand-menu{
    width: 20px;
    background-image: url("./AvatarIcons/expand-menu-icon.svg");
  }
  @media only screen and (max-height: 605px) {
    .poor-resolution{
      display: none;
    }
  }
  @media only screen and (max-height: 800px) {
    .middle-resolution{
      display: none;
    }
  }
</style>