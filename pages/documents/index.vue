<template>
  <div>
    <nuxt-link id="create-link" to="/documents/create">
      Create
    </nuxt-link>

    <h2>Documents</h2>
  </div>
</template>

<script>
export default {
  name: 'Documents',

  layout: 'document',

  head() {
    return {
      title: 'Documents - DocEdit',
      meta: [
        { name: 'twitter:title', content: 'Documents - DocEdit' },
        { name: 'twitter:description', content: 'DocEdit is awesome!' },
        { name: 'twitter:image', content: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  }
}
</script>

<style scoped>
#create-link {
  float: right;
}
</style>
