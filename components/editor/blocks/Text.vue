<template>
  <section class="container">
    <div
      v-quill:myQuillEditor="editorOption"
      class="quill-text"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      content: ``,
      editorOption: {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
          ]
        },
        placeholder: '',
        theme: 'snow'
      }
    }
  },

  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 0 10px;
}
</style>
