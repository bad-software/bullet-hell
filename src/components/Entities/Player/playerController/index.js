import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'
import { boost } from './boost'
import { thrust } from './thrust'
import { fire } from './fire'

export function playerController( time, delta ) {
  const player = Entities.player

  thrust( player )
  boost( player, delta )
  fire( player, time )

  // Pause
  if ( Game.keys['Escape'] ) Game.isRunning = false
}