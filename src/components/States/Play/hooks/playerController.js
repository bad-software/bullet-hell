import { Bodies, Body, World } from 'matter-js'
import { addVectorMaps } from 'lib/utility'
import { Entities } from 'models/Entities'
import { Game } from 'models/Game'


const
  xThrust = player => Math.cos( player.angle ) * player.thrust,
  yThrust = player => Math.sin( player.angle ) * player.thrust,
  xLateralThrust =
    player => Math.cos( player.angle - Math.PI / 2 ) * player.thrust * 0.75,
  yLateralThrust =
    player => Math.sin( player.angle - Math.PI / 2 ) * player.thrust * 0.75,
  behindPlayer = player => {
    return {
      x: Math.cos( player.angle ) * -200,
      y: Math.sin( player.angle ) * -200
    }
  }

export function playerController( time ) {
  const player = Entities.player

  // Main thrusters
  if ( Game.keys['KeyW'] || Game.keys['ArrowUp'] ) {
    // Forward thrust
    Body.applyForce( player,
      addVectorMaps( player.position, behindPlayer( player )),
      {
        x: xThrust( player ),
        y: yThrust( player )
      }
    )
  } else if (Game.keys['KeyS'] || Game.keys['ArrowDown']) {
    // Backward thrust
    Body.applyForce( player,
      addVectorMaps( player.position, behindPlayer( player )),
      {
        x: -1 * xThrust( player ),
        y: -1 * yThrust( player )
      }
    )
  }

  // Lateral thrusters
  if ( Game.keys['ShiftLeft'] || Game.keys['KeyQ'] ) {
    // Right thruster (thrusts left)
    Body.applyForce( player,
      player.position,
      {
        x: xLateralThrust( player ),
        y: yLateralThrust( player )
      }
    )
  } else if ( Game.keys['ShiftRight'] || Game.keys['KeyE'] ) {
    // Left thruster (thrusts right)
    Body.applyForce( player,
      player.position,
      {
        x: -1 * xLateralThrust( player ),
        y: -1 * yLateralThrust( player )
      }
    )
  }

  // Rotational thrusters
  if ( Game.keys['KeyA'] || Game.keys['ArrowLeft'] ) {
    // Counter-clockwise
    player.torque = -player.yaw
  } else if ( Game.keys['KeyD'] || Game.keys['ArrowRight'] ) {
    // Clockwise
    player.torque = player.yaw
  }

  // Dampen angular velocity
  if ( Math.abs( player.angularVelocity ) > player.maxAngularVelocity ) {
    Body.setAngularVelocity( player,
      player.angularVelocity * player.angularDampening
    )
  }

  // Blaster
  if ( Game.keys['Space'] || Game.keys['Enter'] ) {
    if ( time - player.lastFired > player.fireLimit ) {
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
      World.add(Game.world, bullet)

      // Set lastFired for next frame
      player.lastFired = time
    }
  }

  // Options
  if ( Game.keys['Escape'] ) Game.running = false
}