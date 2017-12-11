import { Bodies, Body, World } from 'matter-js'
import { Entities } from 'Models/Entities'
import { fire } from './fire'
import { thrust } from './thrust'

export function enemyController( time ) {
  Entities.enemies.forEach( enemy => {
    if ( enemy.isAlive ) {
      const
        // Calculate angle of approach
        dx = Entities.player.position.x - enemy.position.x,
        dy = Entities.player.position.y - enemy.position.y,
        angle = Math.atan2( dy, dx )

      thrust( enemy, angle )
      fire( enemy, angle, time )
    }
  })
}


