import { World } from 'matter-js'
import { Entities } from 'models/Entities'
import { Game } from 'models/Game'

export function enemyBullets( delta ) {
  Entities.enemyBullets.forEach( x => {
    x.timeAlive += delta
    if ( x.timeAlive >= x.timeToLive ) World.remove( Game.world, x )
  })
}