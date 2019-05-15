<template>
  <section class="container">
    <file-dropper data-accept="image/*" @files-received="handleFiles" />
    <div
      v-quill:quillInstance="quillOptions"
      class="quill-image"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
  </section>
</template>

<script>
import FileDropper from '~/components/editor/fields/FileDropper.vue'

let vm

export default {
  components: {
    FileDropper
  },

  data() {
    return {
      content: '',
      quillOptions: {
        modules: {
          toolbar: false,
          imageResize: {
            modules: ['Resize', 'Toolbar']
          }
        },
        placeholder: '',
        theme: 'snow'
      }
    }
  },

  mounted() {
    this.quillInstance.disable()
  },

  created() {
    vm = this
  },

  methods: {
    onEditorBlur(editor) {
      this.quillInstance.disable()
    },
    onEditorFocus(editor) {
      this.quillInstance.disable()
    },
    onEditorReady(editor) {
      this.quillInstance.disable()
    },
    onEditorChange({ editor, html, text }) {
      html = html.replace('<p><br></p>', '')
      this.content = html
      this.quillInstance.disable()
    },
    handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const f = files[i]
        if (!f.type.match('image.*')) continue

        const reader = new FileReader()

        reader.onload = (function (file) {
          return function (event) {
            vm.content += `<img src="${event.target.result}" title="${escape(file.name)}" />`
          }
        })(f)

        reader.readAsDataURL(f)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 0 10px;
}
</style>
