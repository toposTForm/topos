<template>
  <div>
    <n-modal
        ref="nModal"
        v-model:show="showModal"
        :mask-closable="false"
        preset="dialog"
        :title=title
        :content=content
        :positive-text=positiveText
        :negative-text=negativeText
        :on-after-enter="onOpen"
        @positive-click="onPositiveClick(bufferElem)"
        @negative-click="onNegativeClick"
        @close = 'onClose'
    >
      <div>{{content}}</div>
      <my-naive-input v-if="showInput" ref="nInput"></my-naive-input>
    </n-modal>
  </div>
</template>
<script>
import { NButton } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { NModal } from "naive-ui";
import { defineEmits } from "vue";
import MyNaiveInput from "@/components/MyNaiveMessage/MyNaiveInput";

export default {
  components: {
    NButton,
    NModal,
    MyNaiveInput
  },
  emits: ['promtModalAction'],
  name: 'PromtModal',
  props: {
  },
  data(){
    return {
      bufferElem: '',
      showInput: ''
    }
  },
  watch: {
  },
  methods: {
  },
  setup (_, {emit}) {
    const message = useMessage();
    let showModalRef = ref(false);
    const openState = false;
    const onOpenRef =  async function(){

    };
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
      onOpenRef,
      onOpen: onOpenRef,
      onPositiveClick (bufferElem) {
        message.success('Успешно');
        showModalRef.value = false;
        emit('promtModalAction', { data: bufferElem, action: 'Ok'})
      },
      onNegativeClick () {
        message.info('Отмена');
        showModalRef.value = false;
      },
      onClose(){
        let bla = 0;
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