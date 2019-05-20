<template>
  <section class="doc-block-container">
    <video-linker @linked="handleVideoLink" />
    <div
      v-quill:quillInstance="quillOptions"
      class="doc-video-block"
      :content="content"
      @change="onEditorChange($event)"
      @focus="onEditorFocus($event)"
    />
  </section>
</template>

<script>
import VideoLinker from '~/components/editor/fields/VideoLinker.vue'

export default {
  name: 'VideoBlock',

  components: {
    VideoLinker
  },

  data() {
    return {
      content: '',
      quillOptions: {
        modules: {
          toolbar: false
        },
        placeholder: '',
        theme: 'snow'
      }
    }
  },

  methods: {
    onEditorChange({ html }) {
      if (html) {
        html = html.replace('<p><br></p>', '')
        this.content = html
        this.quillInstance.disable()
      }
    },
    onEditorFocus({ html }) {
      if (html) {
        html = html.replace('<p><br></p>', '')
        this.quillInstance.disable()
      }
    },
    handleVideoLink(iframe) {
      this.content = iframe
    }
  }
}
</script>

<style scoped lang="scss">
.doc-block-container {
  margin: 20px 0 20px;
}
</style>
<style lang="scss">
.doc-video-block {
  min-height: 300px;

  & > .ql-editor {
    position: relative;
    padding-bottom: 55.25%;
    padding-top: 10px;
    height: 0;
    overflow: hidden;

    & > iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
