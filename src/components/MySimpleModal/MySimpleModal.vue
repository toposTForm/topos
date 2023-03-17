<template>
  <div>
    <vm-container>
      <vm-button @click="handleClick(true)">Ok</vm-button>
      <vm-button type="" @click="handleClick(false)">Отменить</vm-button>
    </vm-container>
    <div>
    </div>
  </div>
</template>
<script>
import {Modal} from "jenesius-vue-modal";
import { VmButton, VmContainer } from 'vue3-material';
import { NButton } from 'naive-ui'

export default {
  components: {
    VmButton,
    VmContainer,
    NButton,
  },
  name: 'MySimpleModal',
  props: {
    title: String
  },
  emits: [Modal.EVENT_PROMPT],
  methods: {
    handleClick(params) {
      // Current emit will close the modal and provided Meth.random()
      // result to Promise returned by promptModal
      this.$emit(Modal.EVENT_PROMPT, params);
    }
  },
}
</script>

<style scoped>
  button {
    margin: 25px 5px 20px 20px;
  }
</style>