<template>
  <section class="doc-block-container">
    <div
      v-quill:myQuillEditor="editorOption"
      class="doc-text-block"
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
  name: 'TextBlock',

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
.doc-block-container {
  margin: 20px 0 20px;
}
</style>
<style lang="scss">
.doc-text-block {
  min-height: 20px;

  & > .ql-editor {
    padding: 5px!important;
  }
}
</style>
