<template>
  <div class="doc-page" :class="[`doc-${dataPageSize}`]">
    <slot>
      &nbsp;
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Page',

  props: {
    dataPageSize: {
      type: String,
      default: 'us-letter'
    }
  }
}
</script>

<style scoped lang="scss">
// US Letter: 8.5"x11"
$us-letter-width: 8.5;
$us-letter-height: 11;

// A4: 8.27"x11.69"
$a4-width: 8.27;
$a4-height: 11.69;

$pixels-per-inch: 96px;

.doc-page {
  background-color: white;
  box-shadow: 0 5px 5px rgba(0,0,0,0.15);
  margin-bottom: 40px;
  padding: 65.28px 50.88px; // 96px*0.68in 96px*0.53in

  // ============= Remove later =============
  float: right;
  // ============= Remove later =============

  &.doc-us-letter {
    width: #{$pixels-per-inch * $us-letter-width};
    min-height: #{$pixels-per-inch * $us-letter-height};
  }

  &.doc-a4 {
    width: #{$pixels-per-inch * $a4-width};
    min-height: #{$pixels-per-inch * $a4-height};
  }
}
</style>
