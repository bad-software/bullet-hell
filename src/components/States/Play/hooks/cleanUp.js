import m from 'mithril'
import { Game } from 'Models/Game'

export function cleanUp( time, prevTime, delta ) {
  Game.lastDelta = time - prevTime
  Game.timeSinceStart += delta || time - prevTime

  // Redraw every frame
  m.redraw()
}