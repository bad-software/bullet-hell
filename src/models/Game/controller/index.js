import m from 'mithril'
import { Game } from '../index'


export const ctrl = {
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
  }
}