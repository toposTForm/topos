
  <template>
    <n-input
        v-model:value="value"
        type="text"
        maxlength="16" show-count clearable
        :placeholder=placeholder
        @focus="focusChanged()"
        @input="checkInput()"
    />
  </template>

<script>
import { NInput } from 'naive-ui'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

export default {
  name: "MyNaiveInput",
  emits: ['checkInput'],
  props: {
  },
  components: {
    NInput
  },
  setup(_, {emit}) {
    const inputValueRef = ref(false);
    let valueRef = ref('');
    const placeHolderRef = ref('поле ввода');
    return {
      value: valueRef,
      inputValue: inputValueRef,
      placeholder: placeHolderRef,
      checkInput(){
        emit('checkInput', { data: this.value });
      },
      focusChanged() {
      }
    }
  }
}
</script>

<style scoped>

</style>