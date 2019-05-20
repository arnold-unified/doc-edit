<template>
  <draggable
    v-model="blocks"
    v-bind="dragOptions"
    class="doc-draggable-blocks"
  >
    <div v-for="block in blocks" :key="block.id" class="doc-draggable-block">
      {{ block.label }}
    </div>
  </draggable>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  name: 'DraggableBlocks',

  components: {
    Draggable
  },

  props: {
    dataGroupName: {
      type: String,
      default: 'list'
    }
  },

  data() {
    return {
      blocks: [
        {
          id: 1,
          label: 'TEXT',
          icon: '',
          type: 'TextBlock'
        },
        {
          id: 2,
          label: 'IMAGE',
          icon: '',
          type: 'ImageBlock'
        },
        {
          id: 3,
          label: 'VIDEO',
          icon: '',
          type: 'VideoBlock'
        },
        {
          id: 4,
          label: 'TABLE',
          icon: '',
          type: 'TableBlock'
        }
      ]
    }
  },

  computed: {
    dragOptions() {
      return {
        group: { name: this.dataGroupName, pull: 'clone', put: false },
        sort: false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.doc-draggable-blocks {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 310px;
  padding: 70px 24px 24px;
  border-right: 1px solid #ddd;

  & .doc-draggable-block {
    background-color: white;
    box-shadow: 0 2px 2px rgba(0,0,0,0.15);
    padding: 15px;
    border-radius: 2px;
    margin-bottom: 10px;
  }
}
</style>
