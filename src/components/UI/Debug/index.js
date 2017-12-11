import m from 'mithril'
import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'
import style from './debug.scss'

export function Debug() {

  const state = {
    // 60 FPS
    delta: 1000 / 60,
  }

  return {
    ...state,

    view( vnode ) {
      return (
        <div class={ style.body }>
          {/* FPS */}
          FPS: {function() {
            // Poor man's moving average
            vnode.state.delta += ( Game.lastDelta - vnode.state.delta ) * 0.02

            // Return 1s / delta to get FPS,
            return ( 1000 / vnode.state.delta).toFixed( 2 ).toString()
          }()}
          <br/>

          {/* Score */}
          Score: { Math.round( Game.score ).toString() }
          <br/>

          {/* Mouse */}
          Mouse:&nbsp;
          { JSON.stringify(
            Object.entries( Game.mouse )
            // Filter active buttons
              .filter( x => x[1] )
              // Display button
              .map( x => x[0] )
            // Remove brackets
          ).replace( /[[\]]/g, `` )}
          <br/>

          {/* Keys */}
          Keys:&nbsp;
          { JSON.stringify(
            Object.entries( Game.keys )
              // Filter active keys
              .filter( x => x[1] )
              // Display key
              .map( x => x[0] )
            // Remove brackets
          ).replace( /[[\]]/g, `` )}
          <br/>

          {/* Enemies */}
          Enemies: { Entities.enemies.length.toString() }
          <br/>

          {/* Bullets */}
          Bullets: { Entities.bullets.length.toString() }
          <br/>

          {/* Position */}
          {
            Entities.player ? (
              `X: ${ Math.round( Entities.player.position.x )} ` +
              `Y: ${ Math.round( Entities.player.position.y )}`
            )
              : `X: 0 Y: 0`
          }
        </div>
      )
    }
  }
}
