<template>
  <div>
    <QuillEditor
        theme="snow"
        toolbar="full"
        v-model:content="content" required contentType="html"
        :style='{width: width, height: height}'
    />
  </div>
</template>
<script>
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import domtoimage from 'dom-to-image-more';

export default {
  name: "MyQuillEditor",
  components: {
    QuillEditor
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
    }
  },
  methods: {
    update( quill, el){
      if (isNaN(this.$data.quillHeight)){
        this.$data.quillHeight = Number(this.$data.quillHeight.slice(0, (this.$data.quillHeight.length - 2)));
      }
      if (this.$data.quillHeight != this.$el.parentElement.offsetHeight){
        this.quillHeight = this.$el.parentElement.offsetHeight
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
  },
  watch: {
    quillHeight: function (data){
      this.resizeRowBar();
    }
  },
  mounted() {
    this.$data.quillHeight = this.$el.parentElement.offsetHeight;

    this.$el.children[1].style.height = this.$props.height;
    this.$el.children[1].style.zIndex = 1;
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
    let node = this.$el.children[1];
    let data = this.$data;
    domtoimage
        .toPng((node), {quality: 0.1})
        .then(function (dataUrl) {
          let img = new Image();
          img.src = dataUrl;
          data.prevImage = '<img src=' + img.src + '>';
          // document.querySelector('.picture').append(img);
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    this.$emit('displayFontMenu', {
      data: this.$data,
      el: this.$el,
      type: this.$.type.name
    })
  },
}

</script>

<style scoped>

</style>