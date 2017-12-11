import { Entities } from 'Models/Entities'
import { Game } from 'Models/Game'

export function score( delta ) {
  // Update score
  // Gain 1000 every minute, plus an additional 50% of your base gains
  // for every active bullet past your first two
  Game.score +=
    delta / 60 *
    Math.max(
      (Entities.bullets.length + Entities.enemyBullets.length) / 2, 1
    )
}