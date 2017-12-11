import { Bodies, World } from 'matter-js'
import { getDistance } from 'lib/utility'
import { Entities } from 'models/Entities'
import { Game } from 'models/Game'

function randomPosition() {
  const position = {
    x: Math.random() * Game.settings.width,
    y: Math.random() * Game.settings.height,
  }

  if (
    getDistance( Entities.player.position, position ) >
    Entities.player.spawnProtectionRadius
  )
    return position
  else {
    return randomPosition()
  }
}

export function spawnEnemy( vnode ) {
  if ( vnode.state.sprites.length ) {
    const
      position = randomPosition(),
      index = Math.floor( Math.random() * vnode.state.sprites.length ),
      enemy = Bodies.fromVertices(
        // Center of screen
        position.x,
        position.y,
        vnode.state.sprites[ index ],
        vnode.state.options
      )

    // Set entity reference and add to world
    Entities.enemies.push( enemy )
    World.add( Game.world, enemy )
  }
}