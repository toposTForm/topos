
  <template>
    <n-input
        v-model=value
        type="text"
        :placeholder=placeholder
        @focus="focusChanged()"
        :on-input="checkInput"
        :on-update:value="checkUpdate()"
    />
  </template>

<script>
import { NInput } from 'naive-ui'
import { ref } from 'vue'

export default {
  name: "MyNaiveInput",
  components: {
    NInput
  },
  setup() {
    const valueRef = ref('value');
    const placeHolderRef = ref('поле ввода')
    const checkInputRef =  function checkInput(value){
      let bla = 0;
    }
    return {
      value: valueRef,
      placeholder: placeHolderRef,
      checkInputRef,
      checkUpdate()  {
        let bla = 0;
      },
      checkInput()  {
        let bla = 0;
      },
      focusChanged()  {
        let bla = 0;
      }
    }
  }
}
</script>

<style scoped>

</style>