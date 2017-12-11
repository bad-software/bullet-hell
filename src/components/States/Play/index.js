import m from 'mithril'
import { Player } from 'Components/Entities/Player'
import { Enemies } from 'Components/Entities/Enemies'
import { Stars } from 'Components/FX/Stars'
import { hooks } from './hooks'
import style from './play.scss'


export function Play() {

  const state = {
    render: null
  }

  return {
    ...hooks,
    ...state,

    view() {
      return (
        <div class={ style.body }>
          {/* Entities */}
          <Player/>
          <Enemies/>

          {/* FX */}
          <Stars/>
        </div>
      )
    }
  }
}