<template>
  <div>
    <n-modal
        ref="nModal"
        style="font-family: Golos-Text_Regular"
        v-model:show="showModal"
        :mask-closable="false"
        preset="dialog"
        :title='title'
        :content=content
        :positive-text='positiveText'
        :negative-text='negativeText'
        :on-after-enter="onOpen"
        @positive-click="onPositiveClick(bufferElem)"
        @negative-click="onNegativeClick(bufferElem)"
        >
      <div>{{content}}</div>
      <my-naive-input v-if="showInput" v-model="inputValue" @checkInput="checkInput" ref="nInput"></my-naive-input>
    </n-modal>
  </div>
</template>
<script>
import { NButton } from 'naive-ui'
import { h, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { NModal } from "naive-ui";
import MyNaiveInput from "@/components/MyNaiveMessage/MyNaiveInput";

export default {
  components: {
    NButton,
    NModal,
    MyNaiveInput
  },
  emits: ['promtModalAction', 'addElement'],
  name: 'PromtModal',
  props: {
  },
  data(){
    return {
      bufferElem: '',
    }
  },
  watch: {
  },
  methods: {

  },
  setup (_, {emit}) {
    const message = useMessage();
    let showModalRef = ref(false);
    let clickedPosRef = ref(false);
    let inputValueRef = ref('')
    const onOpenRef = async function (){
    };
    let showInputRef = ref(false);
    const bufferElem = ref('');
    const contentRef = ref('content');
    const titleRef = ref('Внимание!');
    const positiveTextref = ref('Да');
    const negativeTextref = ref('Отмена');
    return {
      title: titleRef,
      positiveText: positiveTextref,
      negativeText: negativeTextref,
      showModal: showModalRef,
      content: contentRef, bufferElem,
      clickedPos: clickedPosRef,
      showInput: showInputRef,
      inputValue: ref(''),
      onOpen: onOpenRef,
      onPositiveClick (bufferElem) {
       if (this.positiveText === 'Вручную'){
          showModalRef.value = false;
          emit('promtModalAction', { data: bufferElem, actionFirst: this.positiveText});
        }else if (bufferElem.actionFirst === 'Вручную' || this.positiveText === 'Принять'){
          showModalRef.value = false;
          let action = 'addElement'
          emit('addElement', { data: bufferElem, action: action, userName: showModalRef.inputValue});
          message.success('Успешно');
        }else if (this.positiveText === 'Удалить') {
          showModalRef.value = false;
          let action = 'Удалить'
          emit('addElement', { data: bufferElem, action: action});
          message.success('Успешно');
        }
        else{
          message.success('Успешно');
          showModalRef.value = false;
          emit('promtModalAction', { data: bufferElem, action: 'Ok'})
        }
      },
      onNegativeClick (bufferElem) {
        if (this.negativeText === 'Авто'){
          message.success('Успешно');
          showModalRef.value = false;
          this.clickedPos = false;
          emit('addElement', { data: bufferElem, action: this.negativeText, userName: showModalRef.inputValue});
        }else{
          message.info('Отмена');
          showModalRef.value = false;
          this.clickedPos = false;
        }
      },
      checkInput(params){
        showModalRef.inputValue = params.data;
      }
    }
  },
}
</script>

<style scoped>
button {
  margin: 25px 5px 20px 20px;
}
</style>