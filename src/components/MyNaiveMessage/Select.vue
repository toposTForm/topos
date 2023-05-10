
<template>
  <n-space vertical style="background-color: #F9F9F9">
    <n-select
        v-model:value="options"
        placeholder="история"
        multiple
        :options="options"
        :max-tag-count="1"
        :fallback-option="trim"
        status="success"
    />
  </n-space>
</template>

<script>
import { defineComponent, ref, h } from 'vue'
import { NTag, NSelect, NSpace } from 'naive-ui'

export default defineComponent({
  name: "Select",
  components: {
    NTag,
    NSelect,
    NSpace
  },
  setup () {
    return {
      value: ref([1,2,3,4,5]),
      trim: (value) => {
        let bla = value;
        return {
          label: value + '/',
          value
        };
      },
      options: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true,
          style: {
            backgroundColor: 'red'
          },
          status: 'warning'

        },
        {
          label: 'Drive My Car',
          value: 'song1',
          status: 'warning'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3',
          disabled: true
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourself',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7',
          disabled: true
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ],
    }
  },
  mounted() {
    this.$el.children[0].children[0].style.border = '1px solid #DDDEDF';
    this.$el.children[0].children[0].style.backgroundColor = '#F9F9F9';
    this.$el.children[0].children[0].style.borderRadius = '5px';
  }
  });
</script>

<style scoped>

</style>