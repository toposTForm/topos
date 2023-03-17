<template>
  <div>
    <n-modal
        v-model:show="showModal"
        :mask-closable="false"
        preset="dialog"
        title="Внимание!"
        :content="content"
        positive-text="Да"
        negative-text="Нет"
        @positive-click="onPositiveClick(bufferElem)"
        @negative-click="onNegativeClick"
        @close = 'onClose'
    />
  </div>
</template>
<script>
import { NButton } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { NModal } from "naive-ui";
import { defineEmits } from "vue";
export default {
  components: {
    NButton,
    NModal,
  },
  emits: ['promtModalAction'],
  name: 'PromtModal',
  props: {
    title: String
  },
  data(){
    return {
      content: '',
      bufferElem: '',
    }
  },
  watch: {
  },
  methods: {
  },
  setup (_, {emit}) {
    const message = useMessage();
    const showModalRef = ref(false);
    const bufferElem = ref('');
    const content = ref('content');
    return {
      showModal: showModalRef,
      content, bufferElem,
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