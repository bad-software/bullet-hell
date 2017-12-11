import { Engine } from 'matter-js'
import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'
import { playerController } from 'Components/Entities/Player/playerController'
import { enemyController } from 'Components/Entities/Enemies/enemyController'
import { enemyBullets } from './enemyBullets'
import { score } from './score'


export function tick( time, delta ) {
  // User input
  // [BUG] Wrapper in a conditional because Player isn't always initialized
  if ( Entities.player ) {
    playerController( time, delta )
    enemyController( time )
  }

  if ( Entities.enemies.length ) {
    enemyBullets( delta )
  }

  // Update score
  score( delta )

  // Update timers
  Game.timeSinceLastSpawn += delta

  // Can we spawn an enemy?
  if (
    Game.timeSinceLastSpawn >= (
      Game.settings.spawnRate -
      Game.settings.spawnRate * Game.settings.spawnVariance * Math.random()
    )
  ) {
    Game.ableToSpawn = true
  }

  //if ( Math.round( time ) % 100 === 0 ) console.log( Math.round( time ))

  // Update engine
  Engine.update( Game.engine, Math.min( delta, 1000 / 60 ))
}