<template>
  <div id="app">
    <nav-bar />

    <nuxt />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'

export default {
  name: 'DocumentLayout',

  components: {
    NavBar
  }
}
</script>

<style>
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}
#app {
  box-sizing: border-box;
  width: 100%;
  padding: 0 80px 80px;
  margin: 0 auto;
}
</style>
