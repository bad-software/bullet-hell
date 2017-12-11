/**
 * Returns an svg by matching 'type' {String} to a namespaced sprite
 */
import get from 'lodash/get'
import classList from './classList'
import { sprites } from './sprites'
import style from './sprite.scss'


export function Sprite() {
  return {
    view: ( vnode ) =>
      // Return an svg icon from provided string and prepend the icon class
      get( sprites, vnode.attrs.name )(
        // Pipe vnode.attrs to the SVG element and add default class
        Object.assign(
          vnode.attrs,
          {
            class: `${ style.sprite } ` + (
              // Check for both 'class' and 'className'
              vnode.attrs.class
              || vnode.attrs.className
              || ''
            ),
            // We don't want to keep both
            className: undefined
          }
        )
      )
  }
}

export { classList }