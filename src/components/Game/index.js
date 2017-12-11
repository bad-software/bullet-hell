import m from 'mithril'
//import { Debug } from 'Components/UI/Debug'
import { GameOver } from 'Components/States/GameOver'
import { Init } from 'Components/States/Init'
import { Intro } from 'Components/States/Intro'
import { Play } from 'Components/States/Play'
import { Pause } from 'Components/States/Pause'
import { HUD } from 'Components/UI/HUD'
import { SFX } from 'Components/Sound/SFX'
import { Game as M_Game } from 'Models/Game'
import style from './game.scss'
import {Entities} from 'Models/Entities'


export function Game() {
  return {
    view() {
      return (
        <div class={style.body}>
          <SFX/>

          {/* States */}
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
              Entities.player ? <HUD key={4}/> : null,
              //<Debug key={5}/>,
            ]
          }()}
        </div>
      )
    }
  }
}