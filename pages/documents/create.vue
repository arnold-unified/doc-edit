<template>
  <div>
    <draggable-blocks data-group-name="components" />
    <page data-page-size="us-letter">
      <draggable
        :list="components"
        v-bind="dragOptions"
      >
        <transition-group type="transition" tag="div" name="doc-drag-components">
          <div
            v-for="(component, index) in components"
            :key="component.id + '' + index"
            class="doc-drag-component"
          >
            <span class="doc-drag-handle">||</span>
            <component :is="component.type" />
          </div>
        </transition-group>
      </draggable>
    </page>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Page from '~/components/editor/Page.vue'
import DraggableBlocks from '~/components/editor/blocks/DraggableBlocks.vue'
import TextBlock from '~/components/editor/blocks/Text.vue'
import ImageBlock from '~/components/editor/blocks/Image.vue'
import VideoBlock from '~/components/editor/blocks/Video.vue'
import TableBlock from '~/components/editor/blocks/Table.vue'

export default {
  name: 'CreateDocument',

  layout: 'document',

  components: {
    Draggable,
    Page,
    DraggableBlocks,
    TextBlock,
    ImageBlock,
    VideoBlock,
    TableBlock
  },

  data() {
    return {
      components: []
    }
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'components',
        disabled: false,
        ghostClass: 'doc-drag-ghost',
        handle: '.doc-drag-handle'
      }
    }
  }
}
</script>
