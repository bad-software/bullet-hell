import m from 'mithril'
import { Game } from 'Models/Game'
import { cleanUp } from './cleanUp'
import { tick } from './tick'

// We keep track of the last frame's timestamp
// for determining the frame delta... standard stuff
let prevTime

export function gameLoop( time ) {
  if ( Game.isRunning ) { // Main loop
    // Initialize prevTime
    if ( !prevTime ) prevTime = time

    // When time and prevTime are the same, the difference is NaN.
    // Unsure if bug or misunderstanding
    const delta = time - prevTime || 0

    // Run game logic
    tick( time, delta )

    // Prepare for next frame
    // We set `prevTime` along with `cleanUp` each time,
    // But for some reason the game breaks when we factor it into `cleanUp`
    window.requestAnimationFrame( gameLoop )
    cleanUp( time, prevTime )
    prevTime = time

  } else if ( Game.isOver ) { // Game is over

    // Reset if we press the mouse button or `R`
    if ( Game.mouse['0'] || Game.keys['KeyR'] ) {
      Game.state = 'Init'
    } else {
      // Otherwise request another frame
      window.requestAnimationFrame( gameLoop )
    }

    // Prepare for next frame
    cleanUp( time, prevTime )
    prevTime = time

  } else { // Game is paused

    // Enter resumes game
    if ( Game.keys['Enter'] ) {
      Game.isRunning = true
    }

    // Prepare for next frame
    window.requestAnimationFrame(gameLoop)
    cleanUp( time, prevTime )
    prevTime = time
  }
}