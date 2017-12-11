import { Entities } from 'Models/Entities'
import { Bodies, Body, World } from 'matter-js'
import { Game } from 'Models/Game'

export function fire(enemy, angle, time ) {
  if ( time - enemy.lastFired > enemy.fireLimit ) {
    enemy.lastFired = time

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
    World.add( Game.world, bullet )
  }
}