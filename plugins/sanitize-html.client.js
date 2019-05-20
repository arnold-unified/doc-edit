import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

Vue.use(VueSanitize, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
  allowedAttributes: {
    'a': [ 'href' ]
  }
})
