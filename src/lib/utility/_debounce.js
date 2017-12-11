export function debounce ( f, buffer, immediate ) {
  /**
   * Returns debounced function (f) with provided buffer in ms
   * To call function at beginning of interval, pass immediate=true
   */

  let timeout
  return function() {
    let context = this
    let args = arguments
    let delay = function() {
      timeout = null
      if (!immediate) f.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(delay, buffer)
    if (callNow) f.apply(context, args)
  }
}
