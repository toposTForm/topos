<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button> Duck </n-button>
    </template>
    If it looks like a duck, walks like a duck, and quacks like a duck...it must
    be a duck.
  </n-tooltip>
</template>


<script>
import { NButton } from 'naive-ui';
import { NTooltip } from "naive-ui";
import { ref } from 'vue';

export default {
  name: "Tooltip",
  components: {
    NButton,
    NTooltip
  },
  setup() {
    return {
      showPopover: ref(false)
    }
  }
}
</script>

<style scoped>

</style>