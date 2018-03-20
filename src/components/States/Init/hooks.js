import { Game } from 'Models/Game'
import style from './init.scss'

function oncreate( vnode ) {
  const btn = Array.from(
    Array.from( vnode.dom.children )
      .find( x => x.dataset.name === 'message' ).children
  ).find( x => x.dataset.name === 'btn' )

  // Fix for bug in Chrome where bottom border of
  // the button gets masked due to CSS scaling
  setTimeout(
    () => btn.classList.add( style.btnFix ),
    Number( style.openSpeed ) + 50
  )

  // Go to Intro if we press `Space`
  window.addEventListener( 'keydown', goToIntro )

}

function onremove() {
  // Initialize game settings
  Game.settings = Object.assign( Game.settings, {
    height: window.innerHeight,
    width: window.innerWidth,
  })

  // Remove event listener
  window.removeEventListener( 'keydown', goToIntro )
}

function close( e ) {
  const
    message = e.target.parentNode,

    corners = Array.from(
      Array.from(e.target.parentNode.parentNode.children )
        .find( x => x.dataset.name === 'corners' ).children
    )

  // Trigger close animation
  message.classList.add( style.close )

  // Hide corners while animation plays
  corners.forEach( x => x.classList.add( 'hidden' ))

  // Pad ending animation just a bit to provide a pause before exit
  setTimeout( Game.ctrl.goTo.intro, Number( style.closeSpeed ) + 300 )

}

// Helpers
function goToIntro( e ) {
  if ( e.code === 'Space' ) {
    Game.ctrl.goTo.intro()
  }
}


export const hooks = {
  oncreate,
  onremove,
  close,
}