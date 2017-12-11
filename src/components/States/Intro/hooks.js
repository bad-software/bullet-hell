import m from 'mithril'
import { Game } from 'models/Game'
import style from './intro.scss'

function oninit() {
  // The views to display in the intro, in order
  // Add another view to this object and it will
  // automatically be included
  const
    animClass =
      `${Game.hasRun ? ` ${style.shortAnim}` : ` ${style.longAnim}`}`,

    views = {
      credits: (
        <div class={ animClass }>
          <span style="color: #f00;">Bad</span> Software presents
        </div>
      ),
      title: (
        <div class={ `${animClass} ${style.title}` }>
          <span class={ style.white }>BULLET</span>&nbsp;HELL
        </div>
      ),
      ready: (
        <div class={ animClass }>
          Ready?
        </div>
      ),
      go:  (
        <div
          class={ `${animClass} ${style.grow}` }
          style="font-weight: bold;"
        >
          GO
        </div>
      ),
    }


  if ( Game.hasRun ) {
    this.message = views.ready

    // GO
    setTimeout(() => {
      this.message = views.go
      m.redraw()
    }, style.animTime__short )

    start( 2, style.animTime__short )
  } else {
    // Set a Timeout for each message
    Object.entries( views )
      .map( x => x[1] )
      .forEach(( x, i ) => {
        if ( i === 0 ) {
          this.message = x
          m.redraw()
        } else {
          setTimeout(() => {
            this.message = x
            m.redraw()
          }, style.animTime * ( i ))
        }
      })

    start( Object.entries( views ).length, style.animTime )
  }
}

// Helpers
function start( multiplier, animTime ) {
  setTimeout(
    Game.ctrl.goTo.play,
    // Call after all other messages have been displayed
    animTime * multiplier
  )
}


export const hooks = {
  oninit,
}