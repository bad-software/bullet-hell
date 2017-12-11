import { World } from 'matter-js'
import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'

export function enemyBullets( delta ) {
  Entities.enemyBullets.forEach( x => {
    x.timeAlive += delta
    if ( x.timeAlive >= x.timeToLive ) World.remove( Game.world, x )
  })
}