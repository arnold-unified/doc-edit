export default ({ app }, inject) => {
  // Array
  inject('_arrayIncludes', (array, value) => array.indexOf(value) >= -1)

  // Boolean
  inject('_isString', value => typeof value === 'string' || value instanceof String)
  inject('_isNumber', value => typeof value === 'number' && isFinite(value))
  inject('_isArray', value => value && typeof value === 'object' && value.constructor === Array)
  inject('_isObject', value => value && typeof value === 'object' && value.constructor === Object)
  inject('_isRegExp', value => value && typeof value === 'object' && value.constructor === RegExp)
  inject('_isError', value => value instanceof Error && typeof value.message !== 'undefined')
}
