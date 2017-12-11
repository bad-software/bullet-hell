import m from 'mithril'
import { Game } from 'Models/Game'
import style from './intro.scss'
import {Sound} from 'Models/Sound'

function oninit() {
  // Ready?
  if ( Game.hasRun ) this.screen = 2
}

function oncreate() {

  if ( Game.hasRun ) {
    let delay = style.animReady * 2

    // Ready is set on init

    // Go
    setTimeout(() => {
      this.screen = 3
      m.redraw()
    }, delay )

    delay += style.animGo * 2

    // Play game
    setTimeout( Game.ctrl.goTo.play, delay )

  } else {
    let delay = style.animCredits * 2

    // Credits is set on init

    // Title
    setTimeout(() => {
      //Sound.ctrl.play( 'intro', null, style.animTitle / 600 )
      this.screen = 1
      m.redraw()
    }, delay)

    delay += style.animTitle * 2

    // Ready?
    setTimeout(() => {
      this.screen = 2
      m.redraw()
    }, delay)

    delay += style.animReady * 2

    // Go
    setTimeout(() => {
      this.screen = 3
      m.redraw()
    }, delay)

    delay += style.animGo * 2

    // Play game
    setTimeout( Game.ctrl.goTo.play, delay )
  }
}


export const hooks = {
  oninit,
  oncreate,
}