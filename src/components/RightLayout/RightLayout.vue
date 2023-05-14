
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
      <n-layout-sider
          position="static"
          collapse-mode="width"
          :default-collapsed="true"
          :show-collapsed-content="true"
          :collapsed-width="72"
          :show-trigger="false"
          :collapsed="isCollapsed"
          :on-after-enter="() => hideCollapsed()"
          :width="288"
          :native-scrollbar="false"
          style="max-height: 1000px; "
      >
        <div v-if="isCollapsed" class="collapsed-layout-container" >
          <div class="components-container main">
              <div class="wrapper">
                <div class="text-menu-container">
                  <n-tooltip trigger="hover" placement="left-end" :animated="true" :duration="100" :keep-alive-on-hover='false'>
                    <template #trigger>
                      <div class="text-menu-image"></div>
                    </template>
                    <div>Параметры</div>
                  </n-tooltip>
                </div>
                <n-tooltip trigger="hover" placement="left" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                  <template #trigger>
                    <div class="text-image" @click="insertChart('quillEditor')"></div>
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
                  <div class="text-image table" @click="insertChart('handsonTable')"></div>
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
                  <div class="text-image linear-graph" @click="insertChart('lineChart')"></div>
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
                  <div class="text-image bar-chart-hor" @click="insertChart('barChartHor')"></div>
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
                  <div class="text-image bar-chart-vert" @click="insertChart('barChartVert')"></div>
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
                  <div class="text-image mix-bar-chart" @click="insertChart('mixBarChart')"></div>
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
                  <div class="text-image pie-chart" @click="insertChart('pieChart')"></div>
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
                  <div class="text-image bubble-chart" @click="insertChart('bubbleChart')"></div>
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
                  <div class="text-image radar-chart" @click="insertChart('radarChart')"></div>
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
                  <div class="text-image sector-chart" @click="insertChart('sectorChart')"></div>
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
                  <div class="text-image doughnut-chart" @click="insertChart('doughnutChart')"></div>
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
        <div v-if="!isCollapsed" class="expanded-layout-container">
          <div class="tab-container">
            <n-tabs :animated="true" type="line" size="segment" justify-content="space-around"  tab-style=" font-family: Inter;
              font-style: normal;
              font-weight: 700;
              font-size: 14px;
              line-height: 22px;
              height: 28px;
              color: #64748B;
            "
              default-value="components"
              pane-style=""
            >
              <n-tab-pane  name="components" tab="Компоненты">
                <div class="components-container__expanded">
                  <div class="base-components-container">
                    <div class="base-label">Базовые</div>
                    <div class="items-container">
                      <div class="item-wrapper">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image" @click="insertChart('quillEditor')" style="width: 32px; height: 32px"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Текст</div>
                        </div>
                      </div>
                      <div class="item-wrapper">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image table" @click="insertChart('handsonTable')" style="width: 20px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Таблица</div>
                        </div>
                      </div>
                      <div class="item-wrapper">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image topos-obj" style="width: 24px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Топос-объект</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="base-components-container">
                    <div class="base-label">Графики и Диаграммы</div>
                    <div class="items-container">
                      <div class="item-wrapper">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image linear-graph" @click="insertChart('lineChart')" style="width: 32px; height: 32px"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Линейный</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 1">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image bar-chart-vert" @click="insertChart('barChartVert')" style="width: 26px; height: 24px"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Гистограмма В.</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 1">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image bar-chart-hor" @click="insertChart('barChartHor')" style="width: 24px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Гистограмма Г.</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 2; grid-column: 1;">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image pie-chart" @click="insertChart('pieChart')" style="width: 28px; height: 28px"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Круговая</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 2; grid-column: 2">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image bubble-chart" @click="insertChart('bubbleChart')" style="width: 28px; height: 28px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Пузырьковая</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 2;">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image mix-bar-chart" @click="insertChart('mixBarChart')" style="width: 28px; height: 28px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Смешанная</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 3; grid-column: 1">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image sector-chart" @click="insertChart('sectorChart')" style="width: 28px; height: 28px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Секторная</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 3; grid-column: 2">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image radar-chart" @click="insertChart('radarChart')" style="width: 28px; height: 28px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Направленности</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image doughnut-chart" @click="insertChart('doughnutChart')" style="width: 28px; height: 28px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Кольцевая</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="base-components-container">
                    <div class="base-label">Индикаторы</div>
                    <div class="items-container">
                      <div class="item-wrapper">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image gauge-arrow" @click="insertChart('gaugeChart')" style="width: 32px; height: 32px"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label ">Стрелочный</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 1">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image gauge-digital" style="width: 24px"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Цифровой</div>
                        </div>
                      </div>
                      <div class="item-wrapper" style="grid-row: 1">
                        <div class="item-menu-wrapper">
                          <div class="text-menu-image" style="margin-top: 9px; scale: 120%"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="text-image gauge-progress" style="width: 24px;"></div>
                        </div>
                        <div class="image-wrapper">
                          <div class="item-label">Прогрессия</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="footer-container">
                    <div class="items-container">
                      <div class="minimize-wrapper">
                        <div class="minimize-text" style="">Уменьшить</div>
                        <div @click="expandMenu" class="expand-menu" style="grid-row: 1; grid-column: 1/3; align-self: center;
                         justify-self: end; padding-right: 8px; height: 16px; width: 24px;"></div>
                      </div>
                      <div class="wrapper" style="align-content: center; height: 32px; width: 32px;">
                        <n-tooltip trigger="hover" placement="top" :animated="true" :duration="100" :keep-alive-on-hover='false' >
                          <template #trigger>
                            <div class="text-image" style="background-image: none; display: grid; justify-content: center; align-content: center">
                              <div class="form-menu"></div>
                            </div>
                          </template>
                          <div>Управление</div>
                        </n-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </n-tab-pane>
              <n-tab-pane name="cells" tab="Ячейки" style="">
                Ячейки
              </n-tab-pane>
              <n-tab-pane name="form" tab="Форма">
                Форма
              </n-tab-pane>
            </n-tabs>
          </div>
        </div>
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script>
import { NCard, NLayout, NLayoutSider, NSpace, NTooltip, NTabs, NTabPane } from 'naive-ui';
import { ref } from 'vue';

