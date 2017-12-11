import m from 'mithril'
import { Player } from 'components/Entities/Player'
import { Enemies } from 'components/Entities/Enemies'
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
          <Player/>
          <Enemies/>
        </div>
      )
    }
  }
}