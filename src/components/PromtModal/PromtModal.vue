<template>
  <div>
    <n-modal
        ref="nModal"
        v-model:show="showModal"
        :mask-closable="false"
        preset="dialog"
        :title='title'
        :content=content
        :positive-text='positiveText'
        :negative-text='negativeText'
        :on-after-enter="onOpen"
        @positive-click="onPositiveClick(bufferElem)"
        @negative-click="onNegativeClick"
        >
      <div>{{content}}</div>
      <my-naive-input v-if="showInput" ref="nInput"></my-naive-input>
    </n-modal>
  </div>
</template>
<script>
import { NButton } from 'naive-ui'
import { ref } from 'vue'
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
    let clickedPosRef = ref(false)
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
      onOpenRef,
      onOpen: onOpenRef,
      onPositiveClick (bufferElem) {
        if (this.positiveText === 'Вручную'){
          showModalRef.value = false;
          this.clickedPos = true;
          emit('promtModalAction', { data: bufferElem, action: this.positiveText});
        }else if (this.clickedPos || this.positiveText === 'Принять'){
          showModalRef.value = false;
          emit('addElement', { data: bufferElem, action: this.positiveText});
        }
        else{
          message.success('Успешно');
          showModalRef.value = false;
          emit('promtModalAction', { data: bufferElem, action: 'Ok'})
        }
      },
      onNegativeClick () {
        message.info('Отмена');
        showModalRef.value = false;
        this.clickedPos = false;
      },
    }
  },
}
</script>

<style scoped>
button {
  margin: 25px 5px 20px 20px;
}
</style>