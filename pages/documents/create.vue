<template>
  <div>
    <text-block />
    <image-block />
  </div>
</template>

<script>
import TextBlock from '~/components/editor/blocks/Text.vue'
import ImageBlock from '~/components/editor/blocks/Image.vue'

export default {
  name: 'CreateDocument',

  layout: 'document',

  components: {
    TextBlock,
    ImageBlock
  }
}
</script>
