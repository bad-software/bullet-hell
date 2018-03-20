import m from 'mithril'
import { Game } from 'Models/Game'

export function cleanUp( time, prevTime ) {
  Game.lastDelta = time - prevTime

  // Redraw every frame
  m.redraw()
}