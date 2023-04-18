<template>
  <div>
    <n-loading-bar-provider>
      <n-message-provider placement="bottom-right">
        <n-notification-provider>
          <n-dialog-provider>
            <promt-modal @promtModalAction='promtModalAction' @addElement = 'addElement' ref="promtModal"></promt-modal>
            <message ref="message"></message>
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
import Message from "@/components/MyNaiveMessage/Message";
import Tooltip from "@/components/MyNaiveMessage/Tooltip";
import MyNaiveInput from "@/components/MyNaiveMessage/MyNaiveInput";


export default{
  name: "MyNaiveModal",
  components: {
    PromtModal,
    NLoadingBarProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider,
    Message,
    Tooltip,
    MyNaiveInput
  },
  emits: ['promtModalAction', 'addElement'],
  methods: {
    promtModalAction(params){
      this.$emit('promtModalAction',{
        data: params,
      });
    },
    addElement(params){
      this.$emit('addElement',{
        data: params,
      });
    },
  },
}
</script>

<style scoped>

</style>