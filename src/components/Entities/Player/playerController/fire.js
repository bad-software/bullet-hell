import {Bodies, Body, World} from 'matter-js'
import {Sound} from 'Models/Sound'
import {Entities} from 'Models/Entities'
import {Game} from 'Models/Game'
import { playerFire } from 'Models/Sound/controller/sounds/playerFire'


export function fire( player, time ) {
  if ( Game.keys['Space'] || Game.keys['Enter'] ) {
    // Has it been long enough since we last fired?
    if ( time - player.lastFired > player.fireLimit ) {
      //Sound.ctrl.play( 'playerFire' , null, 1 )

      player.lastFired = time

      // Create bullet
      const bullet = Bodies.circle(
        player.position.x + player.bullet.distance * Math.cos( player.angle ),
        player.position.y + player.bullet.distance * Math.sin( player.angle ),
        player.bullet.radius,
        player.bullet.opts
      )

      Body.setVelocity( bullet, {
        x: player.velocity.x + player.bullet.speed * Math.cos( player.angle ),
        y: player.velocity.y + player.bullet.speed * Math.sin( player.angle )
      })

      // Do we have too many bullets?
      if ( Entities.bullets.length + 1 > Game.settings.maxBullets ) {
        // Remove oldest bullet from world
        World.remove( Game.world, Entities.bullets[0] )

        // Stop tracking oldest bullet
        Entities.bullets.shift()
      }

      // Add to entities and world
      Entities.bullets.push( bullet )
      World.add( Game.world, bullet )
    }
  }
}