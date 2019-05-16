<template>
  <div>
    <page data-page-size="us-letter">
      <text-block />
      <image-block />
    </page>
    <page data-page-size="us-letter">
      <video-block />
      <table-block />
    </page>
  </div>
</template>

<script>
import Page from '~/components/editor/Page.vue'
import TextBlock from '~/components/editor/blocks/Text.vue'
import ImageBlock from '~/components/editor/blocks/Image.vue'
import VideoBlock from '~/components/editor/blocks/Video.vue'
import TableBlock from '~/components/editor/blocks/Table.vue'

export default {
  name: 'CreateDocument',

  layout: 'document',

  components: {
    Page,
    TextBlock,
    ImageBlock,
    VideoBlock,
    TableBlock
  }
}
</script>
