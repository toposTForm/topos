<template>
  <div>
    <QuillEditor
        ref="myEditor"
        :theme=theme
        :toolbar=toolbar
        :read-only=readOnly
        v-model:content="content" required contentType="html"
        :style='{width: width, height: height}'
    />
  </div>
</template>
<script>
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: "MyQuillEditor",
  components: {
    QuillEditor,
  },
  props: ['width', 'height', 'showAvatar'],
  emits: ['resizeRowBar', 'saveInnerHtml', 'displayFontMenu'],
  data(){
    return {
      userName: '',
      quillOldHeight: '',
      quillHeight: '',
      content: '',
      prevImage: '',
      readOnly: true,
      theme: 'snow',
      toolbar: ''
    }
  },
  methods: {
    update( quill, el){
      if (isNaN(this.$data.quillHeight)){
        this.$data.quillHeight = Number(this.$data.quillHeight.slice(0, (this.$data.quillHeight.length - 2)));
      }
      if (this.$data.quillHeight != this.$el.parentElement.offsetHeight){
        this.$data.quillHeight = this.$el.parentElement.offsetHeight
      }
      this.saveInnerHtml();
    },
    resizeRowBar(){
      this.$emit('resizeRowBar', {
        heightKey: this.$data.quillHeight
      })
    },
    saveInnerHtml(){
      this.$emit('saveInnerHtml', {
        data: this.content,
      })
    },
    disableEditor(){
      this.$refs.myEditor.getQuill().enable(false);
      for (let i = 0; i < this.$refs.myEditor.getEditor().children[0].children.length; i++){
        this.$refs.myEditor.getEditor().children[0].children[i].style.cursor = 'pointer';
      }
      this.$emit('displayFontMenu', {
        data: this.$data,
        el: this.$el,
        type: this.$.type.name,
        enable: false,
        toolbar: this.$refs.myEditor.getToolbar()
      });
    },
    enableEditor(){
      this.$refs.myEditor.getQuill().enable(true);
      this.$refs.myEditor.getQuill().focus();
      for (let i = 0; i < this.$refs.myEditor.getEditor().children[0].children.length; i++){
        this.$refs.myEditor.getEditor().children[0].children[i].style.cursor = 'text';
      };

      this.$emit('displayFontMenu', {
        data: this.$data,
        el: this.$el,
        type: this.$.type.name,
        enable: true,
        toolbar: this.$refs.myEditor.getToolbar()
      });
    },
  },
  watch: {
    quillHeight: function (data){
      this.resizeRowBar();
    }
  },
  mounted() {
    this.$data.quillHeight = this.$props.height;
    this.$el.children[1].style.height = this.$props.height;
    this.$el.children[1].style.zIndex = 1;
    let toolBar = this.$refs.myEditor.getToolbar();
    toolBar.style.display = 'none';
    // this.$el.children[0].style.display = 'none';
    // let newBut = document.createElement("button");
    // let span = document.createElement('span');
    // newBut.style.minwidth = 20 + 'px';
    // newBut.style.width = 'fit-content';
    // newBut.style.minheight = 20 + 'px';
    // newBut.style.display = 'inline-block';
    // newBut.style.verticalAlign = 'middle';
    // newBut.type = 'button';
    // newBut.title = 'minimize';
    // newBut.style.justifySelf = 'end';
    // span.className = 'q1-formats';
    // newBut.innerText = '[X]';
    // newBut.addEventListener('click', this.temp);
    // span.appendChild(newBut);
    // this.$el.children[0].appendChild(span);
  },
}

</script>

<style scoped>

</style>