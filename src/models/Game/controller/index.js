import m from 'mithril'
import { Game } from '../index'


export const ctrl = {
  end: () => {
    Game.isRunning = false
    Game.isOver = true
  },

  goTo: {
    init() {
      Game.state = 'Init'
      m.redraw()
    },

    intro() {
      Game.state = 'Intro'
      m.redraw()
    },

    play() {
      Game.state = 'Play'
      m.redraw()
    },
  },
}