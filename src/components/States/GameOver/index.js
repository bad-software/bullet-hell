import m from 'mithril'
import { Game } from 'models/Game'
import hooks from './hooks'
import style from './gameOver.scss'


export function GameOver() {
  const state = {
    textIndex: 0,
    text: [
      `GAME OVER`,
      `YOU ARE YOUR OWN WORST ENEMY`,
      `YOU SUCK`,
      `YOU'RE BAD AND YOU SHOULD FEEL BAD`,
      `FUCKING AMATEUR`,
      `GIVE UP ALREADY`,
      `PATHETIC`,
      `THAT'S ALL YOU'VE GOT?`,
      `SHE NEVER LOVED YOU`,
      `GARBAGE`,
      `GO BACK TO SCHOOL`,
      `A LOSER IS YOU`,
      `NICE GOING, DUMBASS`,
      `YOU DIED ALONE`,
      `NO ONE CAME TO YOUR FUNERAL`,
      `REALLY?`,
      `WERE YOU EVEN TRYING?`,
      `GET REKT`,
    ]
  }

  if ( Game.highScore ) {
    if ( Game.score < Game.highScore )
      state.text.push( `YOU'RE GETTING WORSE`)

    state.text.push( `YOU LOSE (AGAIN)` )
  }
  else state.text.push( `YOU LOSE` )

  return {
    ...hooks,
    ...state,

    view() {
      return (
        <div class={style.body}>
          <div class={ style.text }>
            { this.text[ this.textIndex ]}
          </div>

          <div class={ style.score }>
            { String( Game.score ).padStart( 7, 0 )}
          </div>

          <div class={ style.highScore }>
            { String( Game.highScore ).padStart( 7, 0 )}
          </div>

          <div>
            Press R to restart
          </div>
        </div>
      )
    }
  }
}