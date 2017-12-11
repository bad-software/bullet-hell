import m from 'mithril'
import { debounce } from './_debounce'
import { throttle } from './_throttle'


export function addHooksToClass ( hooks, thisValue, options ) {
  /**
   * @param {Object} hooks Dictionary of hooks to be added
   * @param {this} thisValue The 'this' value of the class
   * @param {Object} options
   * @param {Boolean} options.overwrite Flag for overwriting hooks
   */

  // Loop through the hooks object
  Object.entries( hooks ).forEach( x => {
    // If there is no preexisting hook,
    // or if overwrite is enabled, add hook
    if ( !thisValue[ x[0] ] || options.overwrite ) {
      thisValue[ x[0] ] = x[1].bind( thisValue )
    }
  })
}

export function addVectorMaps( vec1, vec2 ) {
  return {
    x: vec1.x + vec2.x,
    y: vec1.y + vec2.y
  }
}

export function getDistance( vectorA, vectorB ) {
  const
    a = vectorA.x - vectorB.x,
    b = vectorA.y - vectorB.y

  return Math.sqrt( a*a + b*b )
}


export {
  debounce,
  throttle
}