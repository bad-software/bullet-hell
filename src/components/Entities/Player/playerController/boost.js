import { Game } from 'Models/Game'
import { addVectorMaps, behindPlayer } from 'Lib/utility/matter'
import { Body } from 'matter-js'

export function boost(player, delta ) {
  const
    xBoost = player => Math.cos( player.angle ) * player.boost.acceleration,
    yBoost = player => Math.sin( player.angle ) * player.boost.acceleration

  if (Game.keys['ShiftLeft']) {
    if ( player.boost.fuel > 0 ) {
      player.boost.fuel -= player.boost.burnRate * delta
      player.boost.fuel = Math.max(0, player.boost.fuel)
      /*Body.applyForce( player,
        addVectorMaps( player.position, behindPlayer( player )), {
          x: xBoost( player ),
          y: yBoost( player ),
        }
      )*/

      Body.applyForce(player,
        addVectorMaps(player.position, behindPlayer(player)),
        {
          x: xBoost(player),
          y: yBoost(player),
        })
    }
  } else if (player.boost.fuel < player.boost.maxFuel) {
    player.boost.fuel += player.boost.chargeRate * delta
    player.boost.fuel = Math.min( player.boost.fuel, player.boost.maxFuel )
  }
}