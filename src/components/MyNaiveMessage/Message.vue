<template>

</template>

<script>
import { useMessage } from 'naive-ui'

export default {
  name: 'Message',
  setup() {
    const message = useMessage()
    return {
      createMessage() {
        message.warning("I never needed anybody's help in any way", {
          showIcon: false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>