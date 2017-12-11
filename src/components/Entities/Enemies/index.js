import m from 'mithril'
import { Sprite } from 'Components/Sprite'
import { hooks } from './hooks'
import style from './enemies.scss'

export function Enemies() {

  const state = {
    options: {},
    sprites: [],
  }

  return {
    ...hooks,
    ...state,

    view() {
      return (
        <div class={ style.body }>
          <Sprite name="enemy.saucer"/>
        </div>
      )
    }
  }
}
