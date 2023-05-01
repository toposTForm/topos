<template>
  <n-badge style="opacity: 0.9;" v-model="renderValue" :value=value :offset='offset' color="#0000FE">
    <div class="avatar-container">
      <div class="icon" :class="imgUrl"></div>
      <div style="align-self: end; justify-self: center; grid-area: 2/1; padding-bottom: 8px">{{name}}</div>
    </div>
  </n-badge>
</template>
<script>
import { defineComponent, ref } from "vue";
import { NAvatarGroup, NAvatar, NTooltip, NDropdown, NBadge, NImage } from 'naive-ui'

export default defineComponent({
  name: 'AvatarGroup',
  components: {
    NAvatarGroup,
    NAvatar,
    NTooltip,
    NDropdown,
    NBadge,
    NImage
  },
  setup(_, {emit}) {
    const valueRef = async function(){
      this.value = 'test';
    }
    return {
      value: ref('no'),
      renderValue: ref(''),
      name: ref('Тext'),
      hoveredBgColor: ref('#FAFAFA'),
      valueRef,
      offset: [0, 0],
      imgUrl: ref('')
    };
  },
  mounted() {
    this.$emit('cellNameUpdate', {
      caterogy: this.name,
      userName: this.value
    })
  }
});
</script>

<style scoped>
 .avatar-container{
   display: grid;
   background-color: #FAFAFA;
   border: 1px solid #EEF0F2;
   border-radius: 8px;
   width: 60px;
   height: 60px;
   background-repeat: no-repeat;
   color: #272838;
   /*font-family: 'Arial Black';*/
   /*font-family: 'Golos Text Regular';*/
   font-family: 'Golos Text Regular', serif;
   /*font-family: 'Aria';*/
   /*font-style: normal;*/
   /*font-weight: 600;*/
   /*font-weight: bold;*/
   font-size: 10px;
   line-height: 12px;
   z-index: 1;
 }

 .avatar-container:hover{
   background-color: #F0E5FF;
 }
 .icon{
   background-repeat: no-repeat;
   box-sizing: border-box;
   display: grid;
   grid-area: 1/1;
   align-self: end;
   opacity: 0.99;
   justify-self: center;
   justify-content: center;
   align-content: center;
   min-height: 20px;
   min-width: 20px;
 }
 .icon:hover{
   background-color: #F0E5FF;
 }
 .icon__text{
   background-image: url("./AvatarIcons/text-icon.png");
 }
 .icon__graph{
   background-image: url("./AvatarIcons/graph-icon.png");
   width: 32px;
   height: 32px;
 }
 .icon__table{
   background-image: url("./AvatarIcons/table-icon.png");
 }
 .icon__indicator{
   background-image: url("./AvatarIcons/gauge-arrow-icon.svg");
 }
</style>