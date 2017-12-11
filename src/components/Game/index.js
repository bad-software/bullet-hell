import m from 'mithril'
import { Init } from 'components/States/Init'
import { Intro } from 'components/States/Intro'
import { GameOver } from 'components/States/GameOver'
import { Play } from 'components/States/Play'
import { Pause } from 'components/States/Pause'
import { HUD } from 'components/UI/HUD'
import { Game as M_Game } from 'Models/Game'
import hooks from './hooks'
import style from './game.scss'


export function Game() {
  return {
    ...hooks,

    view() {
      return (
        <div class={style.body}>
          { function() {
            if ( M_Game.state === 'Init' ) return <Init/>
            else if ( M_Game.state === 'Intro' ) return <Intro/>
            else if ( M_Game.state === 'Play' ) return [
              <Play key={1}/>,
              // Is the game running?
              // If it's not, is the game over or is it just paused?
              M_Game.running ? null : M_Game.over ?
                <GameOver key={2}/>
                : <Pause key={3}/>,
              <HUD key={4}/>,
              //<Debug key={5}/>,
            ]
          }()}
        </div>
      )
    }
  }
}