export default {
  name: "RightLayout",
  components:{
    NCard,
    NLayout,
    NLayoutSider,
    NSpace,
    NTooltip,
    NTabs,
    NTabPane,
  },
  setup(_, {emit}){
    return{
      isCollapsed: ref(true),
      cellSelected: ref(false),
      expandMenu(){
        if(this.isCollapsed){
          this.isCollapsed = false;
        }else{
          let nTabsBar = document.querySelector('.n-tabs-bar');
          nTabsBar.style.backgroundColor = '#F0E5FF';
          nTabsBar.style.border = '1px solid #E1CCFF';
          nTabsBar.style.borderRadius = '50px';
          this.isCollapsed = true;
        }
      },
      hideCollapsed(arg){
        let nTabsBar = document.querySelector('.n-tabs-bar');
        nTabsBar.style.backgroundColor = '#F0E5FF';
        nTabsBar.style.border = '1px solid #E1CCFF';
        nTabsBar.style.borderRadius = '50px';
      },
      insertChart(param){
        emit('insertChart', {
          data: this.$data,
          type: param
        })
      },
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
  .collapsed-layout-container{
    display: grid;
    width: 72px;
    padding: 16px 0px;
  }
  .expanded-layout-container{
    display: grid;
    min-width: 288px;
    min-height: 400px;
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    border-color: #F0F2F7;
    box-shadow: 0px 12px 10px -2px rgba(44, 75, 99, 0.14);
    border-radius: 16px 0px 0px 0px;
  }
  .components-container{
    display: grid;
    width: 40px;
    grid-row-gap: 8px;
    justify-self: center;
  }
  .components-container__expanded{
    display: grid;
    padding-top: 16px;
    gap: 16px;
    align-self: stretch;
  }
  .base-components-container{
    display: grid;
    min-width: 256px;
    min-height: 96px;
    row-gap: 10px;
  }
  .footer-container{
    align-self: end;
    grid-row: 7;
    height: 64px;
    display: grid;
    padding: 16px;
    padding-left: 0;
    gap: 8px;
    border-top: 1px solid #F0F2F7;
    box-shadow: 4px 0px 4px rgba(44, 75, 99, 0.1);
  }
  .base-label{
    font-family: 'Golos Text Bold';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #52555A;
  }
  .items-container{
    display: grid;
    gap: 8px;
    padding: 0px;
    grid-auto-flow: column;
  }
  .item-wrapper{
    display: grid;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    background: #FAFAFA;
    border: 1px solid #EEF0F2;
    border-radius: 8px;
  }
  .minimize-wrapper{
    display: grid;
    gap: 4px;
    width: 215px;
    height: 32px;
    background: #F9F9F9;
    border: 1px solid #DDDEDF;
    border-radius: 5px;
    font-family: 'Golos Text Bold';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #272838;
  }
  .minimize-text{
    grid-row: 1;
    grid-column: 1/3;
    align-self: end;
    padding-bottom: 6px;
    justify-self: center;
    user-select: none;
    cursor: auto;
  }
  .item-menu-wrapper{
    display: grid;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-content: start;
  }
  .item-label{
    font-family: 'Golos Text Bold';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    align-items: center;
    text-align: center;
  }
  .image-wrapper{
    display: grid;
    width: 100%;
    justify-content: center;
    align-content: center;
  }
  .tab-container{
    padding: 4px 16px;
    background: #F8FAFC;
    border-radius: 50px;
    height: 36px;
  }
  .empty{
    grid-row: 2;
    height: 50px;
  }
  .second{
    margin-top: 50px;
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
    display: grid;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    background-image: url("./AvatarIcons/expand-menu-icon.svg");
  }
  .expand-menu:hover{
    opacity: 1;
    transform: scale(1.3, 1.3);
    transition-duration: 200ms;
    cursor: url("./AvatarIcons/cursor-pointer-icon.svg") 0 0, pointer;
  }
  .topos-obj{
    width: 20px;
    background-image: url("./AvatarIcons/insert-object-icon.png");
   }
  .gauge-arrow{
    background-image: url("AvatarIcons/gauge-arrow-icon.svg");
  }
  .gauge-digital{
    background-image: url("AvatarIcons/digital-indicator-icon.svg");
  }
  .gauge-progress{
    background-image: url("AvatarIcons/progress-bar-icon.png");
  }
  @media only screen and (max-height: 550px) and (min-height: 500px) {
    .components-container__expanded{
      gap: 2px;
      padding-top: 2px;
    }
    .items-container{
      gap: 1px;
      height: fit-content;
    }
    .item-wrapper{
      height: 50px;
    }
    .item-menu-wrapper{
      display: none;
    }
    .base-components-container{
      grid-row-gap: 0px;
    }
    .footer-container{
      padding: 6px;
      height: fit-content;
    }
    .empty{
      display: none;
    }
    .second{
      margin-top: 0px;
      padding-top: 3px;
      height: fit-content;
      padding-bottom: 3px;
    }
    .poor-resolution{
      display: none;
    }
    .collapsed-layout-container{
      height: 445px;
    }
    .expanded-layout-container{
      height: 445px;
    }
  }
  @media only screen and (max-height: 610px) and (min-height: 551px) {
    .components-container__expanded{
      gap: 2px;
      padding-top: 5px;
    }
    .items-container{
      gap: 1px;
    }
    .item-wrapper{
      height: 68px;
    }
    .empty{
      display: none;
    }
    .base-components-container{
      grid-row-gap: 2px;
    }
    .poor-resolution{
      display: none;
    }
    .collapsed-layout-container{
      height: 530px;
    }
    .expanded-layout-container{
      height: 530px;
    }
  }
  @media only screen and (max-height: 700px) and (min-height: 611px) {
    .components-container__expanded{
      gap: 2px;
      padding-top: 5px;
    }
    .items-container{
      gap: 1px;
    }
    .item-wrapper{
      height: 70px;
    }
    .base-components-container{
      grid-row-gap: 7px;
    }
    .second{
      /*margin-top: 0px;*/
      /*padding-top: 28px;*/
      /*height: fit-content;*/
      /*padding-bottom: 3px;*/
    }
    .poor-resolution{
      display: none;
    }
    .collapsed-layout-container{
      height: 44vw;
    }
    .expanded-layout-container{
      height: 44vw;
    }
  }
  @media only screen and (max-height: 750px) and (min-height: 701px) {
    .middle-resolution{
      display: none;
    }
    .collapsed-layout-container{
      height: 650px;
    }
    .expanded-layout-container{
      height: 650px;
    }
  }
  @media only screen and (max-height: 800px) and (min-height: 751px) {
    .middle-resolution{
      display: none;
    }
    .collapsed-layout-container{
      height: 700px;
    }
    .expanded-layout-container{
      height: 700px;
    }
  }
  @media only screen and (max-height: 900px) and (min-height: 810px) {
    .hight-resolution{
      display: none;
    }
    .empty{
      display: none;
    }
    .second{
      margin-top: 12px;
    }
    .collapsed-layout-container{
      height: 800px;
    }
    .expanded-layout-container{
      height: 800px;
    }
    .components-container__expanded{
      height: 750px;
    }
  }
  @media only screen and (max-height: 960px) and (min-height: 910px) {
    .hight-resolution{
      display: none;
    }
    .empty{
      height: 0px;
    }
    .collapsed-layout-container{
      height: 860px;
    }
    .expanded-layout-container{
      height: 860px;
    }
    .components-container__expanded{
      height: 815px;
    }
  }
  @media only screen and (max-height: 1400px) and (min-height: 961px) {
    .hight-resolution{
      display: none;
    }
    .collapsed-layout-container{
      height: 900px;
    }
    .expanded-layout-container{
      height: 900px;
    }
    .components-container__expanded{
      height: 845px;
    }
  }
</style>