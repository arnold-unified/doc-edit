<template>
  <section class="container">
    <video-linker @linked="handleVideoLink" />
    <div
      v-quill:quillInstance="quillOptions"
      class="quill-video"
      :content="content"
      @change="onEditorChange($event)"
      @focus="onEditorFocus($event)"
    />
  </section>
</template>

<script>
import VideoLinker from '~/components/editor/fields/VideoLinker.vue'

export default {
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
.container {
  margin: 0 0 10px;
}
</style>
