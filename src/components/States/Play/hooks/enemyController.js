import { Bodies, Body, World } from 'matter-js'
import { Entities } from 'models/Entities'
import { Game } from 'models/Game'

export function enemyController( time ) {
  const
    xThrust = ( enemy, angle ) => Math.cos( angle ) * enemy.thrust,
    yThrust = ( enemy, angle ) => Math.sin( angle ) * enemy.thrust

  Entities.enemies.forEach( enemy => {
    if ( enemy.isAlive ) {
      const
        // Calculate angle of approach
        dx = Entities.player.position.x - enemy.position.x,
        dy = Entities.player.position.y - enemy.position.y,
        angle = Math.atan2( dy, dx )

      // Apply thrust towards player
      Body.applyForce( enemy, enemy.position,
        {
          x: xThrust( enemy, angle ),
          y: yThrust( enemy, angle ),
        }
      )

      // Shoot towards player
      if ( time - enemy.lastFired > enemy.fireLimit ) {
        const bullet = Bodies.circle(
          enemy.position.x + enemy.bullet.distance * Math.cos( angle ),
          enemy.position.y + enemy.bullet.distance * Math.sin( angle ),
          enemy.bullet.radius,
          enemy.bullet
        )

        Body.setVelocity( bullet, {
          x: enemy.velocity.x + enemy.bullet.speed * Math.cos( angle ),
          y: enemy.velocity.y + enemy.bullet.speed * Math.sin( angle )
        })

        // Do we have too many bullets?
        if ( Entities.enemyBullets.length + 1 > Game.settings.maxBullets ) {
          // Remove oldest bullet from world
          World.remove( Game.world, Entities.enemyBullets[0] )

          // Stop tracking oldest bullet
          Entities.enemyBullets.shift()
        }

        // Add to entities and world
        Entities.enemyBullets.push( bullet )
        World.add(Game.world, bullet)

        // Set lastFired for next frame
        enemy.lastFired = time

      }
    }
  })
}