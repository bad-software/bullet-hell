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

export function getRandomElement( array, args ) {
  const randomElement = array[ Math.floor( Math.random() * array.length )]
  if ( typeof randomElement === `function` ) return randomElement( args )
  else return randomElement
}

export function randomRange( min, max ) {
  return Math.random() * (max - min) + min
}

export function roundToNth( num, n ) {
  /**
  * Rounds a number to the nth significant digit. `n` must be a natural number.
  */
  if ( n > 0 ) {
    return Math.round( num / 10 ** n) * 10 ** n
  } else return -1
}

export {
  debounce,
  throttle
}