
<template>
  <n-space vertical style="background-color: #F9F9F9">
    <n-select
        v-model:value="value"
        placeholder="история"
        :options="options"
        :on-update:value="onOpenRef"
        :max-tag-count="1"
        status="success"
    />
  </n-space>
</template>

<script>
import { defineComponent, ref, h } from 'vue'
import { NTag, NSelect, NSpace } from 'naive-ui'

export default defineComponent({
  name: "Select",
  components: {
    NTag,
    NSelect,
    NSpace
  },
  data(){
    return {
      bufferElem: '',
    }
  },
  setup (_, {emit}) {
    const optionsRef = ref([
      {
        label: "Действие 1",
        value: 'song0',
        disabled: false,
        style: {
          backgroundColor: 'transparent'
        },
        type: 'table',
        status: 'warning'
      },
      {
        label: 'Действие 2',
        value: 'song1',
        status: 'warning'
      },
      {
        label: 'Действие 3',
        value: 'song2'
      },
      {
        label: "Действие 4",
        value: 'song3',
        disabled: true
      },
      {
        label: 'Действие 5',
        value: 'song4'
      },
      {
        label: 'Действие 6',
        value: 'song5'
      },
      {
        label: 'Действие 7',
        value: 'song6'
      },
      {
        label: 'Действие 8',
        value: 'song7',
        disabled: true
      },
      {
        label: 'Действие 9',
        value: 'song8'
      },
      {
        label: 'Действие 10',
        value: 'song9'
      },
    ],);
    const temp = ref('история');
    const onOpenRef = (value, label) =>{
      let bla = value;
      let bla2 = label;
      updateValue(value, label);
    };
    function updateValue(valueCur, label){
      let bla = optionsRef;
      let blafd = temp;
      temp.value = valueCur;
    }
    return {
      value: temp,
      onOpenRef,
      options: optionsRef,
    }
  },
  mounted() {
    this.$el.children[0].children[0].style.border = '1px solid #DDDEDF';
    this.$el.children[0].children[0].style.backgroundColor = '#F9F9F9';
    this.$el.children[0].children[0].style.borderRadius = '5px';
  }
  });
</script>

<style scoped>

</style>