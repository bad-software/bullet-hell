import m from 'mithril'
import { Sprite } from 'Components/Sprite'
import { hooks } from './hooks'
import style from './player.scss'


export function Player() {

  const state = {
    player: null,
  }

  return {
    ...hooks,
    ...state,

    view() {
      return <Sprite name="player.default" class={ style.body }/>
    }
  }
}