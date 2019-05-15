<template>
  <div>
    <h4>Add video</h4>

    <p>Paste a video URL to embed it in your document. Youtube and Vimeo are supported.</p>

    <div>
      <input v-model="link" type="text" name="link"></input>
      <br>
      <span><small>Paste your video link here</small></span>
    </div>

    <button @click.prevent="add">
      Add Video
    </button>
  </div>
</template>

<script>
export default {
  name: 'VideoLinker',

  data() {
    return {
      link: ''
    }
  },

  methods: {
    add() {
      if (this.isYoutubeUrl(this.link)) {
        this.$emit('linked', this.composeYoutubeIframe(this.link))
      } else if (this.isVimeoUrl(this.link)) {
        this.$emit('linked', this.composeVimeoIframe(this.link))
      }
    },
    isYoutubeUrl(url) {
      return url.indexOf('youtube') > -1
    },
    isVimeoUrl(url) {
      return url.indexOf('vimeo') > -1
    },
    composeYoutubeIframe(link) {
      const src = link.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
      return `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${src}"></iframe>`
    },
    composeVimeoIframe(link) {
      const src = link.replace('https://vimeo.com/', 'https://player.vimeo.com/video/')
      return `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${src}"></iframe>`
    }
  }
}
</script>
