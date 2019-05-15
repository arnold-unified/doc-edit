<template>
  <div>
    <form id="dropper-form" class="dropper-form" enctype="multipart/form-data">
      <div class="dropper-inputs-container">
        <input
          id="file"
          class="dropper-input"
          type="file"
          name="files[]"
          :accept="dataAccept"
          multiple
        ></input>
        <label for="file"><strong>Choose a file</strong><span class="dropper-dragndrop"> or drag it here</span>.</label>
      </div>
    </form>
  </div>
</template>

<script>
let $form = null
let $input = null

export default {
  name: 'FileDropper',

  props: {
    dataAccept: {
      type: String,
      default: () => 'image/*'
    }
  },

  mounted() {
    $form = document.getElementById('dropper-form')
    $input = $form.getElementsByTagName('input')[0]

    this.validateDropper()
    this.initDropper()
  },

  beforeDestroy() {
    $form.removeEventListener('drag', e => console.log('drag event removed'))
    $form.removeEventListener('dragstart', e => console.log('dragstart event removed'))
    $form.removeEventListener('dragover', e => console.log('dragover event removed'))
    $form.removeEventListener('dragend', e => console.log('dragend event removed'))
    $form.removeEventListener('dragenter', e => console.log('dragenter event removed'))
    $form.removeEventListener('dragleave', e => console.log('dragleave event removed'))
    $form.removeEventListener('drop', e => console.log('drop event removed'))
    $input.removeEventListener('change', e => console.log('change event removed'))
  },

  methods: {
    isAdvancedUpload() {
      const div = document.createElement('div')
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
    },
    validateDropper() {
      if (!this.isAdvancedUpload()) return false

      if (!$form.classList.contains('has-advanced-upload')) {
        $form.classList.add('has-advanced-upload')
      }
    },
    initDropper() {
      if (!this.isAdvancedUpload()) return false

      $form.addEventListener('drag', function (event) {
        this.stopEvent(event)
      }.bind(this), false)
      $form.addEventListener('dragstart', function (event) {
        this.stopEvent(event)
      }.bind(this), false)
      $form.addEventListener('dragover', function (event) {
        this.stopEvent(event)

        if (!$form.classList.contains('is-dragover')) {
          $form.classList.add('is-dragover')
        }
      }.bind(this), false)
      $form.addEventListener('dragend', function (event) {
        this.stopEvent(event)

        if ($form.classList.contains('is-dragover')) {
          $form.classList.remove('is-dragover')
        }
      }.bind(this), false)
      $form.addEventListener('dragenter', function (event) {
        this.stopEvent(event)

        if (!$form.classList.contains('is-dragover')) {
          $form.classList.add('is-dragover')
        }
      }.bind(this), false)
      $form.addEventListener('dragleave', function (event) {
        this.stopEvent(event)

        if ($form.classList.contains('is-dragover')) {
          $form.classList.remove('is-dragover')
        }
      }.bind(this), false)
      $form.addEventListener('drop', function (event) {
        this.stopEvent(event)

        if ($form.classList.contains('is-dragover')) {
          $form.classList.remove('is-dragover')
        }

        this.$emit('files-received', event.dataTransfer.files)
      }.bind(this), false)

      $input.addEventListener('change', function (event) {
        this.stopEvent(event)

        this.$emit('files-received', event.target.files)
      }.bind(this), false)
    },
    stopEvent(event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
</script>

<style scoped lang="scss">
.dropper-form {
  position: relative;

  & .dropper-dragndrop {
    display: none;
  }

  &.has-advanced-upload {
    background-color: #eef9ff;
    outline: 2px dashed #c0dbea;
    outline-offset: -10px;
    height: 300px;

    & .dropper-dragndrop {
      display: inline;
    }
  }

  &.is-dragover {
    background-color: #d7f1ff;
  }

  & .dropper-inputs-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .dropper-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: 1;

    & + label {
      font-size: 1.25em;
      font-weight: 700;
      color: #6b6b6b;
      display: inline-block;
      cursor: pointer;
    }

    &:focus + label {
      outline: 1px dotted #000;
      outline: -webkit-focus-ring-color auto 5px;
    }

    & + label * {
      pointer-events: none;
    }
  }
}
</style>
