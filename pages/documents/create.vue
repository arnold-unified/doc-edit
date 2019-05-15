<template>
  <div>
    <text-block />
    <image-block />
    <video-block />
  </div>
</template>

<script>
import TextBlock from '~/components/editor/blocks/Text.vue'
import ImageBlock from '~/components/editor/blocks/Image.vue'
import VideoBlock from '~/components/editor/blocks/Video.vue'

export default {
  name: 'CreateDocument',

  layout: 'document',

  components: {
    TextBlock,
    ImageBlock,
    VideoBlock
  }
}
</script>
