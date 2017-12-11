// Main thrusters
import { Game } from 'Models/Game'
import { addVectorMaps, behindPlayer } from 'Lib/utility/matter'
import { Body } from 'matter-js'


const
  xThrust = player => Math.cos( player.angle ) * player.thrust,
  yThrust = player => Math.sin( player.angle ) * player.thrust,
  xLateralThrust =
    player => Math.cos( player.angle - Math.PI / 2 ) * player.lateralThrust,
  yLateralThrust =
    player => Math.sin( player.angle - Math.PI / 2 ) * player.lateralThrust

export function thrust( player ) {
  if ( Game.keys['KeyW'] || Game.keys['ArrowUp'] ) {
    // Forward thrust
    Body.applyForce( player,
      addVectorMaps( player.position, behindPlayer( player )), {
        x: xThrust( player ),
        y: yThrust( player ),
      })
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
  if ( Game.keys['BracketLeft'] || Game.keys['KeyQ'] ) {
    // Right thruster (thrusts left)
    Body.applyForce( player,
      player.position,
      {
        x: xLateralThrust( player ),
        y: yLateralThrust( player )
      }
    )
  } else if ( Game.keys['BracketRight'] || Game.keys['KeyE'] ) {
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

  dampenAngularVelocity( player )
}

function dampenAngularVelocity( player ) {
  // Dampen angular velocity
  if ( Math.abs( player.angularVelocity ) > player.maxAngularVelocity ) {
    Body.setAngularVelocity( player,
      player.angularVelocity >= 0 ?
        player.maxAngularVelocity
        : -1 * player.maxAngularVelocity
    )
  }
}