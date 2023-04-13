<template>
</template>

<script>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

export default {
  name: 'Message',
  setup() {
    const message = useMessage();
    const createMessage = async(params) => {
      messageWarning(params);
    };
    function messageWarning(params) {
      message.info(params, {
        showIcon: true,
        duration: 4000,
        placement: 'bottom-right',
      })
    }
    return {
      createMessage,
    }
  }
}
</script>

<style scoped>

</style>