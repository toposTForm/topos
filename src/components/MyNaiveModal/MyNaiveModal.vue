<template>
  <div>
    <n-loading-bar-provider>
      <n-message-provider placement="bottom-right">
        <n-notification-provider>
          <n-dialog-provider>
            <promt-modal @promtModalAction='promtModalAction' ref="promtModal"></promt-modal>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </div>
</template>

<script>

import {NLoadingBarProvider} from "naive-ui/es/loading-bar";
import {NMessageProvider} from "naive-ui/es/message";
import {NDialogProvider} from "naive-ui/es/dialog/src/DialogProvider";
import PromtModal from "@/components/PromtModal/PromtModal";
import {NNotificationProvider} from "naive-ui/es/notification";
export default {
  name: "MyNaiveModal",
  components: {
    PromtModal,
    NLoadingBarProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider
  },
  emits: ['promtModalAction'],
  methods: {
    promtModalAction(params){
      this.$emit('promtModalAction',{
        data: params,
      });
    },
  }
}
</script>

<style scoped>

</style>