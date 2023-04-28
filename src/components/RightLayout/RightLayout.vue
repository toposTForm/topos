
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
          :show-collapsed-content="true"
          :collapsed-width="72"
          :show-trigger="false"
          :collapsed="isCollapsed"
          :on-after-enter="() => hideCollapsed()"
          :width="240"
          :native-scrollbar="false"
          style="max-height: 1000px; "
      >
        <div class="collapsed-layout-container" >
          <div class="components-container main" >
              <div class="wrapper">
                <div class="text-menu-container">
                  <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                    <template #trigger>
                      <div class="text-menu-image"></div>
                    </template>
                    <div>Параметры</div>
                  </n-tooltip>
                </div>
                <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-image"></div>
                  </template>
                  <div>Текстовый редактор</div>
                </n-tooltip>
              </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image table"></div>
                </template>
                <div>Таблица</div>
              </n-tooltip>
            </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image topos-obj"></div>
                </template>
                <div>Топос-объект</div>
              </n-tooltip>
            </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image linear-graph"></div>
                </template>
                <div>Линейный график</div>
              </n-tooltip>
            </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image bar-chart-hor"></div>
                </template>
                <div>Гистограмма гориз.</div>
              </n-tooltip>
            </div>
            <div class="wrapper">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image bar-chart-vert"></div>
                </template>
                <div>Гистограмма верт.</div>
              </n-tooltip>
            </div>
            <div class="wrapper poor-resolution">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image mix-bar-chart"></div>
                </template>
                <div>Составной график</div>
              </n-tooltip>
            </div>
            <div class="wrapper poor-resolution">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image pie-chart"></div>
                </template>
                <div>Секторная диаграмма</div>
              </n-tooltip>
            </div>
            <div class="wrapper poor-resolution middle-resolution">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image bubble-chart"></div>
                </template>
                <div>Пузырьковая диаграмма</div>
              </n-tooltip>
            </div>
            <div class="wrapper poor-resolution middle-resolution">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image radar-chart"></div>
                </template>
                <div>Диаграмма направленности</div>
              </n-tooltip>
            </div>
            <div class="wrapper poor-resolution middle-resolution">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image sector-chart"></div>
                </template>
                <div>Секторная диаграмма</div>
              </n-tooltip>
            </div>
            <div class="wrapper poor-resolution middle-resolution hight-resolution">
              <div class="text-menu-container">
                <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-menu-image"></div>
                  </template>
                  <div>Параметры</div>
                </n-tooltip>
              </div>
              <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image doughnut-chart"></div>
                </template>
                <div>Кольцевая диаграмма</div>
              </n-tooltip>
            </div>
          </div>
          <div class="components-container empty"></div>
          <div class="components-container second">
            <div class="wrapper" style="align-content: center; height: 40px">
              <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image" style="background-image: none; display: grid; justify-content: center; align-content: center">
                    <div class="form-menu"></div>
                  </div>
                </template>
                <div>Управление</div>
              </n-tooltip>
            </div>
            <div class="wrapper" style="align-content: center; height: 40px">
              <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                <template #trigger>
                  <div class="text-image expand-menu" @click="expandMenu(this)"></div>
                </template>
                <div>Развернуть</div>
              </n-tooltip>
            </div>
          </div>
        </div>
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script>
import { NCard, NLayout, NLayoutSider, NSpace, NTooltip } from 'naive-ui';
import { ref } from 'vue';

export default {
  name: "RightLayout",
  components:{
    NCard,
    NLayout,
    NLayoutSider,
    NSpace,
    NTooltip
  },
  data(){
    return{

    }
  },
  setup(){
    return{
      isCollapsed: ref(true),
      expandMenu(){
        if(this.isCollapsed){
          this.isCollapsed = false;
        }else{
          this.isCollapsed = true;
        }
      },
      hideCollapsed(arg){
        let bla = 0;
      }
    }
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
    justify-self: center;
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
    background-repeat: no-repeat;
    width: 5px;
    height: 16px;
    background-image: url("./AvatarIcons/form-menu-icon.svg");
  }
  .expand-menu{
    width: 20px;
    height: 20px;
    background-image: url("./AvatarIcons/expand-menu-icon.svg");
  }
  .topos-obj{
    width: 20px;
    background-image: url("./AvatarIcons/insert-object-icon.png");
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
  @media only screen and (max-height: 900px) {
    .hight-resolution{
      display: none;
    }
  }
</style>